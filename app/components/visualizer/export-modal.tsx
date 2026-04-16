'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download, Image } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useVisualizerStore } from '@/lib/visualizer-store'

interface ExportModalProps {
  onExport: (format: 'png' | 'svg', resolution: number) => void
}

export function ExportModal({ onExport }: ExportModalProps) {
  const showExportModal = useVisualizerStore(state => state.showExportModal)
  const setShowExportModal = useVisualizerStore(state => state.setShowExportModal)

  const [format, setFormat] = useState<'png' | 'svg'>('png')
  const [resolution, setResolution] = useState(2)

  const handleExport = () => {
    setShowExportModal(false)
    setTimeout(() => {
      onExport(format, resolution)
    }, 350)
  }

  return (
    <AnimatePresence>
      {showExportModal && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setShowExportModal(false)}
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
              <div className="p-6 pb-4 border-b border-gray-700 flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded flex items-center justify-center bg-gradient-to-br from-accent-primary/20 to-accent-secondary/10">
                    <Download className="w-5 h-5 text-accent-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-bold text-text-primary">
                      Export Dashboard
                    </h2>
                    <p className="text-xs text-text-tertiary mt-1">
                      Choose format and resolution
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowExportModal(false)}
                  className="p-2 hover:bg-bg-hover rounded transition-colors text-text-secondary hover:text-text-primary"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Format Selection */}
                <div>
                  <label className="block text-sm font-semibold text-text-primary mb-4">
                    Export Format
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setFormat('png')}
                      className={`p-4 rounded-lg border-2 transition-all duration-normal ${
                        format === 'png'
                          ? 'border-accent-primary bg-accent-primary/10 text-text-primary'
                          : 'border-gray-700 bg-bg-hover text-text-secondary hover:border-accent-primary'
                      }`}
                    >
                      <Image className="w-5 h-5 mx-auto mb-2" />
                      <div className="font-semibold text-sm">PNG</div>
                      <div className="text-xs text-text-tertiary mt-1">Raster image</div>
                    </button>
                    <button
                      onClick={() => setFormat('svg')}
                      disabled
                      className="p-4 rounded-lg border-2 border-gray-700 bg-bg-hover text-text-tertiary opacity-50 cursor-not-allowed"
                    >
                      <Image className="w-5 h-5 mx-auto mb-2 opacity-50" />
                      <div className="font-semibold text-sm">SVG</div>
                      <div className="text-xs mt-1">Coming soon</div>
                    </button>
                  </div>
                </div>

                {/* Resolution */}
                {format === 'png' && (
                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-4">
                      Resolution
                    </label>
                    <select
                      value={resolution}
                      onChange={(e) => setResolution(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-bg-hover border border-gray-700 rounded-lg text-text-primary font-body focus-visible:border-accent-primary focus-visible:outline-none transition-colors"
                    >
                      <option value={1} className="bg-bg-primary text-text-primary">1x (Standard) - 1080x720px</option>
                      <option value={2} className="bg-bg-primary text-text-primary">2x (High) - 2160x1440px</option>
                      <option value={4} className="bg-bg-primary text-text-primary">4x (Ultra) - 4320x2880px</option>
                    </select>
                    <p className="text-xs text-text-tertiary mt-3">
                      Higher resolution provides better quality but larger file size.
                    </p>
                  </div>
                )}

                {/* SVG Notice */}
                {format === 'svg' && (
                  <div className="p-4 rounded-lg border border-yellow-600/50 bg-yellow-500/10">
                    <p className="text-sm text-yellow-300 font-body">
                      SVG export is coming soon. For now, please use PNG format.
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="p-6 pt-4 border-t border-gray-700 flex gap-3">
                <Button
                  onClick={handleExport}
                  variant="primary"
                  className="flex-1"
                  disabled={format === 'svg'}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  onClick={() => setShowExportModal(false)}
                  variant="secondary"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
