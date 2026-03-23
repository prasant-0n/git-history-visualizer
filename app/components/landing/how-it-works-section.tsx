import { GitBranch, Zap, Database, Share2, ArrowRight, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: GitBranch,
    number: '01',
    title: 'Enter GitHub URL',
    description: 'Paste any public GitHub repository URL or select from popular examples',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Database,
    number: '02',
    title: 'Fetch & Process',
    description: 'We analyze commits, branches, and contributors to build your visualization',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Advanced Analytics',
    description: 'Generate deep insights with commit intelligence and contribution patterns',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Share2,
    number: '04',
    title: 'Explore & Export',
    description: 'Interact with your git history, discover patterns, and export snapshots',
    color: 'from-emerald-500 to-teal-500',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-32 px-6 sm:px-8 bg-gradient-to-b from-bg-primary via-bg-secondary to-bg-primary relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-accent-primary rounded-full mix-blend-multiply blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent-secondary rounded-full mix-blend-multiply blur-3xl" />
        <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-accent-tertiary rounded-full mix-blend-multiply blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 bg-bg-secondary mb-6">
            <span className="text-xs sm:text-sm font-semibold text-accent-primary uppercase tracking-wide">Workflow</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-text-primary text-balance">
            How It Works
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto font-body leading-relaxed">
            Transform your GitHub repository into powerful, interactive insights with our streamlined four-step process
          </p>
        </div>

        {/* Steps grid with enhanced design */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Animated connection line */}
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-30" />
          <div className="hidden md:block absolute top-32 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-20 blur-sm" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative group">
                {/* Connector dots */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-32 -right-4 w-8 h-8">
                    <div className="w-full h-full rounded-full border-2 border-bg-primary bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center shadow-lg">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}

                {/* Card background */}
                <div className="h-full bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-xl p-8 transition-all duration-normal group-hover:border-accent-primary group-hover:shadow-lg hover-lift relative overflow-hidden">
                  {/* Gradient accent corner */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-5 rounded-full -mr-16 -mt-16 group-hover:opacity-10 transition-opacity duration-normal`} />

                  <div className="relative z-10 flex flex-col h-full">
                    {/* Icon container */}
                    <div className="mb-8">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-normal`}>
                        <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                      </div>
                      
                      {/* Step number badge */}
                      <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${step.color} text-white text-xs font-bold`}>
                        Step {step.number}
                      </span>
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-2xl font-bold mb-4 text-text-primary group-hover:text-accent-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-base text-text-secondary font-body leading-relaxed flex-grow">
                      {step.description}
                    </p>

                    {/* Bottom accent */}
                    <div className={`mt-6 h-1 w-12 bg-gradient-to-r ${step.color} rounded-full group-hover:w-full transition-all duration-normal`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom section with benefits and CTA */}
        <div className="mt-24">
          <div className="bg-gradient-to-r from-bg-secondary to-bg-tertiary border border-gray-700 rounded-2xl p-12 text-center relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 opacity-5 bg-gradient-to-r from-accent-primary to-accent-secondary blur-2xl" />
            
            <div className="relative z-10">
              <h3 className="font-display text-3xl font-bold text-text-primary mb-8">
                Ready to unlock your repository insights?
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-text-primary mb-2">Real-time Analytics</h4>
                    <p className="text-sm text-text-secondary">Instant processing of your entire commit history</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-text-primary mb-2">Deep Insights</h4>
                    <p className="text-sm text-text-secondary">Discover patterns in code and contributors</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-1" />
                  <div className="text-left">
                    <h4 className="font-semibold text-text-primary mb-2">Export & Share</h4>
                    <p className="text-sm text-text-secondary">Beautiful dashboards ready to share</p>
                  </div>
                </div>
              </div>

              <a href="#hero" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary text-bg-primary font-semibold rounded-lg hover:shadow-lg transition-all duration-normal hover-lift text-lg">
                Start Visualizing
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
