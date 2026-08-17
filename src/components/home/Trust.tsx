import { motion } from 'motion/react'
import {
  ArrowRight,
  Camera,
  Clock,
  HandCoins,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from 'lucide-react'
import { STATS, FEATURES, OFFICE_PAINS } from '@/data/content'
import { P } from '@/data/images'
import { Counter } from '@/components/ui/Counter'
import { Eyebrow, Section, Blobs } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { popIn, fadeUp, EASE } from '@/lib/motion'

/* ================================================================= Stats */

export function Stats() {
  return (
    <section className="relative border-b border-brand-900/8 bg-cream-100 py-14 sm:py-16">
      <div className="container-x">
        <RevealGroup className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" gap={0.09}>
          {STATS.map((s) => (
            <RevealItem key={s.label} variants={fadeUp} className="text-center lg:text-left">
              <p className="font-display text-[clamp(2.2rem,5vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-900">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2.5 text-[0.85rem] leading-snug text-ink-500">{s.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  )
}

/* ============================================================== Features */

/**
 * Explicit lookup rather than `import * as Icons from 'lucide-react'`.
 * The namespace import defeats tree-shaking and drags the entire icon set
 * (~600kB) into this chunk.
 */
const FEATURE_ICONS: Record<string, LucideIcon> = {
  ReceiptText,
  ShieldCheck,
  Camera,
  Clock,
  HandCoins,
  Sparkles,
}

export function WhyUs() {
  return (
    <Section tone="white" className="grain relative">
      <Blobs tone="brand" className="opacity-50" />
      <div className="container-x">
        <div className="mb-14 max-w-3xl">
          <Eyebrow>Why people trust us</Eyebrow>
          <TextReveal
            as="h2"
            text={'The hard part isn’t going\nto the market. It’s *trusting*\nwhoever goes for you.'}
            className="mt-4 text-h1 font-extrabold text-brand-950"
          />
          <FadeText className="mt-6 text-[1.05rem] leading-relaxed text-ink-600" delay={0.15}>
            Everybody has a story about someone who was sent to buy something and came back with a strange
            price. We built the whole service around making that impossible.
          </FadeText>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {FEATURES.map((f) => {
            const Icon = FEATURE_ICONS[f.icon] ?? Sparkles
            return (
              <RevealItem key={f.title} variants={popIn}>
                <motion.article
                  whileHover={{ y: -7 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="group relative h-full overflow-hidden rounded-3xl bg-cream-100 p-7 ring-1 ring-inset ring-brand-900/8 transition-shadow duration-500 hover:shadow-lift"
                >
                  {/* corner glow on hover */}
                  <span className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-400/0 blur-3xl transition-colors duration-700 group-hover:bg-brand-400/25" />

                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-900 text-cream-100 transition-all duration-500 group-hover:bg-accent-500 group-hover:rotate-6">
                    <Icon className="h-[1.3rem] w-[1.3rem]" strokeWidth={1.8} />
                  </span>

                  <h3 className="relative mt-6 font-display text-[1.2rem] font-bold tracking-[-0.03em] text-brand-950">
                    {f.title}
                  </h3>
                  <p className="relative mt-3 text-[0.95rem] leading-relaxed text-ink-600">{f.body}</p>
                </motion.article>
              </RevealItem>
            )
          })}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ================================================== Office worker angle */

export function OfficeSection() {
  return (
    <Section tone="dark" className="grain relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <img src={P('marketStreetBusy', 1600, 900)} alt="" className="h-full w-full object-cover" />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow className="!text-accent-400">Built for people with jobs</Eyebrow>
            <TextReveal
              as="h2"
              text={'You cannot leave your\ndesk at 11am to argue\nabout *pepper prices*.'}
              className="mt-4 text-h1 font-extrabold text-cream-100"
            />
            <FadeText className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-cream-100/65" delay={0.15}>
              Ojàmi was built for Ibadan’s working people first — bankers on Ring Road, lecturers at UI,
              engineers in Oluyole, nurses at UCH. The service is shaped entirely around a work day.
            </FadeText>

            <RevealGroup className="mt-10 space-y-3" gap={0.08}>
              {OFFICE_PAINS.map((p) => (
                <RevealItem key={p.pain} variants={fadeUp}>
                  <div className="group flex gap-4 rounded-2xl bg-cream-100/5 p-4 ring-1 ring-inset ring-cream-100/10 transition-colors duration-400 hover:bg-cream-100/8">
                    <span className="mt-1 h-fit shrink-0 rounded-full bg-accent-500/15 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-accent-300">
                      Pain
                    </span>
                    <div>
                      <p className="text-[0.95rem] font-semibold text-cream-100">{p.pain}</p>
                      <p className="mt-1 text-[0.88rem] leading-relaxed text-cream-100/55">{p.fix}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-9" delay={0.1}>
              <ButtonLink to="/for-offices" variant="light" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                See the office plan
              </ButtonLink>
            </Reveal>
          </div>

          {/* --------------------------------------------- visual ---- */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="space-y-3 sm:space-y-4">
                <Img
                  photo="officeManSuit"
                  alt="An office worker in Ibadan during the work day"
                  w={520}
                  h={680}
                  parallax={5}
                  rounded="rounded-[1.5rem]"
                  className="aspect-[4/5]"
                />
                <Img
                  photo="groceryBagGreen"
                  alt="Groceries bagged and ready for delivery"
                  w={520}
                  h={520}
                  parallax={4}
                  rounded="rounded-[1.5rem]"
                  className="aspect-square"
                />
              </div>
              <div className="space-y-3 pt-8 sm:space-y-4 sm:pt-12">
                <Img
                  photo="officeWomanWindow"
                  alt="A professional at her office window in Ibadan"
                  w={520}
                  h={520}
                  parallax={6}
                  rounded="rounded-[1.5rem]"
                  className="aspect-square"
                />
                <Img
                  photo="heroVendorGreens"
                  alt="A market trader arranging fresh vegetables"
                  w={520}
                  h={680}
                  parallax={5}
                  rounded="rounded-[1.5rem]"
                  className="aspect-[4/5]"
                />
              </div>
            </div>

            {/* floating delivery slot card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 0.3 }}
              className="absolute -bottom-6 left-1/2 w-[15rem] -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glass-dark rounded-2xl p-4 ring-1 ring-inset ring-cream-100/15"
              >
                <p className="eyebrow text-accent-400">Lunch drop</p>
                <p className="mt-2 font-display text-[1.15rem] font-bold text-cream-100">12:00pm – 2:00pm</p>
                <p className="mt-1 text-[0.75rem] text-cream-100/55">Straight to your office reception</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-cream-100/15">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 0.72 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
                    className="h-full origin-left rounded-full bg-accent-500"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  )
}
