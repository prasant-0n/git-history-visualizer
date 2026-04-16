'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const [url, setUrl] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const match = url.match(/github\.com\/([^\/]+)\/([^\/\?#]+)/)
    if (match) {
      const [, owner, repo] = match
      router.push(`/visualize?owner=${owner}&repo=${repo}`)
    } else {
      alert('Please enter a valid GitHub repository URL')
    }
  }

  const sampleRepos = [
    { owner: 'facebook', repo: 'react', label: 'React' },
    { owner: 'microsoft', repo: 'vscode', label: 'VS Code' },
    { owner: 'vercel', repo: 'next.js', label: 'Next.js' },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-bg-primary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent-secondary rounded-full mix-blend-screen opacity-10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-accent-tertiary rounded-full mix-blend-screen opacity-5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-20 text-center relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-bg-secondary mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-accent-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-text-secondary">Welcome to Git History Visualizer</span>
        </div>

        {/* Headline with gradient */}
        <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight animate-slide-up">
          <span className="text-gradient">Transform</span>
          <br />
          <span className="text-text-primary">Git History Into Insights</span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-12 max-w-2xl mx-auto leading-relaxed">
          Visualize commit patterns, contributor activity, and repository metrics through an elegant, interactive dashboard.
        </p>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mb-12 space-y-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="relative max-w-2xl mx-auto">
            <Input
              type="text"
              placeholder="https://github.com/owner/repository"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                'text-center text-base py-4 pl-6 pr-14 text-lg',
                isFocused && 'border-accent-primary shadow-glow'
              )}
              required
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:text-accent-primary transition-colors text-text-secondary"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
          <Button type="submit" size="lg" variant="primary" className="w-full sm:w-auto">
            Visualize Repository
            <ArrowRight className="w-5 h-5" />
          </Button>
        </form>

        {/* Sample Repos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <span className="text-sm text-text-tertiary font-medium">Quick start:</span>
          <div className="flex flex-wrap justify-center gap-3">
            {sampleRepos.map(({ owner, repo, label }) => (
              <Button
                key={`${owner}/${repo}`}
                variant="secondary"
                size="sm"
                onClick={() => router.push(`/visualize?owner=${owner}&repo=${repo}`)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-20 pt-20 border-t border-gray-800 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {[
            { label: 'Repositories Visualized', value: '10K+' },
            { label: 'Total Commits Analyzed', value: '100M+' },
            { label: 'Active Contributors', value: '50K+' },
            { label: 'Insights Generated', value: '500K+' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-accent-primary mb-2">{stat.value}</div>
              <div className="text-xs sm:text-sm text-text-tertiary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
