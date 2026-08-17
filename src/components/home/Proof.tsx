import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { ArrowRight, Check, Minus, Plus, Smartphone, Bell, MapPinned, Repeat } from 'lucide-react'
import { TESTIMONIALS, FAQS, PLANS } from '@/data/content'
import { P } from '@/data/images'
import { BRAND } from '@/data/brand'
import { Eyebrow, Section, Stars, Chip, Blobs, Tilt } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Marquee } from '@/components/ui/Marquee'
import { ButtonLink } from '@/components/ui/Button'
import { popIn, EASE, spring } from '@/lib/motion'
import { naira, cn } from '@/lib/utils'

/* ========================================================== Testimonials */

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2)
  return (
    <Section tone="cream" className="grain overflow-hidden">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <Eyebrow>What Ibadan says</Eyebrow>
          <TextReveal
            as="h2"
            text={'People do not go back\nto the market *after this*.'}
            className="mt-4 text-h1 font-extrabold text-brand-950"
          />
        </div>
      </div>

      {/* Two rails drifting in opposite directions — reads as motion without
          demanding you follow any single card. */}
      <div className="space-y-4">
        <Marquee speed={62} className="edge-fade-r">
          {TESTIMONIALS.slice(0, half).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
        <Marquee speed={72} reverse className="edge-fade-r">
          {TESTIMONIALS.slice(half).map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </div>
    </Section>
  )
}

function TestimonialCard({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="mx-2 w-[20rem] shrink-0 rounded-3xl bg-cream-50 p-6 ring-1 ring-inset ring-brand-900/8 transition-shadow duration-500 hover:shadow-soft sm:w-[24rem]">
      <Stars n={t.rating} />
      <blockquote className="mt-4 text-[0.95rem] leading-relaxed text-ink-700">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-brand-900/8 pt-4">
        <img src={P(t.photo, 96, 96)} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
        <div className="min-w-0">
          <p className="truncate text-[0.88rem] font-bold text-brand-900">{t.name}</p>
          <p className="truncate text-[0.76rem] text-ink-500">
            {t.role} · {t.area}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}

/* ======================================================== Pricing teaser */

export function PricingTeaser() {
  return (
    <Section tone="white" className="grain relative">
      <Blobs tone="accent" className="opacity-40" />
      <div className="container-x relative">
        <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>Simple, flat pricing</Eyebrow>
            <TextReveal
              as="h2"
              text={'One flat fee. The rest\nis *the market’s price*.'}
              className="mt-4 text-h1 font-extrabold text-brand-950"
            />
          </div>
          <FadeText className="max-w-md text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
            We charge for the shopping, not for your groceries. Our fee never moves because your basket got
            bigger.
          </FadeText>
        </div>

        <RevealGroup className="grid gap-5 lg:grid-cols-3" gap={0.09}>
          {PLANS.map((p) => (
            <RevealItem key={p.id} variants={popIn} className={cn(p.featured && 'lg:-my-4')}>
              <PlanCard plan={p} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 text-center" delay={0.1}>
          <p className="text-[0.88rem] text-ink-500">
            Plus a flat delivery fee of ₦1,000–₦2,500 depending on your area.{' '}
            <a href="/pricing" className="font-semibold text-brand-700 underline decoration-brand-500/40 underline-offset-4 transition-colors hover:text-accent-600">
              See the full breakdown
            </a>
          </p>
        </Reveal>
      </div>
    </Section>
  )
}

export function PlanCard({ plan }: { plan: (typeof PLANS)[number] }) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={spring}
      className={cn(
        'relative flex h-full flex-col overflow-hidden rounded-[1.75rem] p-7 transition-shadow duration-500',
        plan.featured
          ? 'grain bg-brand-950 text-cream-100 shadow-lift ring-1 ring-inset ring-brand-800'
          : 'bg-cream-100 ring-1 ring-inset ring-brand-900/10 hover:shadow-lift',
      )}
    >
      {plan.featured && (
        <>
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent-500/25 blur-3xl" />
          <span className="absolute right-5 top-5 rounded-full bg-accent-500 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.1em] text-white">
            Most popular
          </span>
        </>
      )}

      <div className="relative">
        <p className={cn('eyebrow', plan.featured ? 'text-accent-400' : 'text-brand-600')}>{plan.native}</p>
        <h3
          className={cn(
            'mt-2 font-display text-[1.6rem] font-extrabold tracking-[-0.04em]',
            plan.featured ? 'text-cream-100' : 'text-brand-950',
          )}
        >
          {plan.name}
        </h3>
        <p className={cn('mt-2 text-[0.92rem] leading-relaxed', plan.featured ? 'text-cream-100/60' : 'text-ink-500')}>
          {plan.blurb}
        </p>

        <div className="mt-6 flex items-baseline gap-1.5">
          <span
            className={cn(
              'font-display text-[2.6rem] font-extrabold tracking-[-0.05em]',
              plan.featured ? 'text-cream-100' : 'text-brand-900',
            )}
          >
            {naira(plan.price)}
          </span>
          <span className={cn('text-[0.85rem]', plan.featured ? 'text-cream-100/50' : 'text-ink-500')}>
            {plan.unit}
          </span>
        </div>
        <Chip tone={plan.featured ? 'dark' : 'neutral'} className="mt-3">
          {plan.cap}
        </Chip>
      </div>

      <ul className="relative mt-7 flex-1 space-y-3">
        {plan.features.map((f) => (
          <li
            key={f}
            className={cn('flex items-start gap-2.5 text-[0.88rem]', plan.featured ? 'text-cream-100/75' : 'text-ink-600')}
          >
            <span
              className={cn(
                'mt-0.5 flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center rounded-full',
                plan.featured ? 'bg-accent-500/25 text-accent-300' : 'bg-brand-500/14 text-brand-600',
              )}
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {f}
          </li>
        ))}
      </ul>

      <div className="relative mt-8">
        <ButtonLink
          to={plan.id === 'office' ? '/for-offices' : '/shop'}
          variant={plan.featured ? 'accent' : 'outline'}
          size="md"
          full
          magnetic={false}
        >
          {plan.cta}
        </ButtonLink>
      </div>
    </motion.article>
  )
}

/* ============================================================ App teaser */

const APP_FEATURES = [
  { icon: Repeat, title: 'Repeat your last list', body: 'One tap to send the exact same list you sent last week.' },
  { icon: MapPinned, title: 'Watch the run live', body: 'See your shopper move through the market in real time.' },
  { icon: Bell, title: 'Price alerts', body: 'Get a ping when tomatoes drop below what you normally pay.' },
]

export function AppTeaser() {
  return (
    <Section tone="dark" className="grain relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="animate-blob absolute left-[10%] top-[10%] h-[26rem] w-[26rem] rounded-full bg-brand-500/18 blur-[120px]" />
        <div
          className="animate-blob absolute right-[5%] bottom-[5%] h-[24rem] w-[24rem] rounded-full bg-accent-500/16 blur-[120px]"
          style={{ animationDelay: '-9s' }}
        />
      </div>

      <div className="container-x relative">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.85fr]">
          <div>
            <Eyebrow className="!text-accent-400">Coming soon</Eyebrow>
            <TextReveal
              as="h2"
              text={'The whole market,\nin your *pocket*.'}
              className="mt-4 text-h1 font-extrabold text-cream-100"
            />
            <FadeText className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-cream-100/65" delay={0.15}>
              The Ojàmi app is in the works for iOS and Android — same shoppers, same markets, same honest
              prices, with live tracking and one-tap repeat orders. Join the list and we’ll tell you the day
              it lands.
            </FadeText>

            <RevealGroup className="mt-10 space-y-4" gap={0.08}>
              {APP_FEATURES.map((f) => (
                <RevealItem key={f.title}>
                  <div className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cream-100/8 text-accent-400 ring-1 ring-inset ring-cream-100/12">
                      <f.icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <p className="font-semibold text-cream-100">{f.title}</p>
                      <p className="mt-0.5 text-[0.88rem] text-cream-100/55">{f.body}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal className="mt-10" delay={0.1}>
              <WaitlistForm />
            </Reveal>
          </div>

          {/* -------------------------------------------- phone ---- */}
          <PhoneMockup />
        </div>
      </div>
    </Section>
  )
}

function WaitlistForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <div>
      <form
        className="flex max-w-md gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!email.trim()) return
          setSent(true)
          setEmail('')
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email"
          aria-label="Email for the app waitlist"
          className="h-[3.4rem] min-w-0 flex-1 rounded-full bg-cream-100/8 px-6 text-[0.92rem] text-cream-100 ring-1 ring-inset ring-cream-100/12 placeholder:text-cream-100/35 focus:outline-none focus:ring-2 focus:ring-accent-400"
        />
        <button
          type="submit"
          className="inline-flex h-[3.4rem] shrink-0 items-center gap-2 rounded-full bg-accent-500 px-6 text-[0.92rem] font-bold text-white transition-all duration-300 hover:bg-accent-600 active:scale-95"
        >
          {sent ? <Check className="h-4 w-4" /> : <Smartphone className="h-4 w-4" />}
          {sent ? 'On the list' : 'Notify me'}
        </button>
      </form>
      <AnimatePresence>
        {sent && (
          <motion.p
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 text-[0.85rem] text-brand-300"
          >
            Nice one. You’ll be among the first to get it.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function PhoneMockup() {
  return (
    <Tilt intensity={10} scale={1.02} className="mx-auto w-full max-w-[19rem]">
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: -4 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: EASE }}
        className="relative"
      >
        {/* device */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[2.6rem] bg-brand-950 p-2.5 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] ring-1 ring-inset ring-cream-100/12">
          <div className="relative h-full w-full overflow-hidden rounded-[2.1rem] bg-cream-100">
            {/* notch */}
            <div className="absolute left-1/2 top-2 z-20 h-5 w-20 -translate-x-1/2 rounded-full bg-brand-950" />

            {/* app screen */}
            <div className="flex h-full flex-col">
              <div className="relative h-[42%] shrink-0">
                <img src={P('heroVendorTomatoes', 500, 500)} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-transparent to-brand-950/25" />
                <div className="absolute bottom-3 left-4 right-4">
                  <p className="text-[0.6rem] font-bold uppercase tracking-[0.18em] text-brand-700">
                    Run in progress
                  </p>
                  <p className="font-display text-[1.1rem] font-extrabold tracking-[-0.03em] text-brand-950">
                    Bisi is at Bodija
                  </p>
                </div>
              </div>

              <div className="flex-1 space-y-2 px-3.5 pb-3.5">
                {[
                  { name: 'Fresh tomatoes', unit: 'Paint bucket', price: 6500, done: true },
                  { name: 'Puna yam', unit: 'Big tuber ×2', price: 15000, done: true },
                  { name: 'Ugu', unit: 'Big bunch', price: 1500, done: false },
                  { name: 'Titus fish', unit: '2kg', price: 16000, done: false },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 18 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.12, duration: 0.5, ease: EASE }}
                    className="flex items-center gap-2.5 rounded-xl bg-cream-50 p-2.5 ring-1 ring-inset ring-brand-900/6"
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                        item.done ? 'bg-brand-500 text-white' : 'bg-brand-900/8 text-ink-400',
                      )}
                    >
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[0.68rem] font-bold text-brand-900">{item.name}</p>
                      <p className="text-[0.58rem] text-ink-500">{item.unit}</p>
                    </div>
                    <span className="text-[0.65rem] font-bold tabular-nums text-brand-900">
                      {naira(item.price)}
                    </span>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.15, duration: 0.5 }}
                  className="!mt-3 rounded-xl bg-brand-950 p-3"
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-[0.6rem] font-semibold text-cream-100/55">Running total</span>
                    <span className="font-display text-[0.95rem] font-extrabold text-cream-100">
                      {naira(39000)}
                    </span>
                  </div>
                  <div className="mt-2 h-1 overflow-hidden rounded-full bg-cream-100/15">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 0.65 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1.3, duration: 1.2, ease: EASE }}
                      className="h-full origin-left bg-accent-500"
                    />
                  </div>
                  <p className="mt-1.5 text-[0.55rem] text-cream-100/45">Budget cap {naira(60000)}</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* floating notification */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.7, ease: EASE }}
          className="absolute -right-6 top-[26%] w-[12.5rem] sm:-right-12"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass-dark rounded-2xl p-3 ring-1 ring-inset ring-cream-100/15"
          >
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.14em] text-accent-400">Price alert</p>
            <p className="mt-1 text-[0.75rem] font-semibold leading-snug text-cream-100">
              Tomatoes down to ₦5,800 a paint at Oja’ba today
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </Tilt>
  )
}

