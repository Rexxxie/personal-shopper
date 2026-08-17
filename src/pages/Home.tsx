import { Hero } from '@/components/home/Hero'
import { Categories, Bundles, MarketsStrip } from '@/components/home/Categories'
import { Process } from '@/components/home/Process'
import { Stats, WhyUs, OfficeSection } from '@/components/home/Trust'
import { Testimonials, PricingTeaser, AppTeaser, Faq, FinalCta } from '@/components/home/Proof'

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Categories />
      <Process />
      <Bundles />
      <OfficeSection />
      <WhyUs />
      <MarketsStrip />
      <Testimonials />
      <PricingTeaser />
      <AppTeaser />
      <Faq />
      <FinalCta />
    </>
  )
}
