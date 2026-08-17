import { motion } from 'motion/react'
import { PageHeader } from '@/components/ui/PageHeader'
import { FinalCta } from '@/components/home/Proof'
import { Section, Eyebrow, Divider } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Img } from '@/components/ui/Img'
import { Counter } from '@/components/ui/Counter'
import { BRAND } from '@/data/brand'
import { STATS } from '@/data/content'
import { popIn, fadeUp } from '@/lib/motion'

const VALUES = [
  {
    title: 'The market price is sacred',
    body: 'We are paid to shop, not to resell. The day we start quietly marking up a basket of tomatoes is the day this business stops being worth building.',
  },
  {
    title: 'A real person, not an algorithm',
    body: 'Choosing produce is judgement, not logistics. We hire for the instinct that tells you which stall has the good yam, and we pay for it properly.',
  },
  {
    title: 'Ibadan first, and Ibadan properly',
    body: 'We are not a Lagos company with an Ibadan branch. We know Bodija on a Tuesday and Oje on a Friday, and we intend to know them better than anyone.',
  },
  {
    title: 'Prove it, do not promise it',
    body: 'Photos at the stall. Trader receipts. Change returned the same day. Trust is built from evidence, and evidence is cheap to provide if you are honest.',
  },
]

const TIMELINE = [
  { year: '2024', title: 'One person, one motorcycle', body: 'Started running market errands for six colleagues at an office on Ring Road who could never get to Bodija before it closed.' },
  { year: '2025', title: 'Six shoppers, three markets', body: 'Word spread through Ibadan offices faster than we could hire. Introduced photo proof after our first real complaint.' },
  { year: '2026', title: 'A proper service', body: 'Eight markets, over 200 verified shoppers, and offices across Ibadan on standing weekly lists. The app is next.' },
]

export default function About() {
  return (
    <>
      <PageHeader
        eyebrow={`About ${BRAND.name}`}
        title={'We started because\nsomebody *asked nicely*.'}
        lead="In 2024 a colleague asked if we could pick something up from Bodija on the way in. Then five more people asked. Two years later that favour has become a service that a few thousand households in Ibadan quietly depend on."
      />

      {/* ------------------------------------------------------ story ---- */}
      <Section tone="cream" className="grain !pt-4">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div>
              <div className="space-y-6 text-[1.05rem] leading-relaxed text-ink-600">
                <FadeText>
                  Ibadan runs on its markets. Bodija sets the price of foodstuff for the whole city. Oje has
                  been trading for over a hundred years. Aleshinloye fills the houses. None of that is going
                  anywhere, and none of it should.
                </FadeText>
                <FadeText delay={0.08}>
                  But a market is a place you have to physically be, at a time when most working people
                  physically cannot. It closes before you get home. It is at its best at 6am on a Saturday,
                  which is the one morning you wanted to sleep. And if you send someone who does not know
                  what they are doing, you get bad tomatoes at a strange price.
                </FadeText>
                <FadeText delay={0.16}>
                  <strong className="font-semibold text-brand-900">
                    Ojàmi exists to solve exactly that, and nothing else.
                  </strong>{' '}
                  We are not a supermarket. We do not hold stock. We do not ship from a warehouse. We send a
                  trained, verified human being into the same markets your mother uses, with your list, your
                  budget and your standards — and we prove what they did with photographs and receipts.
                </FadeText>
                <FadeText delay={0.24}>
                  The name is Yorùbá. Ọjà means market. Ojàmi means my market. That is the whole promise: it
                  stays your market, your prices, your choices. You just stop having to go.
                </FadeText>
              </div>

              <Divider className="my-10" />

              <RevealGroup className="grid grid-cols-2 gap-8" gap={0.08}>
                {STATS.map((s) => (
                  <RevealItem key={s.label} variants={fadeUp}>
                    <p className="font-display text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-900">
                      <Counter to={s.value} suffix={s.suffix} />
                    </p>
                    <p className="mt-2 text-[0.85rem] text-ink-500">{s.label}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:sticky lg:top-[7.5rem] lg:h-fit">
              <div className="space-y-3">
                <Img photo="marketStreetBusy" alt="A busy Ibadan market street" w={520} h={680} parallax={5} rounded="rounded-[1.5rem]" className="aspect-[4/5]" />
                <Img photo="tomatoBasketClose" alt="Baskets of fresh tomatoes at market" w={520} h={520} parallax={4} rounded="rounded-[1.5rem]" className="aspect-square" />
              </div>
              <div className="space-y-3 pt-10">
                <Img photo="womenWithBaskets" alt="Traders carrying goods through the market" w={520} h={520} parallax={6} rounded="rounded-[1.5rem]" className="aspect-square" />
                <Img photo="marketHall" alt="Inside a large Ibadan market hall" w={520} h={680} parallax={5} rounded="rounded-[1.5rem]" className="aspect-[4/5]" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ----------------------------------------------------- values ---- */}
      <Section tone="dark" className="grain">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="!text-accent-400">What we hold to</Eyebrow>
            <TextReveal
              as="h2"
              text={'Four rules we will not\nbreak to *grow faster*.'}
              className="mt-4 text-h1 font-extrabold text-cream-100"
            />
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2" gap={0.08}>
            {VALUES.map((v, i) => (
              <RevealItem key={v.title} variants={popIn}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="group h-full rounded-3xl bg-cream-100/5 p-7 ring-1 ring-inset ring-cream-100/12 transition-colors duration-400 hover:bg-cream-100/9"
                >
                  <span className="font-display text-[0.8rem] font-bold text-accent-400">0{i + 1}</span>
                  <h3 className="mt-3 font-display text-[1.25rem] font-bold tracking-[-0.03em] text-cream-100">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-cream-100/60">{v.body}</p>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* --------------------------------------------------- timeline ---- */}
      <Section tone="white" className="grain">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>How we got here</Eyebrow>
            <TextReveal as="h2" text={'Two years, *so far*.'} className="mt-4 text-h1 font-extrabold text-brand-950" />
          </div>

          <ol className="relative">
            <span className="absolute left-[3.1rem] top-3 hidden h-[calc(100%-2rem)] w-px bg-brand-900/12 sm:block" aria-hidden />
            {TIMELINE.map((t) => (
              <Reveal key={t.year} className="relative pb-10 last:pb-0 sm:pl-[7rem]">
                <span className="absolute left-0 top-0 hidden font-display text-[1.1rem] font-extrabold text-brand-700 sm:block">
                  {t.year}
                </span>
                <span className="absolute left-[2.85rem] top-1.5 hidden h-2.5 w-2.5 rounded-full bg-accent-500 ring-4 ring-cream-50 sm:block" />
                <span className="mb-1 block font-display text-[1rem] font-extrabold text-brand-700 sm:hidden">
                  {t.year}
                </span>
                <h3 className="text-h3 font-bold text-brand-950">{t.title}</h3>
                <p className="mt-2 max-w-2xl text-[1rem] leading-relaxed text-ink-600">{t.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <FinalCta />
    </>
  )
}
