import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { HowItWorksSection } from '@/components/landing/how-it-works-section'
import { ExamplesSection } from '@/components/landing/examples-section'
import { StatsSection } from '@/components/landing/stats-section'
import { Footer } from '@/components/landing/footer'

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-bg-primary text-text-primary">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <ExamplesSection />
      <StatsSection />
      <Footer />
    </main>
  )
}
