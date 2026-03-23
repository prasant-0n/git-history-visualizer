'use client'

import { useState } from 'react'
import { FileText } from 'lucide-react'

interface SizeDistributionProps {
  data: {
    small: number
    medium: number
    large: number
    huge: number
  }
  totalCommits: number
}

export function SizeDistribution({ data, totalCommits }: SizeDistributionProps) {
  const [hovered, setHovered] = useState<string | null>(null)

  const categories = [
    { label: 'Small', count: data.small, color: 'from-emerald-500 to-teal-500', range: '0-50 lines' },
    { label: 'Medium', count: data.medium, color: 'from-blue-500 to-cyan-500', range: '51-200 lines' },
    { label: 'Large', count: data.large, color: 'from-orange-500 to-rose-500', range: '201-500 lines' },
    { label: 'Huge', count: data.huge, color: 'from-purple-500 to-pink-500', range: '500+ lines' },
  ]

  const maxCount = Math.max(...categories.map(c => c.count), 1)

  return (
    <div className="p-6 border-r border-gray-700 border-b border-gray-700">
      <div className="flex items-center gap-2 mb-6">
        <FileText className="w-4 h-4 text-accent-secondary" />
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Commit Size Distribution
        </h3>
      </div>

      <div className="space-y-4">
        {categories.map(cat => {
          const percentage = totalCommits > 0 ? (cat.count / totalCommits) * 100 : 0
          return (
            <div
              key={cat.label}
              className="group"
              onMouseEnter={() => setHovered(cat.label)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-text-secondary group-hover:text-accent-secondary transition-colors">
                  {cat.label}
                </span>
                <span className="font-mono text-xs text-text-tertiary">
                  {cat.count > 0 && `${percentage.toFixed(1)}%`}
                </span>
              </div>
              <div className={`h-2 bg-bg-hover rounded overflow-hidden group-hover:shadow-glow transition-all ${hovered === cat.label ? 'ring-1 ring-accent-secondary/50' : ''}`}>
                <div
                  className={`h-full bg-gradient-to-r ${cat.color} transition-all duration-300`}
                  style={{
                    width: `${(cat.count / maxCount) * 100}%`,
                  }}
                />
              </div>
              {hovered === cat.label && cat.count > 0 && (
                <div className="text-xs text-text-tertiary mt-1.5">
                  {cat.count.toLocaleString()} commits • {cat.range}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
