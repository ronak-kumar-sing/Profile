import { NextResponse } from 'next/server'

type CacheStore = { data: unknown; timestamp: number } | null
const getCached = (): CacheStore =>
  ((global as Record<string, unknown>).__githubCache as CacheStore) || null
const setCache = (data: unknown) => {
  ;(global as Record<string, unknown>).__githubCache = {
    data,
    timestamp: Date.now(),
  }
}

const GITHUB_USERNAME = 'ronak-kumar-sing'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour

const PINNED_REPOS = [
  'Make-it-app',
  'College-Project',
  'student-nest',
  'ATM-Simulation',
  'BGMI-advisor',
]

export async function GET() {
  try {
    const cached = getCached()
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data)
    }

    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
    }

    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
    }

    const reposRes = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=public`,
      { headers, next: { revalidate: 3600 } },
    )

    if (!reposRes.ok) {
      throw new Error(`GitHub API error: ${reposRes.status}`)
    }

    const allRepos = await reposRes.json()

    const ownRepos = allRepos
      .filter((r: Record<string, unknown>) => !r.fork)
      .sort(
        (a: Record<string, unknown>, b: Record<string, unknown>) =>
          (b.stargazers_count as number) +
          (b.forks_count as number) -
          ((a.stargazers_count as number) + (a.forks_count as number)),
      )

    const enriched = ownRepos
      .slice(0, 12)
      .map((repo: Record<string, unknown>) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || '',
        url: repo.html_url,
        homepage: repo.homepage || null,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
        createdAt: repo.created_at,
        isPinned: PINNED_REPOS.some((p) =>
          (repo.name as string).toLowerCase().includes(p.toLowerCase()),
        ),
      }))

    enriched.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
      if (a.isPinned && !b.isPinned) return -1
      if (!a.isPinned && b.isPinned) return 1
      return (b.stars as number) - (a.stars as number)
    })

    const result = { repos: enriched, fetchedAt: new Date().toISOString() }
    setCache(result)

    return NextResponse.json(result)
  } catch (error) {
    console.error('GitHub API Error:', error)

    return NextResponse.json({
      repos: [
        {
          id: 1,
          name: 'Make-it-app',
          fullName: 'ronak-kumar-sing/Make-it-app',
          description:
            'A comprehensive productivity and study companion mobile app with AI-powered study resources using Google Gemini 2.0.',
          url: 'https://github.com/ronak-kumar-sing/Make-it-app',
          homepage: 'https://make-it-three.vercel.app/',
          stars: 0,
          forks: 0,
          language: 'TypeScript',
          topics: ['react-native', 'expo', 'nextjs', 'ai', 'gemini'],
          updatedAt: new Date().toISOString(),
          isPinned: true,
        },
        {
          id: 2,
          name: 'College-Project',
          fullName: 'ronak-kumar-sing/College-Project',
          description:
            'A comprehensive career development platform with AI-powered assessments and personalized roadmaps.',
          url: 'https://github.com/ronak-kumar-sing/College-Project',
          homepage: 'https://cricket-hub-y63h.vercel.app/',
          stars: 0,
          forks: 0,
          language: 'PHP',
          topics: ['php', 'mysql', 'tailwindcss', 'ai', 'MongoDB'],
          updatedAt: new Date().toISOString(),
          isPinned: true,
        },
        {
          id: 3,
          name: 'student-nest',
          fullName: 'ronak-kumar-sing/student-nest',
          description:
            'A modern student accommodation platform connecting students with verified property owners.',
          url: 'https://github.com/ronak-kumar-sing/student-nest',
          homepage: 'https://student-nest-infotsav.vercel.app/',
          stars: 0,
          forks: 0,
          language: 'JavaScript',
          topics: ['nextjs', 'tailwindcss', 'real-estate', 'MongoDB'],
          updatedAt: new Date().toISOString(),
          isPinned: true,
        },
      ],
      fetchedAt: new Date().toISOString(),
      fallback: true,
    })
  }
}
