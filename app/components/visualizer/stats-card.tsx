'use client'

import type { GitHubRepo } from '@/types/github'
import { Star, GitFork, Users, Database } from 'lucide-react'

interface StatsCardProps {
  data: GitHubRepo
  contributors: number
}

export function StatsCard({ data, contributors }: StatsCardProps) {
  const stats = [
    { label: 'Stars', value: data.stars, icon: Star, color: 'text-yellow-400' },
    { label: 'Forks', value: data.forks, icon: GitFork, color: 'text-blue-400' },
    { label: 'Contributors', value: contributors, icon: Users, color: 'text-emerald-400' },
  ]

  return (
    <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg overflow-hidden hover:border-accent-primary transition-all duration-normal hover-lift">
      {/* Header with gradient accent line */}
      <div className="p-6 pb-4 border-b border-gray-700">
        <h2 className="font-display text-2xl font-bold text-text-primary flex items-center gap-2">
          <Database className="w-6 h-6 text-accent-primary" />
          Repository Stats
        </h2>
      </div>

      {/* Stats Grid */}
      <div className="p-6 space-y-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={stat.label} className="group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-text-secondary flex items-center gap-2">
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                  {stat.label}
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.value.toLocaleString()}
              </div>
              <div className="h-1 bg-bg-hover rounded overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                  style={{ width: `${Math.min((stat.value / 10000) * 100, 100)}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700" />

      {/* Details */}
      <div className="p-6 space-y-3">
        {data.language && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Language</span>
            <div className="px-3 py-1 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary text-xs font-bold rounded">
              {data.language}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Repository Size</span>
          <span className="font-mono text-text-primary">
            {(data.size / 1024).toFixed(1)} MB
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last Updated</span>
          <span className="font-mono text-text-primary">
            {new Date(data.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
          </span>
        </div>
      </div>
    </div>
  )
}
