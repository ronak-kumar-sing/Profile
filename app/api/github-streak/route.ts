import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'ronak-kumar-sing'

type CacheStore = { data: unknown; timestamp: number } | null
const getCached = (): CacheStore =>
  ((global as Record<string, unknown>).__githubStreakCache as CacheStore) ||
  null
const setCache = (data: unknown) => {
  ;(global as Record<string, unknown>).__githubStreakCache = {
    data,
    timestamp: Date.now(),
  }
}
const CACHE_TTL = 30 * 60 * 1000 // 30 minutes

/**
 * Fetches contribution data from GitHub's GraphQL API.
 * Falls back to scraping the contributions page if no token is available.
 */
export async function GET() {
  try {
    const cached = getCached()
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data)
    }

    let totalContributions = 0
    let currentStreak = 0
    let longestStreak = 0
    let contributionDays: { date: string; count: number }[] = []

    if (process.env.GITHUB_TOKEN) {
      // ── GraphQL approach (needs a personal access token) ──
      const query = `
        query {
          user(login: "${GITHUB_USERNAME}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `

      const res = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        next: { revalidate: 1800 },
      })

      if (!res.ok) throw new Error(`GitHub GraphQL error: ${res.status}`)

      const json = await res.json()
      const calendar =
        json.data.user.contributionsCollection.contributionCalendar

      totalContributions = calendar.totalContributions

      // Flatten all days
      contributionDays = calendar.weeks.flatMap(
        (w: {
          contributionDays: { date: string; contributionCount: number }[]
        }) =>
          w.contributionDays.map(
            (d: { date: string; contributionCount: number }) => ({
              date: d.date,
              count: d.contributionCount,
            }),
          ),
      )
    } else {
      // ── Fallback: scrape the contribution graph page ──
      const res = await fetch(
        `https://github.com/users/${GITHUB_USERNAME}/contributions`,
        { next: { revalidate: 1800 } },
      )
      const html = await res.text()

      // Try to extract tooltip text "N contributions on DATE"
      const tooltipRegex =
        /data-date="(\d{4}-\d{2}-\d{2})"[^>]*>[^<]*?(\d+)\s+contribution/g
      const countMap = new Map<string, number>()
      let match
      while ((match = tooltipRegex.exec(html)) !== null) {
        countMap.set(match[1], parseInt(match[2]))
      }

      // Parse contribution cells from the SVG (data-level approach)
      const dayRegex = /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-level="(\d+)"/g
      while ((match = dayRegex.exec(html)) !== null) {
        const date = match[1]
        const level = parseInt(match[2])
        // Use exact count if available, otherwise infer from level
        const count = countMap.get(date) ?? (level > 0 ? level * 2 : 0)
        contributionDays.push({ date, count })
      }

      // If no days found via regex, try alternate HTML format
      if (contributionDays.length === 0) {
        const altRegex =
          /data-date="(\d{4}-\d{2}-\d{2})"[^>]*data-count="(\d+)"/g
        while ((match = altRegex.exec(html)) !== null) {
          contributionDays.push({
            date: match[1],
            count: parseInt(match[2]),
          })
        }
      }

      totalContributions = contributionDays.reduce((acc, d) => acc + d.count, 0)
    }

    // Sort chronologically
    contributionDays.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // ── Calculate streaks ──
    const today = new Date().toISOString().split('T')[0]
    let streak = 0
    let maxStreak = 0
    let tempStreak = 0

    for (let i = 0; i < contributionDays.length; i++) {
      if (contributionDays[i].count > 0) {
        tempStreak++
        maxStreak = Math.max(maxStreak, tempStreak)
      } else {
        tempStreak = 0
      }
    }
    longestStreak = maxStreak

    // Current streak: walk backwards from today
    for (let i = contributionDays.length - 1; i >= 0; i--) {
      const d = contributionDays[i]
      // Skip future dates
      if (d.date > today) continue
      // If today has 0 contributions, skip today and check from yesterday
      if (d.date === today && d.count === 0) continue
      if (d.count > 0) {
        streak++
      } else {
        break
      }
    }
    currentStreak = streak

    const result = {
      username: GITHUB_USERNAME,
      totalContributions,
      currentStreak,
      longestStreak,
      contributionDays,
      fetchedAt: new Date().toISOString(),
    }

    setCache(result)
    return NextResponse.json(result)
  } catch (error) {
    console.error('GitHub Streak API Error:', error)
    return NextResponse.json({
      username: GITHUB_USERNAME,
      totalContributions: 0,
      currentStreak: 0,
      longestStreak: 0,
      contributionDays: [],
      fetchedAt: new Date().toISOString(),
      fallback: true,
    })
  }
}
