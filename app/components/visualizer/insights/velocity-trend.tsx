'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { Zap } from 'lucide-react'

interface VelocityTrendProps {
  data: {
    week: Date
    count: number
  }[]
}

export function VelocityTrend({ data }: VelocityTrendProps) {
  const [hoveredWeek, setHoveredWeek] = useState<typeof data[0] | null>(null)

  if (data.length === 0) {
    return (
      <div className="p-6">
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Velocity Trend
        </h3>
        <div className="flex items-center justify-center h-20 text-text-tertiary font-mono text-sm mt-4">
          No recent activity
        </div>
      </div>
    )
  }

  const maxCount = Math.max(...data.map(d => d.count), 1)
  const minCount = Math.min(...data.map(d => d.count))
  const avgCount = Math.round(data.reduce((sum, d) => sum + d.count, 0) / data.length)

  const generatePath = () => {
    if (data.length === 0) return ''
    const width = 100
    const height = 60
    const padding = 5

    const points = data.map((d, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * (width - padding * 2) + padding
      const y = height - padding - ((d.count / maxCount) * (height - padding * 2))
      return `${x},${y}`
    })

    return `M ${points.join(' L ')}`
  }

  const generateAreaPath = () => {
    const linePath = generatePath()
    if (!linePath) return ''
    const width = 100
    const height = 60
    return `${linePath} L ${100 - 5},${height} L 5,${height} Z`
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-4 h-4 text-accent-tertiary" />
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Velocity Trend
        </h3>
      </div>

      <div className="space-y-4">
        {/* Chart */}
        <div className="relative h-40">
          <svg viewBox="0 0 100 60" className="w-full h-full">
            <defs>
              <linearGradient id="velocityGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <path d={generateAreaPath()} fill="url(#velocityGradient)" />

            {/* Line */}
            <path
              d={generatePath()}
              fill="none"
              stroke="rgb(168, 85, 247)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points */}
            {data.map((d, i) => {
              const width = 100
              const height = 60
              const padding = 5
              const x = (i / Math.max(data.length - 1, 1)) * (width - padding * 2) + padding
              const y = height - padding - ((d.count / maxCount) * (height - padding * 2))

              const isMin = d.count === minCount
              const isMax = d.count === maxCount

              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r={isMin || isMax ? 2 : 1.5}
                  fill={isMax ? 'rgb(16, 185, 129)' : isMin ? 'rgb(239, 68, 68)' : 'rgb(168, 85, 247)'}
                  className="cursor-pointer transition-all duration-200"
                  style={{
                    opacity: hoveredWeek === d ? 1 : 0.6,
                    filter: hoveredWeek === d ? 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.8))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredWeek(d)}
                  onMouseLeave={() => setHoveredWeek(null)}
                />
              )
            })}
          </svg>

          {/* Tooltip */}
          {hoveredWeek && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-2 text-xs font-mono whitespace-nowrap rounded bg-accent-secondary text-bg-primary font-bold z-10 pointer-events-none shadow-lg">
              <div>Week of {format(hoveredWeek.week, 'MMM d')}</div>
              <div>{hoveredWeek.count} commits</div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 pt-2 border-t border-gray-700">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">{maxCount}</div>
            <div className="text-xs text-text-tertiary mt-1">Peak</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent-secondary">{avgCount}</div>
            <div className="text-xs text-text-tertiary mt-1">Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-400">{minCount}</div>
            <div className="text-xs text-text-tertiary mt-1">Low</div>
          </div>
        </div>
      </div>
    </div>
  )
}
