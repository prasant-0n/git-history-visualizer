'use client'

import { useState } from 'react'
import { Clock } from 'lucide-react'

interface PeakHoursClockProps {
  data: {
    hour: number
    count: number
  }[]
}

export function PeakHoursClock({ data }: PeakHoursClockProps) {
  const [hoveredHour, setHoveredHour] = useState<number | null>(null)

  const hourMap = new Map(data.map(d => [d.hour, d.count]))
  const maxCount = Math.max(...data.map(d => d.count), 1)

  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    count: hourMap.get(i) || 0,
  }))

  const getColor = (count: number) => {
    const intensity = count / maxCount
    if (intensity === 0) return 'from-gray-700 to-gray-800'
    if (intensity < 0.25) return 'from-blue-600 to-blue-700'
    if (intensity < 0.5) return 'from-blue-500 to-cyan-500'
    if (intensity < 0.75) return 'from-cyan-500 to-emerald-500'
    return 'from-emerald-400 to-teal-500'
  }

  const cx = 50
  const cy = 50
  const radius = 35
  const innerRadius = 20

  const peakHour = hours.reduce((max, h) => h.count > max.count ? h : max)
  const totalHours = hours.reduce((sum, h) => sum + h.count, 0)

  return (
    <div className="p-6 border-r border-gray-700 border-b border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-4 h-4 text-accent-tertiary" />
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Peak Hours
        </h3>
      </div>

      <div className="space-y-4">
        {/* Clock visualization */}
        <svg viewBox="0 0 100 100" className="w-full h-auto max-w-xs mx-auto">
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Center circle */}
          <circle cx={cx} cy={cy} r={innerRadius} fill="hsl(var(--bg-tertiary))" stroke="hsl(var(--gray-700))" strokeWidth="1" />

          {/* Hour segments */}
          {hours.map(({ hour, count }) => {
            const angle = (hour / 24) * 360 - 90
            const nextAngle = ((hour + 1) / 24) * 360 - 90

            const x1 = cx + innerRadius * Math.cos((angle * Math.PI) / 180)
            const y1 = cy + innerRadius * Math.sin((angle * Math.PI) / 180)
            const x2 = cx + radius * Math.cos((angle * Math.PI) / 180)
            const y2 = cy + radius * Math.sin((angle * Math.PI) / 180)
            const x3 = cx + radius * Math.cos((nextAngle * Math.PI) / 180)
            const y3 = cy + radius * Math.sin((nextAngle * Math.PI) / 180)
            const x4 = cx + innerRadius * Math.cos((nextAngle * Math.PI) / 180)
            const y4 = cy + innerRadius * Math.sin((nextAngle * Math.PI) / 180)

            const path = `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1} Z`
            const colorClass = getColor(count)
            const bgColor = count === 0 ? 'rgba(55, 65, 81, 0.5)' : ''

            return (
              <g key={hour}>
                <path
                  d={path}
                  className={`cursor-pointer transition-opacity duration-200 ${hoveredHour === hour ? 'opacity-100' : 'opacity-70'}`}
                  style={{
                    fill: count === 0 ? 'rgba(55, 65, 81, 0.3)' : `url(#grad-${hour})`,
                    stroke: hoveredHour === hour ? 'rgba(16, 185, 129, 0.8)' : 'hsl(var(--bg-primary))',
                    strokeWidth: hoveredHour === hour ? 1 : 0.5,
                    filter: hoveredHour === hour ? 'drop-shadow(0 0 4px rgba(16, 185, 129, 0.5))' : 'none'
                  }}
                  onMouseEnter={() => setHoveredHour(hour)}
                  onMouseLeave={() => setHoveredHour(null)}
                />
                {count > 0 && (
                  <defs>
                    <linearGradient id={`grad-${hour}`} x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="rgb(16, 185, 129)" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                )}
              </g>
            )
          })}

          {/* Hour markers */}
          {[0, 6, 12, 18].map(hour => {
            const angle = (hour / 24) * 360 - 90
            const labelRadius = radius + 8
            const x = cx + labelRadius * Math.cos((angle * Math.PI) / 180)
            const y = cy + labelRadius * Math.sin((angle * Math.PI) / 180)

            return (
              <text
                key={hour}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-mono text-[7px] fill-text-tertiary"
              >
                {hour}
              </text>
            )
          })}
        </svg>

        {/* Stats */}
        <div className="space-y-2 pt-4 border-t border-gray-700">
          {peakHour.count > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-text-secondary">Peak Time</span>
              <div className="text-right">
                <div className="font-semibold text-accent-secondary">
                  {peakHour.hour}:00 - {(peakHour.hour + 1) % 24}:00
                </div>
                <div className="text-xs text-text-tertiary">
                  {peakHour.count} commits
                </div>
              </div>
            </div>
          )}
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Total Commits</span>
            <span className="font-semibold text-text-primary">{totalHours.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {hoveredHour !== null && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="px-4 py-2 text-xs font-mono whitespace-nowrap rounded bg-accent-primary text-bg-primary font-bold shadow-lg">
            <div>{hoveredHour}:00 - {(hoveredHour + 1) % 24}:00</div>
            <div>{(hourMap.get(hoveredHour) || 0).toLocaleString()} commits</div>
          </div>
        </div>
      )}
    </div>
  )
}
