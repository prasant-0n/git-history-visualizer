'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Download, ArrowLeft, Share2, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useVisualizerStore } from '@/lib/visualizer-store'
import { ShareModal } from './share-modal'

interface TopBarProps {
  owner: string
  repo: string
}

export function TopBar({ owner, repo }: TopBarProps) {
  const router = useRouter()
  const [showShareModal, setShowShareModal] = useState(false)
  const setShowExportModal = useVisualizerStore(state => state.setShowExportModal)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-bg-secondary border-b border-gray-800 backdrop-blur-md bg-opacity-95">
        <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
          {/* Left: Back + Repo Info */}
          <div className="flex items-center gap-4 min-w-0 flex-1">
            <button
              onClick={() => router.push('/')}
              className="p-2 hover:bg-bg-hover rounded transition-all duration-normal text-text-secondary hover:text-text-primary flex-shrink-0"
              aria-label="Go back to home"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg md:text-2xl font-bold text-text-primary truncate">
                  {repo}
                </h1>
                <span className="text-text-tertiary text-sm hidden md:inline">/</span>
                <span className="text-text-secondary text-sm md:text-base truncate hidden md:inline">
                  {owner}
                </span>
              </div>
              <p className="text-xs text-text-tertiary mt-0.5 hidden sm:block">
                Repository Analytics & Insights
              </p>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={() => setShowExportModal(true)}
              className="p-2 hover:bg-bg-hover rounded transition-all duration-normal text-text-secondary hover:text-accent-primary group"
              title="Export Dashboard"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 hover:bg-bg-hover rounded transition-all duration-normal text-text-secondary hover:text-accent-secondary group hidden sm:block"
              title="Share Dashboard"
            >
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            <div className="w-px h-6 bg-gray-700 hidden md:block mx-2" />

            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-2"
            >
              <Settings className="w-4 h-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        owner={owner}
        repo={repo}
        url={shareUrl}
      />
    </>
  )
}
