'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useGitHubVisualization } from '@/lib/use-github-data'
import { TopBar } from '@/components/visualizer/top-bar'
import { StatsCard } from '@/components/visualizer/stats-card'
import { ContributorConstellation } from '@/components/visualizer/contributor-constellation'
import { ActivityHeatmap } from '@/components/visualizer/activity-heatmap'
import { CommitIntelligence } from '@/components/visualizer/commit-intelligence'
import { TimelineMilestones } from '@/components/visualizer/timeline-milestones'
import { BranchOverview } from '@/components/visualizer/branch-overview'
import { ErrorBoundary } from '@/components/error-boundary'
import { ExportModal } from '@/components/visualizer/export-modal'
import { exportDashboardToPNG } from '@/lib/export-scene'

function VisualizerContent() {
  const searchParams = useSearchParams()
  const owner = searchParams.get('owner')
  const repo = searchParams.get('repo')

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { data, isLoading, error, progress } = useGitHubVisualization(
    owner || '',
    repo || ''
  )

  if (!owner || !repo) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary">
        <div className="text-center max-w-md px-8">
          <div className="w-16 h-16 rounded flex items-center justify-center bg-bg-secondary border border-gray-700 mx-auto mb-6">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="font-display text-4xl font-bold mb-4">Invalid URL</h1>
          <p className="font-body text-text-secondary mb-8">
            Please provide a valid GitHub repository URL with owner and repository name.
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-primary text-bg-primary font-medium hover:shadow-lg transition-all duration-normal hover-lift"
          >
            Return to Home
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred'
    const isRateLimit = errorMessage.includes('Rate limit')
    const isNotFound = errorMessage.includes('not found')

    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-primary text-text-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent-error rounded-full mix-blend-screen blur-3xl" />
        </div>

        <div className="text-center max-w-2xl px-8 relative z-10">
          <div className="bg-bg-secondary border border-gray-700 rounded px-8 py-12 mb-8">
            {isRateLimit && (
              <div className="space-y-4">
                <div className="text-6xl mb-4">⏰</div>
                <h1 className="font-display text-3xl font-bold mb-3 text-text-primary">
                  Rate Limit Reached
                </h1>
                <p className="font-body text-text-secondary text-lg mb-2">
                  This repository has reached GitHub's hourly request limit.
                </p>
                <p className="font-body text-accent-warning font-semibold text-lg">
                  Please try again in about an hour.
                </p>
                <p className="font-body text-text-tertiary text-sm mt-4">
                  You can visualize a different repository in the meantime.
                </p>
              </div>
            )}

            {isNotFound && (
              <div className="space-y-4">
                <div className="text-6xl mb-4">🔍</div>
                <h1 className="font-display text-3xl font-bold mb-3 text-text-primary">
                  Repository Not Found
                </h1>
                <p className="font-body text-text-secondary mb-4">
                  We couldn't locate this repository. Please verify:
                </p>
                <ul className="text-left inline-block text-sm text-text-secondary space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-accent-primary">✓</span>
                    The repository URL is correct
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-primary">✓</span>
                    The repository is public
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-accent-primary">✓</span>
                    Owner and repository names are spelled correctly
                  </li>
                </ul>
              </div>
            )}

            {!isRateLimit && !isNotFound && (
              <div className="space-y-4">
                <div className="text-6xl mb-4">⚠️</div>
                <h1 className="font-display text-3xl font-bold mb-3 text-text-primary">
                  Error Loading Repository
                </h1>
                <p className="font-body text-text-secondary mb-4">
                  {errorMessage}
                </p>
                <p className="font-body text-text-tertiary text-sm">
                  Try refreshing the page or selecting a different repository.
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary text-bg-primary font-medium hover:shadow-lg transition-all duration-normal hover-lift"
            >
              Return Home
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
            </a>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary border border-gray-700 text-text-primary font-medium hover:border-accent-primary hover:bg-bg-hover transition-all duration-normal"
            >
              Try Again
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    const stageMessages: Record<string, string> = {
      fetching_commits: 'Fetching Commits',
      fetching_branches: 'Analyzing Branches',
      fetching_contributors: 'Identifying Contributors',
      processing_data: 'Processing Insights',
      rendering: 'Rendering Dashboard',
    }

    const currentStage = stageMessages[progress.stage] || 'Loading'

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-primary text-text-primary relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-primary rounded-full mix-blend-screen opacity-10 blur-3xl" />
          <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-accent-secondary rounded-full mix-blend-screen opacity-10 blur-3xl" />
        </div>

        <div className="max-w-lg w-full px-8 relative z-10">
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl font-bold mb-2">
              {currentStage}
            </h1>
            <p className="text-text-secondary">Preparing your visualization</p>
          </div>

          {/* Progress bar container */}
          <div className="mb-8 space-y-4">
            <div className="w-full h-2 bg-bg-secondary border border-gray-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300"
                style={{ width: `${progress.percentage}%` }}
              />
            </div>

            {/* Progress percentage */}
            <div className="text-center">
              <p className="font-mono text-xl font-bold text-accent-primary">
                {Math.round(progress.percentage)}%
              </p>
            </div>
          </div>

          {/* Progress details */}
          <div className="text-center space-y-3 py-6 bg-bg-secondary border border-gray-700 px-6">
            {progress.stage === 'fetching_commits' && progress.total > 0 && (
              <div>
                <p className="font-mono text-sm text-text-secondary mb-1">Commits Fetched</p>
                <p className="font-display text-2xl font-bold text-accent-primary">
                  {progress.current.toLocaleString()} / {progress.total.toLocaleString()}
                </p>
              </div>
            )}

            {progress.total > 5000 && (
              <p className="font-body text-xs text-text-tertiary pt-4 border-t border-gray-700">
                Processing large repository — this may take 30-60 seconds
              </p>
            )}

            {!progress.total && (
              <p className="font-body text-sm text-text-secondary">
                Initializing analysis...
              </p>
            )}
          </div>

          {/* Loading spinner */}
          <div className="flex justify-center mt-8">
            <div className="w-8 h-8 border-2 border-gray-700 border-t-accent-primary rounded-full animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary pt-20 visualizer-dashboard">
      {/* Top Bar */}
      <TopBar owner={owner} repo={repo} />

      {/* Dashboard Grid - Stacked columns layout with improved spacing */}
      <div className="px-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
        {/* Row 1: Three columns with stacked content */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Stats + Timeline */}
          <div className="col-span-full md:col-span-3 flex flex-col gap-6 md:gap-8">
            <div className="animate-fade-in" style={{ animationDelay: '0ms' }}>
              <StatsCard data={data.repoMetadata} contributors={data.contributors.size} />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <TimelineMilestones commits={data.commits} timeRange={data.timeRange} />
            </div>
          </div>

          {/* Center Column: Commit Intelligence */}
          <div className="col-span-full md:col-span-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <CommitIntelligence commits={data.commits} insights={data.insights} />
          </div>

          {/* Right Column: Contributors + Branches */}
          <div className="col-span-full md:col-span-3 flex flex-col gap-6 md:gap-8">
            <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
              <ContributorConstellation
                contributors={Array.from(data.contributors.entries())}
                commits={data.commits}
              />
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <BranchOverview branches={data.branches} commits={data.commits} />
            </div>
          </div>
        </div>

        {/* Row 2: Full-width Heatmap */}
        <div className="grid grid-cols-1 animate-fade-in" style={{ animationDelay: '500ms' }}>
          <div className="col-span-full">
            <ActivityHeatmap commits={data.commits} timeRange={data.timeRange} />
          </div>
        </div>
      </div>

      {/* Export Modal */}
      <ExportModal onExport={(format, resolution) => {
        if (format === 'png') {
          exportDashboardToPNG(resolution)
        }
      }} />
    </div>
  )
}

export default function VisualizePage() {
  return (
    <ErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="font-display text-2xl">Loading...</p>
        </div>
      }>
        <VisualizerContent />
      </Suspense>
    </ErrorBoundary>
  )
}
