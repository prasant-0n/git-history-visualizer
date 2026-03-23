'use client'

import { useMemo } from 'react'
import { format } from 'date-fns'
import type { CommitNode, BranchLine } from '@/types/github'
import { GitBranch } from 'lucide-react'

interface BranchOverviewProps {
  branches: BranchLine[]
  commits: CommitNode[]
}

export function BranchOverview({ branches, commits }: BranchOverviewProps) {
  const branchStats = useMemo(() => {
    const colorGradients = [
      'from-indigo-500 to-purple-500',
      'from-cyan-500 to-emerald-500',
      'from-orange-500 to-rose-500',
      'from-pink-500 to-purple-500',
      'from-yellow-500 to-orange-500',
      'from-blue-500 to-indigo-500',
    ]

    return branches.map((branch, index) => {
      const branchCommits = commits.filter(c => c.branch === branch.name)
      const lastCommit = branchCommits[branchCommits.length - 1]

      return {
        name: branch.name,
        commitCount: branchCommits.length,
        lastActivity: lastCommit?.date,
        percentage: (branchCommits.length / commits.length) * 100,
        gradient: colorGradients[index % colorGradients.length],
      }
    }).sort((a, b) => b.commitCount - a.commitCount)
  }, [branches, commits])

  const totalBranches = branchStats.length

  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg overflow-hidden hover-lift transition-all duration-normal">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br from-accent-tertiary/20 to-accent-secondary/10">
            <GitBranch className="w-5 h-5 text-accent-tertiary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Branches
            </h2>
            <p className="text-sm text-text-tertiary mt-1">
              {totalBranches} branch{totalBranches !== 1 ? 'es' : ''} in repository
            </p>
          </div>
        </div>
      </div>

      {/* Branches List */}
      <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
        {branchStats.map(branch => (
          <div key={branch.name} className="group">
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${branch.gradient} flex-shrink-0`} />
                <span className="font-mono text-sm font-semibold text-text-primary truncate group-hover:text-accent-secondary transition-colors">
                  {branch.name}
                </span>
              </div>
              <div className="text-right flex-shrink-0 ml-4">
                <div className="font-mono font-bold text-accent-secondary text-sm">
                  {branch.commitCount}
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-3 bg-bg-hover rounded overflow-hidden mb-2">
              <div
                className={`h-full bg-gradient-to-r ${branch.gradient} transition-all duration-500 group-hover:shadow-glow`}
                style={{ width: `${branch.percentage}%` }}
              />
            </div>

            {/* Footer info */}
            <div className="flex items-center justify-between">
              <div className="text-xs text-text-tertiary">
                {branch.percentage.toFixed(1)}% of commits
              </div>
              {branch.lastActivity && (
                <div className="text-xs text-text-tertiary">
                  {format(branch.lastActivity, 'MMM d, yyyy')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats footer */}
      <div className="p-6 pt-4 border-t border-gray-700 bg-gradient-to-t from-bg-tertiary/50 to-transparent">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-accent-primary">
              {branchStats[0]?.commitCount || 0}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Most Active Branch</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-accent-secondary">
              {totalBranches}
            </div>
            <div className="text-xs text-text-tertiary mt-1">Total Branches</div>
          </div>
        </div>
      </div>
    </div>
  )
}
