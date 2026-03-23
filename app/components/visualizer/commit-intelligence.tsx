'use client'

import { useMemo, useState } from 'react'
import type { CommitNode, CommitInsights } from '@/types/github'
import { SizeDistribution } from './insights/size-distribution'
import { PeakHoursClock } from './insights/peak-hours-clock'
import { MessageQuality } from './insights/message-quality'
import { VelocityTrend } from './insights/velocity-trend'
import { TrendingUp } from 'lucide-react'

interface CommitIntelligenceProps {
  commits: CommitNode[]
  insights: CommitInsights
}

export function CommitIntelligence({ commits, insights }: CommitIntelligenceProps) {
  const monthlyData = useMemo(() => {
    const groups = new Map<string, { count: number; contributors: Set<number> }>()

    commits.forEach(commit => {
      const month = commit.date.toISOString().substring(0, 7)
      if (!groups.has(month)) {
        groups.set(month, { count: 0, contributors: new Set() })
      }
      const group = groups.get(month)!
      group.count++
      group.contributors.add(commit.contributorId)
    })

    return Array.from(groups.entries()).map(([month, data]) => ({
      month,
      count: data.count,
      contributorCount: data.contributors.size,
    }))
  }, [commits])

  const maxCount = Math.max(...monthlyData.map(d => d.count), 1)
  const [hoveredMonth, setHoveredMonth] = useState<typeof monthlyData[0] | null>(null)

  const generateLinePath = (data: typeof monthlyData, max: number) => {
    if (data.length === 0) return ''
    const points = data.map((d, i) => {
      const x = (i / Math.max(data.length - 1, 1)) * 1000
      const y = 300 - ((d.count / max) * 280)
      return `${x},${y}`
    })
    return `M ${points.join(' L ')}`
  }

  const generateAreaPath = (data: typeof monthlyData, max: number) => {
    if (data.length === 0) return ''
    const linePath = generateLinePath(data, max)
    const lastX = 1000
    return `${linePath} L ${lastX},300 L 0,300 Z`
  }

  const getPointColor = (index: number) => {
    const progress = index / Math.max(monthlyData.length - 1, 1)
    if (progress < 0.33) return '#10b981'
    if (progress < 0.66) return '#3b82f6'
    return '#8b5cf6'
  }

  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg overflow-hidden hover-lift transition-all duration-normal">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10">
              <TrendingUp className="w-5 h-5 text-accent-primary" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-text-primary">
                Commit Intelligence
              </h2>
              <p className="text-sm text-text-tertiary mt-1">
                {commits.length.toLocaleString()} commits analyzed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="p-6 relative h-80 bg-gradient-to-b from-bg-secondary/50 to-transparent">
        <svg
          className="w-full h-full"
          viewBox="0 0 1000 320"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Grid */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={300 - (y * 2.8)}
              x2="1000"
              y2={300 - (y * 2.8)}
              stroke="rgba(107, 114, 128, 0.2)"
              strokeWidth="1"
            />
          ))}

          {/* Area */}
          <path
            d={generateAreaPath(monthlyData, maxCount)}
            fill="url(#areaGradient)"
          />

          {/* Line */}
          <path
            d={generateLinePath(monthlyData, maxCount)}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {monthlyData.map((data, index) => {
            const x = (index / Math.max(monthlyData.length - 1, 1)) * 1000
            const y = 300 - ((data.count / maxCount) * 280)
            const color = getPointColor(index)

            return (
              <g key={index}>
                <circle
                  cx={x}
                  cy={y}
                  r="6"
                  fill={color}
                  className="cursor-pointer hover:r-8 transition-all"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.5))' }}
                  onMouseEnter={() => setHoveredMonth(data)}
                  onMouseLeave={() => setHoveredMonth(null)}
                />
                {hoveredMonth === data && (
                  <g>
                    <rect
                      x={Math.min(Math.max(x - 75, 0), 850)}
                      y={Math.max(y - 75, 10)}
                      width="150"
                      height="65"
                      fill="hsl(var(--bg-secondary))"
                      stroke={color}
                      strokeWidth="2"
                      rx="4"
                    />
                    <text
                      x={Math.min(Math.max(x, 75), 925)}
                      y={Math.max(y - 55, 30)}
                      textAnchor="middle"
                      className="font-mono text-xs font-bold"
                      fill={color}
                    >
                      <tspan x={Math.min(Math.max(x, 75), 925)} dy="0">{data.month}</tspan>
                      <tspan x={Math.min(Math.max(x, 75), 925)} dy="14" fill="hsl(var(--text-primary))">{data.count} commits</tspan>
                      <tspan x={Math.min(Math.max(x, 75), 925)} dy="14" fill="hsl(var(--text-secondary))">{data.contributorCount} contributors</tspan>
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>

        {/* Labels */}
        <div className="absolute bottom-0 left-6 right-6 h-12 pointer-events-none">
          {monthlyData.filter((_, i) => i % Math.max(1, Math.floor(monthlyData.length / 4)) === 0).map((data, idx) => {
            const originalIndex = idx * Math.max(1, Math.floor(monthlyData.length / 4))
            const x = (originalIndex / Math.max(monthlyData.length - 1, 1)) * 100
            return (
              <div
                key={data.month}
                className="absolute text-xs font-mono text-text-tertiary whitespace-nowrap"
                style={{
                  left: `${x}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                {data.month}
              </div>
            )
          })}
        </div>
      </div>

      {/* Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-700">
        <div className="border-r border-gray-700 md:border-b md:border-r">
          <SizeDistribution data={insights.sizeDistribution} totalCommits={commits.length} />
        </div>
        <div className="md:border-b">
          <PeakHoursClock data={insights.peakHours} />
        </div>
        <div className="border-r border-gray-700">
          <MessageQuality data={insights.messageQuality} />
        </div>
        <div>
          <VelocityTrend data={insights.velocityTrend} />
        </div>
      </div>
    </div>
  )
}
