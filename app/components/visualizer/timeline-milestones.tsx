'use client'

import { useMemo } from 'react'
import { format, differenceInDays } from 'date-fns'
import type { CommitNode } from '@/types/github'
import { Calendar, Zap, Target } from 'lucide-react'

interface TimelineMilestonesProps {
  commits: CommitNode[]
  timeRange: {
    earliest: Date
    latest: Date
  }
}

export function TimelineMilestones({ commits, timeRange }: TimelineMilestonesProps) {
  const milestones = useMemo(() => {
    if (commits.length === 0) return []

    const daysDiff = differenceInDays(timeRange.latest, timeRange.earliest)

    return [
      {
        icon: Calendar,
        label: 'First Commit',
        date: timeRange.earliest,
        value: format(timeRange.earliest, 'MMM d, yyyy'),
        color: 'from-emerald-500 to-teal-500',
        textColor: 'text-emerald-400',
      },
      {
        icon: Zap,
        label: 'Duration',
        date: new Date((timeRange.earliest.getTime() + timeRange.latest.getTime()) / 2),
        value: daysDiff > 0 ? `${daysDiff} days` : 'Same day',
        color: 'from-purple-500 to-pink-500',
        textColor: 'text-purple-400',
      },
      {
        icon: Target,
        label: 'Latest Commit',
        date: timeRange.latest,
        value: format(timeRange.latest, 'MMM d, yyyy'),
        color: 'from-blue-500 to-cyan-500',
        textColor: 'text-blue-400',
      },
    ]
  }, [commits, timeRange])

  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-700">
        <h2 className="font-display text-2xl font-bold text-text-primary">
          Key Milestones
        </h2>
      </div>

      {/* Milestones */}
      <div className="p-6 space-y-4">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon
          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg p-4 border border-gray-700 bg-gradient-to-r from-bg-secondary/50 to-transparent hover:border-accent-primary transition-all duration-normal"
            >
              {/* Gradient accent background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r ${milestone.color} transition-opacity duration-normal pointer-events-none`} />

              <div className="relative flex items-start gap-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br ${milestone.color} flex-shrink-0 mt-0.5`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-text-tertiary uppercase tracking-wider">
                    {milestone.label}
                  </div>
                  <div className={`font-display text-lg font-bold mt-1 ${milestone.textColor}`}>
                    {milestone.value}
                  </div>
                </div>

                {/* Right accent line */}
                <div className={`w-1 h-12 bg-gradient-to-b ${milestone.color} opacity-0 group-hover:opacity-100 transition-opacity duration-normal`} />
              </div>
            </div>
          )
        })}
      </div>

      {/* Timeline info */}
      <div className="p-6 pt-4 border-t border-gray-700 bg-gradient-to-t from-bg-tertiary/50 to-transparent">
        <div className="text-center">
          <div className="text-3xl font-bold text-accent-primary">
            {commits.length.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary mt-2">
            Total commits across repository
          </div>
        </div>
      </div>
    </div>
  )
}
