'use client'

import { useState } from 'react'
import { MessageCircle } from 'lucide-react'

interface MessageQualityProps {
  data: {
    score: number
    conventionalCount: number
    shortCount: number
    averageLength: number
  }
}

export function MessageQuality({ data }: MessageQualityProps) {
  const [showDetails, setShowDetails] = useState(false)

  const getScoreColor = (score: number) => {
    if (score < 40) return 'from-red-500 to-rose-500'
    if (score < 70) return 'from-yellow-500 to-orange-500'
    return 'from-emerald-500 to-teal-500'
  }

  const getLabel = (score: number) => {
    if (score < 40) return 'Needs Work'
    if (score < 70) return 'Good'
    return 'Excellent'
  }

  const scoreGradient = getScoreColor(data.score)
  const label = getLabel(data.score)

  return (
    <div
      className="p-6 border-r border-gray-700 cursor-pointer group transition-all duration-normal"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-4 h-4 text-accent-secondary" />
        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider">
          Message Quality
        </h3>
      </div>

      <div className="space-y-4">
        {/* Score gauge */}
        <div>
          <div className="h-8 bg-bg-hover rounded-lg overflow-hidden ring-1 ring-gray-700 group-hover:ring-accent-secondary transition-all">
            <div
              className={`h-full bg-gradient-to-r ${scoreGradient} transition-all duration-500 flex items-center justify-end pr-3`}
              style={{ width: `${data.score}%` }}
            >
              {data.score > 30 && (
                <span className="font-bold text-xs text-white">
                  {Math.round(data.score)}%
                </span>
              )}
            </div>
          </div>

          {/* Scale labels */}
          <div className="flex justify-between mt-2">
            <span className="text-xs text-text-tertiary">0</span>
            <span className="text-xs text-text-tertiary">50</span>
            <span className="text-xs text-text-tertiary">100</span>
          </div>
        </div>

        {/* Score label */}
        <div className="text-center py-3">
          <div className={`font-display text-3xl font-bold bg-gradient-to-r ${scoreGradient} bg-clip-text text-transparent`}>
            {Math.round(data.score)}
          </div>
          <div className={`text-sm font-semibold mt-1 bg-gradient-to-r ${scoreGradient} bg-clip-text text-transparent`}>
            {label}
          </div>
        </div>

        {/* Details on hover */}
        {showDetails && (
          <div className="space-y-3 pt-4 border-t border-gray-700 animate-fadeIn">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Conventional Commits</span>
                <span className="font-semibold text-accent-secondary">{data.conventionalCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Too Short</span>
                <span className="font-semibold text-accent-tertiary">{data.shortCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Avg Message Length</span>
                <span className="font-mono text-sm text-text-primary">{Math.round(data.averageLength)} chars</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
