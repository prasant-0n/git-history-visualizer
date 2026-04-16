import { GitBranch, Zap, Database, Share2, ArrowRight, Code2, BarChart3, Rocket } from 'lucide-react'

const steps = [
  {
    icon: Code2,
    number: '01',
    title: 'Enter GitHub URL',
    description: 'Paste any public GitHub repository URL or select from popular examples to begin',
    gradient: 'from-blue-600 to-cyan-500',
    bgGradient: 'from-blue-600/10 to-cyan-500/10',
    accentColor: 'bg-blue-600',
  },
  {
    icon: Database,
    number: '02',
    title: 'Fetch & Process',
    description: 'We analyze commits, branches, and contributors to build your visualization intelligently',
    gradient: 'from-purple-600 to-pink-500',
    bgGradient: 'from-purple-600/10 to-pink-500/10',
    accentColor: 'bg-purple-600',
  },
  {
    icon: BarChart3,
    number: '03',
    title: 'Advanced Analytics',
    description: 'Generate deep insights with commit intelligence and contribution patterns automatically',
    gradient: 'from-teal-600 to-emerald-500',
    bgGradient: 'from-teal-600/10 to-emerald-500/10',
    accentColor: 'bg-teal-600',
  },
  {
    icon: Rocket,
    number: '04',
    title: 'Explore & Export',
    description: 'Interact with your git history, discover patterns, and export snapshots seamlessly',
    gradient: 'from-orange-500 to-red-600',
    bgGradient: 'from-orange-500/10 to-red-600/10',
    accentColor: 'bg-orange-500',
  },
]

export function HowItWorksSection() {
  return (
    <section className="py-32 px-6 sm:px-8 bg-gradient-to-b from-bg-primary via-bg-primary to-bg-secondary dark:from-bg-primary dark:via-bg-primary dark:to-bg-secondary relative overflow-hidden">
      {/* Animated background elements - theme-aware */}
      <div className="absolute inset-0 opacity-40 pointer-events-none dark:opacity-25">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob dark:opacity-10" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000 dark:opacity-10" />
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-teal-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000 dark:opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header - Enhanced */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-primary/40 dark:border-accent-primary/30 bg-accent-primary/8 dark:bg-accent-primary/10 mb-6">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-semibold text-accent-primary dark:text-accent-secondary uppercase tracking-widest">Process</span>
          </div>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-text-primary dark:text-gray-100 text-balance leading-tight">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-text-secondary dark:text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
            Transform your GitHub repository into stunning visual insights in just four simple steps
          </p>
        </div>

        {/* Steps grid - Enhanced card design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connection line (visible on lg screens) */}
          <div className="hidden lg:block absolute top-32 left-[7%] right-[7%] h-1 bg-gradient-to-r from-transparent via-accent-primary to-transparent opacity-30 -z-10" />

          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="group relative">
                {/* Card container with professional styling - theme aware */}
                <div className="relative h-full bg-gradient-to-br from-bg-secondary to-bg-tertiary dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-gray-700/50 dark:border-gray-700 p-8 flex flex-col transition-all duration-300 hover:border-accent-primary/50 dark:hover:border-accent-primary/40 hover:shadow-xl dark:hover:shadow-2xl">
                  {/* Top accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 rounded-t-2xl transition-opacity duration-300`} />

                  {/* Step number badge - modern design with proper contrast */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} text-white font-bold text-lg mb-6 group-hover:scale-110 shadow-lg transition-transform duration-300`}>
                    {step.number.split('').pop()}
                  </div>

                  {/* Icon circle - enhanced with better visibility in both modes */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.bgGradient} flex items-center justify-center mb-6 group-hover:shadow-lg transition-all duration-300`}>
                    <Icon className={`w-8 h-8 text-accent-primary dark:text-accent-primary`} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-2xl font-bold mb-3 text-text-primary dark:text-gray-100 group-hover:text-accent-primary dark:group-hover:text-accent-secondary transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary dark:text-gray-400 font-body leading-relaxed mb-6 flex-grow">
                    {step.description}
                  </p>

                  {/* Arrow indicator */}
                  <div className="flex items-center gap-2 text-accent-primary dark:text-accent-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs font-semibold">Continue</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Glow effect on hover */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 -z-10 blur-xl`} />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA - Enhanced */}
        <div className="mt-20 flex flex-col items-center gap-8">
          <div className="text-center">
            <p className="text-text-secondary dark:text-gray-400 mb-2 text-lg">Ready to visualize your repository?</p>
            <p className="text-text-tertiary dark:text-gray-500 text-sm">No sign-up required. Works with any public repository.</p>
          </div>
          <a 
            href="#hero" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-primary to-accent-secondary dark:from-blue-600 dark:to-cyan-500 text-white font-semibold rounded-lg hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover-lift group"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Add animation keyframes styles via style tag */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
