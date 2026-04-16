'use client'

import { useState } from 'react'
import { Mail, MessageCircle, Copy, X, Check } from 'lucide-react'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  owner: string
  repo: string
}

export function ShareModal({ isOpen, onClose, owner, repo }: ShareModalProps) {
  const [copied, setCopied] = useState(false)
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = `Check out ${repo} - Beautiful Git History Visualization`
  const shareMessage = `I'm analyzing ${owner}/${repo} with Git History Visualizer - see stunning insights about commits, contributors, and activity patterns! 📊`

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle)
    const body = encodeURIComponent(`${shareMessage}\n\nView it here: ${shareUrl}`)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareMessage}\n\n${shareUrl}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  const handleTwitterShare = () => {
    const text = encodeURIComponent(`${shareMessage} ${shareUrl}`)
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank')
  }

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(shareUrl)
    const title = encodeURIComponent(shareTitle)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`, '_blank')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-bg-secondary border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-bg-hover rounded-lg transition-colors duration-normal text-text-secondary hover:text-text-primary"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold text-text-primary mb-2">
            Share Dashboard
          </h2>
          <p className="text-text-secondary text-sm">
            Share this visualization with your team or on social media
          </p>
        </div>

        {/* Share options grid */}
        <div className="space-y-4 mb-8">
          {/* Email share */}
          <button
            onClick={handleEmailShare}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/5 border border-blue-500/30 hover:border-blue-500/60 transition-all duration-300 group"
          >
            <div className="p-3 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
              <Mail className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-text-primary">Email</h3>
              <p className="text-xs text-text-secondary">Send via email</p>
            </div>
            <div className="text-blue-400">→</div>
          </button>

          {/* WhatsApp share */}
          <button
            onClick={handleWhatsAppShare}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 hover:border-green-500/60 transition-all duration-300 group"
          >
            <div className="p-3 rounded-lg bg-green-500/20 group-hover:bg-green-500/30 transition-colors">
              <MessageCircle className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-text-primary">WhatsApp</h3>
              <p className="text-xs text-text-secondary">Share on WhatsApp</p>
            </div>
            <div className="text-green-400">→</div>
          </button>

          {/* Twitter share */}
          <button
            onClick={handleTwitterShare}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-sky-500/10 to-sky-500/5 border border-sky-500/30 hover:border-sky-500/60 transition-all duration-300 group"
          >
            <div className="p-3 rounded-lg bg-sky-500/20 group-hover:bg-sky-500/30 transition-colors">
              <svg className="w-5 h-5 text-sky-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 9-1 9-5.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-text-primary">Twitter</h3>
              <p className="text-xs text-text-secondary">Post on Twitter</p>
            </div>
            <div className="text-sky-400">→</div>
          </button>

          {/* LinkedIn share */}
          <button
            onClick={handleLinkedInShare}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-600/10 to-blue-600/5 border border-blue-600/30 hover:border-blue-600/60 transition-all duration-300 group"
          >
            <div className="p-3 rounded-lg bg-blue-600/20 group-hover:bg-blue-600/30 transition-colors">
              <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <h3 className="font-semibold text-text-primary">LinkedIn</h3>
              <p className="text-xs text-text-secondary">Share on LinkedIn</p>
            </div>
            <div className="text-blue-500">→</div>
          </button>
        </div>

        {/* Copy link section */}
        <div className="border-t border-gray-700 pt-6">
          <label className="text-xs font-semibold text-text-secondary uppercase tracking-wider block mb-3">
            Or copy the link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-bg-tertiary border border-gray-700 rounded-lg px-4 py-3 text-text-secondary text-sm focus:outline-none focus:border-accent-primary transition-colors"
            />
            <button
              onClick={handleCopy}
              className={`p-3 rounded-lg transition-all duration-300 ${
                copied
                  ? 'bg-green-500/20 border border-green-500 text-green-400'
                  : 'bg-bg-tertiary border border-gray-700 text-text-secondary hover:border-accent-primary hover:text-accent-primary'
              }`}
              aria-label="Copy link"
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