/* ================================================================== FAQ */

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <Section id="faq" tone="cream" className="grain">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-[7.5rem] lg:h-fit">
            <Eyebrow>Questions</Eyebrow>
            <TextReveal
              as="h2"
              text={'The things everyone\nasks us *first*.'}
              className="mt-4 text-h1 font-extrabold text-brand-950"
            />
            <FadeText className="mt-6 text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
              Still unsure about something? Message us on WhatsApp — a real person in Ibadan answers, usually
              within a few minutes.
            </FadeText>
            <Reveal className="mt-7" delay={0.1}>
              <ButtonLink
                to={`https://wa.me/${BRAND.whatsapp}`}
                variant="outline"
                size="md"
                icon={<ArrowRight className="h-4 w-4" />}
              >
                Ask us anything
              </ButtonLink>
            </Reveal>
          </div>

          <RevealGroup className="divide-y divide-brand-900/10 border-y border-brand-900/10" gap={0.05}>
            {FAQS.map((f, i) => (
              <RevealItem key={f.q}>
                <div>
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="group flex w-full items-start justify-between gap-6 py-5 text-left"
                    aria-expanded={open === i}
                  >
                    <span
                      className={cn(
                        'font-display text-[1.05rem] font-bold leading-snug tracking-[-0.02em] transition-colors sm:text-[1.15rem]',
                        open === i ? 'text-brand-900' : 'text-ink-700 group-hover:text-brand-800',
                      )}
                    >
                      {f.q}
                    </span>
                    <span
                      className={cn(
                        'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-400',
                        open === i ? 'rotate-180 bg-brand-900 text-cream-100' : 'bg-brand-900/7 text-brand-800',
                      )}
                    >
                      {open === i ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pr-10 text-[0.95rem] leading-relaxed text-ink-600">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}

/* ================================================================== CTA */

export function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-cream-100 pb-24 pt-8 sm:pb-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: EASE }}
          className="grain relative overflow-hidden rounded-[2rem] bg-brand-950 px-6 py-16 text-center sm:rounded-[2.75rem] sm:px-12 sm:py-24"
        >
          {/* background photo + wash */}
          <div className="pointer-events-none absolute inset-0" aria-hidden>
            <img src={P('tomatoBaskets', 1400, 800)} alt="" className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/85 to-brand-950" />
            <div className="animate-blob absolute -left-[10%] top-[-30%] h-[28rem] w-[28rem] rounded-full bg-accent-500/25 blur-[110px]" />
            <div
              className="animate-blob absolute -right-[10%] bottom-[-30%] h-[28rem] w-[28rem] rounded-full bg-brand-500/25 blur-[110px]"
              style={{ animationDelay: '-11s' }}
            />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <Eyebrow className="!text-accent-400">Ready when you are</Eyebrow>
            <TextReveal
              as="h2"
              text={'Give us the list.\nGet your *Saturday back*.'}
              className="mt-5 text-h1 font-extrabold text-cream-100"
            />
            <FadeText className="mx-auto mt-6 max-w-xl text-[1.05rem] leading-relaxed text-cream-100/65" delay={0.15}>
              No subscription needed to start. Send one list, see how it goes, and decide from there. Most
              people never go back.
            </FadeText>

            <Reveal className="mt-10" delay={0.15}>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink to="/shop" variant="accent" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                  Send your market list
                </ButtonLink>
                <ButtonLink to={`https://wa.me/${BRAND.whatsapp}`} variant="light" size="lg">
                  Chat on WhatsApp
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal className="mt-8" delay={0.25}>
              <p className="text-[0.82rem] text-cream-100/45">
                Same-day delivery across Ibadan · Trader receipts on every run · Free cancellation before we buy
              </p>
            </Reveal>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
