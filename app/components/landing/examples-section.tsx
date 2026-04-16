'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Star, ArrowRight } from 'lucide-react'

const examples = [
  {
    owner: 'facebook',
    repo: 'react',
    name: 'React',
    description: 'A declarative, efficient JavaScript library for building user interfaces',
    stars: '220k',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    owner: 'microsoft',
    repo: 'vscode',
    name: 'VS Code',
    description: 'Visual Studio Code - Open Source code editor',
    stars: '160k',
    color: 'from-purple-600 to-pink-500',
  },
  {
    owner: 'vercel',
    repo: 'next.js',
    name: 'Next.js',
    description: 'The React Framework for production',
    stars: '130k',
    color: 'from-green-600 to-teal-500',
  },
]

export function ExamplesSection() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const handleNavigate = (owner: string, repo: string) => {
    startTransition(() => {
      router.push(`/visualize?owner=${owner}&repo=${repo}`)
    })
  }

  return (
    <section className="py-24 px-6 sm:px-8 bg-bg-primary relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent-secondary rounded-full mix-blend-screen opacity-5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-bg-secondary mb-6">
            <span className="text-xs sm:text-sm font-medium text-text-secondary">Popular Repositories</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
            Explore Example Visualizations
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Click any repository to explore its git history and insights interactively
          </p>
        </div>

        {/* Examples grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {examples.map((example, index) => (
            <Card
              key={`${example.owner}/${example.repo}`}
              variant="elevated"
              className={`cursor-pointer group overflow-hidden transition-all duration-normal ${isPending ? 'opacity-60 pointer-events-none' : ''}`}
              onClick={() => handleNavigate(example.owner, example.repo)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  handleNavigate(example.owner, example.repo)
                }
              }}
            >
              {/* Gradient header */}
              <div className={`h-40 sm:h-48 bg-gradient-to-br ${example.color} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-normal" />
                <span className="text-7xl sm:text-8xl font-display font-bold text-white/80 group-hover:text-white transition-colors">
                  {example.name[0]}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col h-48">
                <div className="flex justify-between items-start gap-2 mb-3">
                  <h3 className="font-display text-2xl font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                    {example.name}
                  </h3>
                  <div className="flex items-center gap-1 px-2 py-1 bg-bg-hover rounded text-xs font-mono text-text-secondary">
                    <Star className="w-3 h-3" fill="currentColor" />
                    {example.stars}
                  </div>
                </div>
                
                <p className="text-sm text-text-secondary font-body leading-relaxed flex-grow">
                  {example.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-accent-primary group-hover:gap-3 transition-all duration-normal mt-4">
                  <span className="text-sm font-medium">Visualize</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary w-0 group-hover:w-full transition-all duration-normal" />
            </Card>
          ))}
        </div>

        {/* More examples CTA */}
        <div className="text-center">
          <p className="text-text-secondary mb-4">Want to visualize a different repository?</p>
          <a
            href="#hero"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-bg-primary font-medium hover:shadow-lg transition-all duration-normal hover-lift"
          >
            Enter Your Repository
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
