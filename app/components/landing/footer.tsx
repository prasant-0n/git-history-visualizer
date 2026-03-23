import { Github, Linkedin, Mail } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-gray-800 py-16 px-6 sm:px-8 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-5 blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-gray-800">
          {/* Column 1: About */}
          <div>
            <h3 className="font-display text-lg font-semibold text-text-primary mb-4">Git History Visualizer</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Transform GitHub repositories into beautiful, interactive dashboards with advanced analytics and insights.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/prasant-0n/git-history-visualizer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                >
                  GitHub Repository
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prasant-0n/git-history-visualizer#readme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/prasant-0n/git-history-visualizer/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent-primary transition-colors"
                >
                  Report Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tech Stack */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Built With</h4>
            <ul className="space-y-2">
              <li className="text-sm text-text-secondary">Next.js 16</li>
              <li className="text-sm text-text-secondary">React 19</li>
              <li className="text-sm text-text-secondary">TypeScript</li>
              <li className="text-sm text-text-secondary">Tailwind CSS</li>
            </ul>
          </div>
        </div>

        {/* Bottom section: Social links and copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Copyright */}
          <p className="text-xs text-text-tertiary font-body mb-4 sm:mb-0">
            © {currentYear} Git History Visualizer. All rights reserved.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/prasant-0n"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="w-10 h-10 rounded flex items-center justify-center border border-gray-700 text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-normal hover-lift"
            >
              <Github className="w-4 h-4" />
            </a>

            <a
              href="https://linkedin.com/in/prasant-sinha"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="w-10 h-10 rounded flex items-center justify-center border border-gray-700 text-text-secondary hover:text-accent-secondary hover:border-accent-secondary transition-all duration-normal hover-lift"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            <a
              href="mailto:contact@githistory.dev"
              aria-label="Email Contact"
              className="w-10 h-10 rounded flex items-center justify-center border border-gray-700 text-text-secondary hover:text-accent-tertiary hover:border-accent-tertiary transition-all duration-normal hover-lift"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
