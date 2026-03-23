'use client'

import Link from 'next/link'
import { ThemeSwitcher } from './theme-switcher'
import { Github } from 'lucide-react'

export function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-bg-primary/80 backdrop-blur-xl border-b border-gray-700 transition-all duration-normal">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-xl font-bold bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
        >
          GitViz
        </Link>

        {/* Right section with nav items and theme switcher */}
        <div className="flex items-center gap-4">
          {/* GitHub link */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-secondary hover:text-accent-primary transition-colors duration-normal hover:bg-bg-secondary"
            title="Visit GitHub"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>

          {/* Theme Switcher */}
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}
