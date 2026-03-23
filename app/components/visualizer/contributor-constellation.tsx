'use client'

import { useMemo } from 'react'
import type { CommitNode } from '@/types/github'
import { Users } from 'lucide-react'

interface ContributorConstellationProps {
  contributors: [string, number][]
  commits: CommitNode[]
}

export function ContributorConstellation({ contributors, commits }: ContributorConstellationProps) {
  const topContributors = useMemo(() => {
    const counts = new Map<number, number>()
    commits.forEach(commit => {
      counts.set(commit.contributorId, (counts.get(commit.contributorId) || 0) + 1)
    })

    return contributors
      .map(([email, id]) => ({
        email,
        id,
        contributionCount: counts.get(id) || 0,
      }))
      .sort((a, b) => b.contributionCount - a.contributionCount)
      .slice(0, 12)
  }, [contributors, commits])

  const colors = [
    'from-blue-500 to-cyan-500',
    'from-purple-500 to-pink-500',
    'from-emerald-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-yellow-500 to-orange-500',
    'from-pink-500 to-rose-500',
  ]

  const getContributionPercentage = (count: number) => {
    const max = topContributors[0]?.contributionCount || 1
    return (count / max) * 100
  }

  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg overflow-hidden hover-lift transition-all duration-normal">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br from-accent-secondary/20 to-accent-tertiary/10">
            <Users className="w-5 h-5 text-accent-secondary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Top Contributors
            </h2>
            <p className="text-sm text-text-tertiary mt-1">
              {topContributors.length} most active contributors
            </p>
          </div>
        </div>
      </div>

      {/* Contributors List */}
      <div className="p-6 space-y-4">
        {topContributors.map((contributor, index) => {
          const percentage = getContributionPercentage(contributor.contributionCount)
          const colorClass = colors[index % colors.length]
          
          return (
            <div key={contributor.id} className="group">
              {/* Header row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-8 h-8 rounded bg-gradient-to-br ${colorClass} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {contributor.email.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-text-primary text-sm truncate group-hover:text-accent-secondary transition-colors">
                      {contributor.email.split('@')[0]}
                    </div>
                    <div className="text-xs text-text-tertiary">
                      {contributor.email.split('@')[1]}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="font-mono font-bold text-accent-secondary">
                    {contributor.contributionCount}
                  </div>
                  <div className="text-xs text-text-tertiary">
                    commits
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-bg-hover rounded overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500 group-hover:shadow-glow`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer stats */}
      <div className="p-6 pt-4 border-t border-gray-700 bg-gradient-to-t from-bg-tertiary/50 to-transparent">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent-secondary">
              {contributors.length}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Total Contributors</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-primary">
              {topContributors.reduce((sum, c) => sum + c.contributionCount, 0).toLocaleString()}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Top {topContributors.length} Combined</div>
          </div>
        </div>
      </div>
    </div>
  )
}
