import { TrendingUp, Users, Heart } from 'lucide-react'

const stats = [
  { 
    icon: TrendingUp,
    value: '100M+', 
    label: 'Commits Visualized',
    description: 'Across thousands of repositories'
  },
  { 
    icon: Users,
    value: '50K+', 
    label: 'Contributors Analyzed',
    description: 'From open source projects worldwide'
  },
  { 
    icon: Heart,
    value: '100%', 
    label: 'Open Source',
    description: 'Built with love for the community'
  },
]

export function StatsSection() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-bg-secondary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-accent-primary/20 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent-secondary rounded-full mix-blend-screen opacity-5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Card background */}
                <div className="absolute inset-0 bg-gradient-to-br from-bg-tertiary/50 to-bg-primary/50 border border-gray-700 group-hover:border-accent-primary transition-colors duration-normal" />
                
                {/* Content */}
                <div className="relative p-8 text-center">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10 mx-auto mb-6 group-hover:shadow-glow transition-all duration-normal">
                    <Icon className="w-7 h-7 text-accent-primary" strokeWidth={1.5} />
                  </div>

                  {/* Value */}
                  <div className="font-display text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary mb-4 group-hover:scale-105 transition-transform duration-normal">
                    {stat.value}
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold text-text-primary mb-2">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary font-body">
                    {stat.description}
                  </p>
                </div>

                {/* Hover border animation */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-normal border border-accent-primary pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Bottom message */}
        <div className="mt-16 pt-12 border-t border-gray-800 text-center">
          <p className="text-text-secondary mb-2">Join thousands of developers visualizing their git history</p>
          <p className="text-sm text-text-tertiary">No sign-up required. Get started with any public GitHub repository.</p>
        </div>
      </div>
    </section>
  )
}
