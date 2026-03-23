'use client'

import { useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { value: 'light', label: 'Light', icon: Sun, description: 'Bright and clean' },
    { value: 'dark', label: 'Dark', icon: Moon, description: 'Easy on the eyes' },
    { value: 'system', label: 'System', icon: Monitor, description: 'Follow device' },
  ]

  const currentTheme = themes.find(t => t.value === theme)
  const CurrentIcon = currentTheme?.icon || Moon

  return (
    <div className="relative">
      {/* Theme Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg bg-bg-secondary border border-gray-700 hover:border-accent-primary transition-all duration-normal group flex items-center gap-2"
        title="Toggle theme"
        aria-label="Toggle theme"
        aria-expanded={isOpen}
      >
        <div className="relative w-5 h-5">
          {/* Animated icon container */}
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-normal group-hover:scale-110">
            <CurrentIcon className="w-5 h-5 text-text-secondary group-hover:text-accent-primary" />
          </div>
        </div>
        
        {/* Desktop label */}
        <span className="hidden md:inline text-sm font-medium text-text-secondary group-hover:text-text-primary">
          {currentTheme?.label}
        </span>
      </button>

      {/* Theme Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 bg-bg-secondary border border-gray-700 rounded-xl shadow-lg overflow-hidden z-50 animate-fadeIn">
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-700 bg-bg-tertiary">
            <h3 className="text-sm font-semibold text-text-primary">Choose Theme</h3>
            <p className="text-xs text-text-tertiary mt-1">Customize your viewing experience</p>
          </div>

          {/* Theme Options */}
          <div className="p-2">
            {themes.map((themeOption) => {
              const ThemeIcon = themeOption.icon
              const isActive = theme === themeOption.value

              return (
                <button
                  key={themeOption.value}
                  onClick={() => {
                    setTheme(themeOption.value as 'light' | 'dark' | 'system')
                    setIsOpen(false)
                  }}
                  className={`w-full px-4 py-3 rounded-lg text-left transition-all duration-normal group ${
                    isActive
                      ? 'bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 border border-accent-primary'
                      : 'hover:bg-bg-hover border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg transition-all duration-normal ${
                        isActive
                          ? 'bg-gradient-to-br from-accent-primary to-accent-secondary text-white'
                          : 'bg-bg-secondary text-text-secondary group-hover:text-accent-primary'
                      }`}
                    >
                      <ThemeIcon className="w-4 h-4" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold text-sm ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                          {themeOption.label}
                        </h4>
                        {isActive && (
                          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary" />
                        )}
                      </div>
                      <p className="text-xs text-text-tertiary mt-0.5">{themeOption.description}</p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer Info */}
          <div className="px-4 py-3 border-t border-gray-700 bg-bg-tertiary">
            <p className="text-xs text-text-tertiary text-center">
              Current: <span className="text-accent-primary font-semibold">{resolvedTheme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
            </p>
          </div>
        </div>
      )}

      {/* Close menu when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
