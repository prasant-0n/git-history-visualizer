'use client'

import { useState } from 'react'
import { X, Copy, Check, Mail, MessageCircle, Linkedin, Github, Link2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  owner: string
  repo: string
  url: string
}

export function ShareModal({ isOpen, onClose, owner, repo, url }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: Link2,
      color: 'from-blue-500 to-cyan-500',
      action: () => {
        navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'from-red-500 to-pink-500',
      action: () => {
        const subject = `Check out: ${owner}/${repo} Git Analytics`
        const body = `I just analyzed ${owner}/${repo} with Git History Visualizer:\n\n${url}`
        window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
      },
    },
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'from-green-500 to-emerald-500',
      action: () => {
        const message = `Check out this Git analytics dashboard for ${owner}/${repo}: ${url}`
        window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank')
      },
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'from-blue-600 to-blue-700',
      action: () => {
        const title = `Git Analytics: ${owner}/${repo}`
        const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        window.open(shareUrl, '_blank')
      },
    },
    {
      name: 'GitHub',
      icon: Github,
      color: 'from-gray-700 to-gray-900',
      action: () => {
        window.open(`https://github.com/${owner}/${repo}`, '_blank')
      },
    },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-bg-secondary to-bg-tertiary border border-gray-700 rounded-lg max-w-md w-full overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="p-6 pb-4 border-b border-gray-700 flex justify-between items-center">
                <div>
                  <h2 className="font-display text-2xl font-bold text-text-primary">
                    Share Dashboard
                  </h2>
                  <p className="text-sm text-text-tertiary mt-1">
                    {owner}/{repo}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-bg-hover rounded transition-colors text-text-secondary hover:text-text-primary"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* URL Input */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-3">
                    Dashboard Link
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={url}
                      readOnly
                      className="flex-1 px-4 py-3 bg-bg-hover border border-gray-700 rounded-lg text-text-secondary text-sm font-mono focus-visible:border-accent-primary focus-visible:outline-none"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(url)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="px-4 py-3 bg-accent-primary text-bg-primary rounded-lg hover:shadow-lg transition-all duration-normal font-semibold flex items-center gap-2 hover-lift"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Share Options */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-4">
                    Share Via
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {shareOptions.map((option) => {
                      const Icon = option.icon
                      return (
                        <button
                          key={option.name}
                          onClick={option.action}
                          className={`p-4 rounded-lg border border-gray-700 bg-bg-hover hover:border-accent-primary transition-all duration-normal group flex flex-col items-center justify-center gap-3`}
                        >
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${option.color} flex items-center justify-center group-hover:shadow-lg transition-transform group-hover:scale-110`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-xs font-semibold text-text-primary group-hover:text-accent-primary transition-colors">
                            {option.name}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 rounded-lg bg-bg-hover border border-gray-700">
                  <p className="text-xs text-text-tertiary">
                    Share your Git analytics dashboard with team members or on social media to showcase repository insights.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-4 border-t border-gray-700">
                <button
                  onClick={onClose}
                  className="w-full px-4 py-3 bg-bg-hover border border-gray-700 rounded-lg text-text-primary font-semibold hover:border-accent-primary transition-all duration-normal"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
