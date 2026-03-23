import { BarChart3, Network, Zap, Download, TrendingUp, Code } from 'lucide-react'
import { Card } from '@/components/ui/card'

const features = [
  {
    icon: BarChart3,
    title: 'Commit Intelligence',
    description: 'Analyze commit patterns with size distribution, peak hours, message quality scores, and velocity trends.',
    color: 'accent-primary',
  },
  {
    icon: Network,
    title: 'Contributor Network',
    description: 'Visualize top contributors in a constellation pattern. Discover collaboration dynamics and team patterns.',
    color: 'accent-secondary',
  },
  {
    icon: Zap,
    title: 'Activity Heatmap',
    description: 'GitHub-style calendar showing 52 weeks of contribution activity with beautiful color gradients.',
    color: 'accent-tertiary',
  },
  {
    icon: TrendingUp,
    title: 'Timeline Milestones',
    description: 'Track key repository dates: first commit, peak activity period, and latest changes in one view.',
    color: 'accent-success',
  },
  {
    icon: Code,
    title: 'Branch Overview',
    description: 'View all branches with commit distribution and last activity dates. Perfect for multi-branch projects.',
    color: 'accent-warning',
  },
  {
    icon: Download,
    title: 'Export & Share',
    description: 'Download high-resolution PNG snapshots of your dashboard. Share insights with your team effortlessly.',
    color: 'accent-error',
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-bg-primary relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary rounded-full mix-blend-screen opacity-5 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-bg-secondary mb-6">
            <span className="text-xs sm:text-sm font-medium text-text-secondary">Powerful Features</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
            Everything You Need
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive git analytics with beautiful visualizations and actionable insights for your repositories.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card 
                key={feature.title} 
                hoverable 
                variant="elevated"
                className="p-8 group"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Icon container with gradient background */}
                <div className={`w-14 h-14 rounded mb-6 flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 group-hover:shadow-glow transition-all duration-normal`}>
                  <Icon className={`w-7 h-7 text-${feature.color}`} strokeWidth={1.5} />
                </div>
                
                <h3 className="font-display text-xl font-semibold mb-3 text-text-primary">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary font-body">
                  {feature.description}
                </p>

                {/* Accent line on hover */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent-primary to-accent-secondary w-0 group-hover:w-full transition-all duration-normal" />
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
