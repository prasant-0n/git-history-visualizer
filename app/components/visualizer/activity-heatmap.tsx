'use client'

import { useMemo, useState } from 'react'
import { format, eachDayOfInterval, eachWeekOfInterval, endOfWeek } from 'date-fns'
import type { CommitNode } from '@/types/github'
import { Calendar } from 'lucide-react'

interface ActivityHeatmapProps {
  commits: CommitNode[]
  timeRange: {
    earliest: Date
    latest: Date
  }
}

export function ActivityHeatmap({ commits, timeRange }: ActivityHeatmapProps) {
  const [tooltipData, setTooltipData] = useState<{
    date: Date
    count: number
    x: number
    y: number
  } | null>(null)

  const commitsByDate = useMemo(() => {
    const map = new Map<string, number>()
    commits.forEach(commit => {
      const dateKey = format(commit.date, 'yyyy-MM-dd')
      map.set(dateKey, (map.get(dateKey) || 0) + 1)
    })
    return map
  }, [commits])

  const maxCommits = useMemo(() => {
    const values = Array.from(commitsByDate.values())
    return values.length > 0 ? Math.max(...values) : 1
  }, [commitsByDate])

  const weeks = useMemo(() => {
    const now = timeRange.latest
    const oneYearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
    const start = timeRange.earliest > oneYearAgo ? timeRange.earliest : oneYearAgo

    const allWeeks = eachWeekOfInterval({ start, end: now })

    return allWeeks.slice(-52).map(weekStart => {
      const weekEnd = endOfWeek(weekStart)
      const days = eachDayOfInterval({ start: weekStart, end: weekEnd }).slice(0, 7)
      return days
    })
  }, [timeRange])

  const getColor = (count: number) => {
    if (count === 0) return 'bg-bg-hover'
    const intensity = count / maxCommits
    if (intensity < 0.2) return 'bg-emerald-900/40'
    if (intensity < 0.4) return 'bg-emerald-700/60'
    if (intensity < 0.6) return 'bg-emerald-600/80'
    if (intensity < 0.8) return 'bg-emerald-500'
    return 'bg-accent-primary'
  }

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10">
            <Calendar className="w-5 h-5 text-accent-primary" />
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold text-text-primary">
              Commit Activity
            </h2>
            <p className="text-sm text-text-tertiary mt-1">
              Last 52 weeks of contributions
            </p>
          </div>
        </div>
      </div>

      {/* Heatmap Container */}
      <div className="p-6 bg-gradient-to-b from-bg-secondary/50 to-transparent">
        <div className="overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {/* Day labels */}
            <div className="flex flex-col gap-1 mr-2">
              <div className="h-6" /> {/* spacer for weeks label */}
              {days.map(day => (
                <div key={day} className="w-6 h-6 text-xs font-mono text-text-tertiary flex items-center justify-center">
                  {day[0]}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex}>
                  {/* Week number */}
                  {weekIndex % 4 === 0 && (
                    <div className="h-6 text-xs font-mono text-text-tertiary flex items-center justify-center px-1">
                      {weekIndex}
                    </div>
                  )}
                  {weekIndex % 4 !== 0 && <div className="h-6" />}

                  {/* Days in week */}
                  <div className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => {
                      const dateKey = format(day, 'yyyy-MM-dd')
                      const count = commitsByDate.get(dateKey) || 0

                      return (
                        <div
                          key={dayIndex}
                          className={`w-6 h-6 border border-gray-700 rounded transition-all cursor-pointer hover:scale-110 hover:shadow-glow ${getColor(count)}`}
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect()
                            setTooltipData({
                              date: day,
                              count,
                              x: rect.left + rect.width / 2,
                              y: rect.top
                            })
                          }}
                          onMouseLeave={() => setTooltipData(null)}
                          title={`${format(day, 'MMM d, yyyy')}: ${count} commits`}
                        />
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-700">
          <span className="text-xs font-medium text-text-tertiary">Less</span>
          <div className="w-4 h-4 bg-bg-hover border border-gray-700 rounded" />
          <div className="w-4 h-4 bg-emerald-900/40 border border-gray-700 rounded" />
          <div className="w-4 h-4 bg-emerald-700/60 border border-gray-700 rounded" />
          <div className="w-4 h-4 bg-emerald-500 border border-gray-700 rounded" />
          <div className="w-4 h-4 bg-accent-primary border border-gray-700 rounded" />
          <span className="text-xs font-medium text-text-tertiary">More</span>
          <div className="ml-auto text-xs text-text-secondary">
            {commitsByDate.size} active days
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltipData && (
        <div
          className="fixed px-4 py-2 text-xs font-mono whitespace-nowrap rounded bg-accent-primary text-bg-primary font-bold pointer-events-none z-[100] shadow-lg"
          style={{
            left: `${tooltipData.x}px`,
            top: `${tooltipData.y - 40}px`,
            transform: 'translateX(-50%)'
          }}
        >
          <div>{format(tooltipData.date, 'MMM d, yyyy')}</div>
          <div>{tooltipData.count} commit{tooltipData.count !== 1 ? 's' : ''}</div>
        </div>
      )}
    </div>
  )
}
