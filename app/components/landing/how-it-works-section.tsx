import { GitBranch, Zap, Database, Share2 } from 'lucide-react'

const steps = [
  {
    icon: GitBranch,
    number: '01',
    title: 'Enter GitHub URL',
    description: 'Paste any public GitHub repository URL or select from popular examples',
  },
  {
    icon: Database,
    number: '02',
    title: 'Fetch & Process',
    description: 'We analyze commits, branches, and contributors to build your visualization',
  },
  {
    icon: Zap,
    number: '03',
    title: 'Advanced Analytics',
    description: 'Generate deep insights with commit intelligence and contribution patterns',
  },
  {
    icon: Share2,
    number: '04',
    title: 'Explore & Export',
    description: 'Interact with your git history, discover patterns, and export snapshots',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-24 px-6 sm:px-8 bg-gradient-to-b from-bg-primary to-bg-secondary relative">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-5 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-secondary rounded-full mix-blend-screen opacity-5 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-700 bg-bg-secondary mb-6">
            <span className="text-xs sm:text-sm font-medium text-text-secondary">Process</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-text-primary">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Simple steps to transform your GitHub repository into interactive insights
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connection line (visible only on desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-tertiary -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative">
                {/* Step card */}
                <div className="text-center">
                  {/* Icon circle */}
                  <div className="w-24 h-24 rounded-full border-2 border-accent-primary flex items-center justify-center mx-auto mb-6 bg-gradient-to-br from-accent-primary/10 to-accent-secondary/10 relative z-20 group hover:shadow-glow transition-all duration-normal">
                    <Icon className="w-10 h-10 text-accent-primary group-hover:text-accent-secondary transition-colors" strokeWidth={1.5} />
                  </div>
                  
                  {/* Step number */}
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent-primary text-bg-primary flex items-center justify-center text-xs font-bold">
                    {step.number}
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold mb-3 text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary font-body leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-text-secondary mb-6">Ready to visualize your repository?</p>
          <a href="#hero" className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-bg-primary font-medium hover:shadow-lg transition-all duration-normal hover-lift">
            Get Started Now
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
