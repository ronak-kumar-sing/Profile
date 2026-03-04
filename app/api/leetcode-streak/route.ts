import { NextResponse } from 'next/server'

const LEETCODE_USERNAME = 'Ronak_Kumar_singh'
const ALFA_API = 'https://alfa-leetcode-api.onrender.com'

type CacheStore = { data: unknown; timestamp: number } | null
const getCached = (): CacheStore =>
  ((global as Record<string, unknown>).__leetcodeStreakCache as CacheStore) ||
  null
const setCache = (data: unknown) => {
  ;(global as Record<string, unknown>).__leetcodeStreakCache = {
    data,
    timestamp: Date.now(),
  }
}
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

// Direct LeetCode GraphQL fallback
async function fetchFromLeetCodeGraphQL() {
  const query = `
    query userProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          streak
          totalActiveDays
          submissionCalendar
        }
        submitStatsGlobal {
          acSubmissionNum { difficulty count }
        }
      }
    }
  `
  const res = await fetch('https://leetcode.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Referer: 'https://leetcode.com',
    },
    body: JSON.stringify({
      query,
      variables: { username: LEETCODE_USERNAME },
    }),
    next: { revalidate: 1800 },
  })
  if (!res.ok) throw new Error(`LeetCode GraphQL error: ${res.status}`)
  const json = await res.json()
  const user = json.data?.matchedUser
  if (!user) throw new Error('LeetCode user not found')

  const cal = user.userCalendar
  const stats = user.submitStatsGlobal?.acSubmissionNum || []

  let submissionCalendar: Record<string, number> = {}
  try {
    submissionCalendar = JSON.parse(cal.submissionCalendar || '{}')
  } catch {
    submissionCalendar = {}
  }

  return {
    submissionCalendar,
    streak: cal.streak || 0,
    totalActiveDays: cal.totalActiveDays || 0,
    totalSolved: stats.reduce(
      (a: number, s: { difficulty: string; count: number }) =>
        s.difficulty === 'All' ? a : a + s.count,
      0,
    ),
    easy:
      stats.find((s: { difficulty: string }) => s.difficulty === 'Easy')
        ?.count || 0,
    medium:
      stats.find((s: { difficulty: string }) => s.difficulty === 'Medium')
        ?.count || 0,
    hard:
      stats.find((s: { difficulty: string }) => s.difficulty === 'Hard')
        ?.count || 0,
  }
}

// alfa-leetcode-api
async function fetchFromAlfaAPI() {
  const [calRes, solvedRes] = await Promise.all([
    fetch(`${ALFA_API}/${LEETCODE_USERNAME}/calendar`, {
      next: { revalidate: 1800 },
    }),
    fetch(`${ALFA_API}/${LEETCODE_USERNAME}/solved`, {
      next: { revalidate: 1800 },
    }),
  ])

  if (!calRes.ok) throw new Error(`alfa calendar: ${calRes.status}`)
  if (!solvedRes.ok) throw new Error(`alfa solved: ${solvedRes.status}`)

  const calData = await calRes.json()
  const solvedData = await solvedRes.json()

  // Check for rate-limit / error response
  if (typeof calData === 'string' || calData.error)
    throw new Error('alfa rate-limited')
  if (typeof solvedData === 'string' || solvedData.error)
    throw new Error('alfa rate-limited')

  let submissionCalendar: Record<string, number> = {}
  try {
    const raw = calData.submissionCalendar
    submissionCalendar = typeof raw === 'string' ? JSON.parse(raw) : raw || {}
  } catch {
    submissionCalendar = {}
  }

  return {
    submissionCalendar,
    streak: calData.streak ?? 0,
    totalActiveDays: calData.totalActiveDays ?? 0,
    totalSolved: solvedData.solvedProblem ?? 0,
    easy: solvedData.easySolved ?? 0,
    medium: solvedData.mediumSolved ?? 0,
    hard: solvedData.hardSolved ?? 0,
  }
}

export async function GET() {
  try {
    const cached = getCached()
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data)
    }

    // Try alfa-api first, fall back to direct LeetCode GraphQL
    let raw: Awaited<ReturnType<typeof fetchFromAlfaAPI>>
    try {
      raw = await fetchFromAlfaAPI()
    } catch {
      console.log('alfa-api failed, falling back to LeetCode GraphQL')
      raw = await fetchFromLeetCodeGraphQL()
    }

    // Convert unix timestamp keys to YYYY-MM-DD -> count
    const contributionDays: { date: string; count: number }[] = []
    for (const [ts, count] of Object.entries(raw.submissionCalendar)) {
      const d = new Date(Number(ts) * 1000)
      const dateStr = d.toISOString().split('T')[0]
      contributionDays.push({ date: dateStr, count: count as number })
    }
    contributionDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // Calculate current streak by walking backwards from today
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const dayMap = new Map(contributionDays.map((d) => [d.date, d.count]))

    let currentStreak = 0
    const checkDate = new Date(today)
    for (let i = 0; i < 365; i++) {
      const dateStr = checkDate.toISOString().split('T')[0]
      const count = dayMap.get(dateStr) || 0

      if (i === 0 && count === 0) {
        checkDate.setDate(checkDate.getDate() - 1)
        continue
      }

      if (count > 0) {
        currentStreak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }

    const streak = Math.max(currentStreak, raw.streak)
    const totalActiveDays =
      raw.totalActiveDays || contributionDays.filter((d) => d.count > 0).length

    const result = {
      username: LEETCODE_USERNAME,
      totalSolved: raw.totalSolved,
      easy: raw.easy,
      medium: raw.medium,
      hard: raw.hard,
      currentStreak: streak,
      totalActiveDays,
      contributionDays,
      fetchedAt: new Date().toISOString(),
    }

    setCache(result)
    return NextResponse.json(result)
  } catch (error) {
    console.error('LeetCode API Error:', error)
    return NextResponse.json({
      username: LEETCODE_USERNAME,
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      currentStreak: 0,
      totalActiveDays: 0,
      contributionDays: [],
      fetchedAt: new Date().toISOString(),
      fallback: true,
    })
  }
}
