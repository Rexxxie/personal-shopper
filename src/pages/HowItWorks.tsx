import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Process } from '@/components/home/Process'
import { WhyUs } from '@/components/home/Trust'
import { Faq, FinalCta } from '@/components/home/Proof'
import { ButtonLink } from '@/components/ui/Button'
import { Section, Eyebrow } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { fadeUp } from '@/lib/motion'

const GUARANTEES = [
  {
    title: 'Approve before we spend',
    body: 'You see a fully costed list — every item, every price — before any money leaves your hands. Change or cancel it for free at that point.',
  },
  {
    title: 'Receipts, not promises',
    body: 'Every run comes back with photos taken at the stall and the trader’s own receipt. Our fee is listed separately so you can see exactly what you paid us.',
  },
  {
    title: 'Wrong item, we fix it',
    body: 'Message us within 30 minutes of delivery with a photo. Full Basket and Office plans get a free re-delivery; Quick Run gets a refund on that item.',
  },
  {
    title: 'Your change comes back',
    body: 'If your shopper spends less than you deposited, the balance returns to you the same day. We do not round up and we do not keep the difference.',
  },
]

export default function HowItWorks() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        title={'Someone you trust,\nsent to *the market*.'}
        lead="Ojàmi is not an app that ships boxes from a warehouse. It is a real person who walks into Bodija or Oje with your list, buys the way you would buy, and brings it to you. Here is exactly how that works."
      >
        <ButtonLink to="/shop" variant="accent" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
          Send your first list
        </ButtonLink>
      </PageHeader>

      <Process />

      {/* --------------------------------------------------- guarantees ---- */}
      <Section tone="white" className="grain">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Our promises</Eyebrow>
              <TextReveal
                as="h2"
                text={'Four things we will\nnever *get wrong*.'}
                className="mt-4 text-h1 font-extrabold text-brand-950"
              />
              <FadeText className="mt-6 text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
                Sending someone else to spend your money is an act of trust. These are the rules we hold
                ourselves to, on every single run.
              </FadeText>

              <div className="mt-10">
                <Img
                  photo="vendorWeighing"
                  alt="An Ojàmi shopper weighing produce at a market stall"
                  w={900}
                  h={620}
                  parallax={5}
                  rounded="rounded-3xl"
                  className="aspect-[16/11]"
                />
              </div>
            </div>

            <RevealGroup className="space-y-3" gap={0.08}>
              {GUARANTEES.map((g, i) => (
                <RevealItem key={g.title} variants={fadeUp}>
                  <div className="group flex gap-5 rounded-3xl bg-cream-100 p-6 ring-1 ring-inset ring-brand-900/8 transition-shadow duration-500 hover:shadow-soft">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-900 font-display text-[0.9rem] font-extrabold text-cream-100 transition-colors duration-400 group-hover:bg-accent-500">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.03em] text-brand-950">
                        {g.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{g.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <WhyUs />
      <Faq />
      <FinalCta />
    </>
  )
}
