import type { Metadata } from 'next'
import { Playfair_Display, Source_Serif_4, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { QueryProvider } from '@/lib/query-provider'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-display'
})

const sourceSerif4 = Source_Serif_4({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-body'
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: 'Git History Visualizer - Beautiful Repository Analytics',
  description: 'Transform any GitHub repository into stunning interactive dashboards with commit intelligence, contributor insights, and activity heatmaps. No sign-up required.',
  keywords: ['git', 'github', 'visualization', 'analytics', 'commits', 'history', 'open source', 'dashboard'],
  authors: [{ name: 'Git History Visualizer Team' }],
  openGraph: {
    title: 'Git History Visualizer - Beautiful Repository Analytics',
    description: 'Visualize commits, contributors, and git history with professional interactive dashboards',
    type: 'website',
    url: 'https://git-history-visualizer.vercel.app',
  },
  icons: {
    icon: '/icon.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfairDisplay.variable} ${sourceSerif4.variable} ${jetbrainsMono.variable} transition-colors duration-300`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
