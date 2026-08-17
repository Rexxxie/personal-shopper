import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Camera, Check, MessageCircle, Phone, Truck } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, Chip, Stars } from '@/components/ui/primitives'
import { Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { P } from '@/data/images'
import { BRAND } from '@/data/brand'
import { naira, cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'

/**
 * A worked demo of what live tracking looks like. The stages advance on a
 * timer so the page is never static — the real thing will be driven by the
 * shopper's app once the backend exists.
 */
const STAGES = [
  { id: 'accepted', label: 'Shopper assigned', detail: 'Bisi accepted your run', time: '6:42am' },
  { id: 'at-market', label: 'At the market', detail: 'Arrived at Bodija Market', time: '7:05am' },
  { id: 'buying', label: 'Buying & pricing', detail: 'Sending photos as she goes', time: '7:18am' },
  { id: 'on-the-way', label: 'On the way to you', detail: 'Left the market, heading to Jericho', time: '8:04am' },
  { id: 'delivered', label: 'Delivered', detail: 'Handed over at your gate', time: '8:51am' },
]

const ITEMS = [
  { name: 'Fresh tomatoes', unit: 'Paint bucket', price: 6500, photo: 'catTomatoes' as const, bought: true },
  { name: 'Puna yam', unit: 'Big tuber × 2', price: 15000, photo: 'catTubers' as const, bought: true },
  { name: 'Ugu', unit: 'Big bunch', price: 1500, photo: 'catLeafyGreens' as const, bought: true },
  { name: 'Titus fish', unit: '2kg', price: 16000, photo: 'catFish' as const, bought: false },
  { name: 'Palm oil', unit: '5 litres', price: 11000, photo: 'catStew' as const, bought: false },
]

export default function Track() {
  const [stage, setStage] = useState(2)

  // Walk the demo forward so the page always feels alive.
  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s >= STAGES.length - 1 ? 1 : s + 1)), 4200)
    return () => clearInterval(t)
  }, [])

  const bought = ITEMS.filter((_, i) => i <= stage)
  const spent = bought.reduce((s, i) => s + i.price, 0)

  return (
    <>
      <PageHeader
        eyebrow="Preview"
        title={'Watch your shopper\nwork, *live*.'}
        lead="This is a worked preview of the tracking view we are building — the shopper, the stages and the photos below are examples, not a real run. Today you get all of this over WhatsApp instead: every photo, every price, as it happens."
      />

      <Section tone="cream" className="grain !pt-4">
        <div className="container-x">
          {/*
            Said plainly and up front. A pulsing "live" chip next to a reference
            number and a named shopper reads as somebody's actual order, and this
            page is reachable straight after checkout — the one place a customer
            is primed to believe it.
          */}
          <div className="mb-6 flex items-start gap-3 rounded-2xl bg-accent-500/10 p-4 ring-1 ring-inset ring-accent-500/25">
            <Chip tone="accent">Example</Chip>
            <p className="text-[0.88rem] leading-relaxed text-ink-600">
              Nothing on this page is your order. It is a demonstration of the live tracking screen, running
              on a timer. Real tracking arrives with the shopper app — until then your run is tracked on
              WhatsApp.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            {/* ------------------------------------------- progress ---- */}
            <div className="rounded-[1.75rem] bg-cream-50 p-6 ring-1 ring-inset ring-brand-900/8 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[0.78rem] text-ink-500">Example reference</p>
                  <p className="font-display text-[1.35rem] font-extrabold tracking-wide text-brand-900">
                    OJA-481207
                  </p>
                </div>
                <Chip tone="accent">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-500" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
                  </span>
                  {STAGES[stage].label}
                </Chip>
              </div>

              {/* shopper card */}
              <div className="mt-6 flex items-center gap-4 rounded-2xl bg-brand-950 p-4 text-cream-100">
                <img
                  src={P('personWomanWrap', 120, 120)}
                  alt=""
                  className="h-14 w-14 rounded-xl object-cover ring-2 ring-cream-100/20"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-display text-[1.05rem] font-bold">Bisi Adekunle</p>
                  <div className="mt-1 flex items-center gap-2">
                    <Stars n={5} className="!text-accent-400" />
                    <span className="text-[0.75rem] text-cream-100/55">4.9 · 612 runs</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <a
                    href={BRAND.phoneHref}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-cream-100/10 transition-colors hover:bg-cream-100/20"
                    aria-label="Call your shopper"
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                  <a
                    href={`https://wa.me/${BRAND.whatsapp}`}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] transition-transform hover:scale-105"
                    aria-label="Message your shopper"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* stages */}
              <ol className="relative mt-8">
                <span className="absolute left-[1.05rem] top-3 h-[calc(100%-1.5rem)] w-px bg-brand-900/10" aria-hidden />
                <motion.span
                  className="absolute left-[1.05rem] top-3 w-px origin-top bg-gradient-to-b from-brand-500 to-accent-500"
                  initial={false}
                  animate={{ height: `calc((100% - 1.5rem) * ${stage / (STAGES.length - 1)})` }}
                  transition={{ duration: 0.8, ease: EASE }}
                  aria-hidden
                />

                {STAGES.map((s, i) => {
                  const done = i < stage
                  const current = i === stage
                  return (
                    <li key={s.id} className="relative flex gap-5 pb-7 last:pb-0">
                      <span
                        className={cn(
                          'relative z-10 flex h-[2.1rem] w-[2.1rem] shrink-0 items-center justify-center rounded-full ring-4 ring-cream-50 transition-colors duration-500',
                          done ? 'bg-brand-600 text-white' : current ? 'bg-accent-500 text-white' : 'bg-cream-300 text-ink-400',
                        )}
                      >
                        {current && (
                          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-accent-500/50" />
                        )}
                        {done ? (
                          <Check className="h-4 w-4" strokeWidth={3} />
                        ) : (
                          <span className="text-[0.7rem] font-bold">{i + 1}</span>
                        )}
                      </span>
                      <div className="pt-1">
                        <p
                          className={cn(
                            'text-[0.98rem] font-bold transition-colors',
                            i <= stage ? 'text-brand-950' : 'text-ink-400',
                          )}
                        >
                          {s.label}
                        </p>
                        <p className="mt-0.5 text-[0.85rem] text-ink-500">
                          {s.detail} {i <= stage && <span className="text-ink-400">· {s.time}</span>}
                        </p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </div>

            {/* -------------------------------------------- basket ---- */}
            <div className="space-y-6">
              <div className="rounded-[1.75rem] bg-cream-50 p-6 ring-1 ring-inset ring-brand-900/8">
                <div className="flex items-center justify-between">
                  <h2 className="font-display text-[1.15rem] font-bold text-brand-950">Bought so far</h2>
                  <span className="font-display text-[1.3rem] font-extrabold tabular-nums text-brand-900">
                    {naira(spent)}
                  </span>
                </div>

                <div className="mt-5 space-y-2.5">
                  {ITEMS.map((item, i) => {
                    const isBought = i <= stage
                    return (
                      <motion.div
                        key={item.name}
                        animate={{ opacity: isBought ? 1 : 0.4 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center gap-3 rounded-2xl bg-cream-100 p-2.5 ring-1 ring-inset ring-brand-900/6"
                      >
                        <div className="relative">
                          <img
                            src={P(item.photo, 100, 100)}
                            alt=""
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                          {isBought && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                              className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white ring-2 ring-cream-100"
                            >
                              <Check className="h-2.5 w-2.5" strokeWidth={4} />
                            </motion.span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.85rem] font-semibold text-brand-900">{item.name}</p>
                          <p className="text-[0.72rem] text-ink-500">{item.unit}</p>
                        </div>
                        <span className="text-[0.82rem] font-bold tabular-nums text-brand-900">
                          {naira(item.price)}
                        </span>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* latest photo proof */}
              <Reveal className="overflow-hidden rounded-[1.75rem] bg-brand-950">
                <div className="flex items-center gap-2.5 px-5 py-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-white">
                    <Camera className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-[0.85rem] font-bold text-cream-100">Latest photo from the stall</p>
                    <p className="text-[0.72rem] text-cream-100/50">Sent 2 minutes ago</p>
                  </div>
                </div>
                <img
                  src={P('tomatoBasketClose', 700, 460)}
                  alt="Photo of tomatoes taken at the market stall"
                  className="aspect-[3/2] w-full object-cover"
                />
                <div className="px-5 py-4">
                  <p className="text-[0.85rem] leading-relaxed text-cream-100/70">
                    “Tomatoes are ₦6,500 a paint today at Iya Ronke’s stall — ₦500 cheaper than last week.
                    Buying two?”
                  </p>
                </div>
              </Reveal>

              <div className="rounded-[1.75rem] bg-brand-500/8 p-5 ring-1 ring-inset ring-brand-600/15">
                <div className="flex items-start gap-3">
                  <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                  <p className="text-[0.88rem] leading-relaxed text-ink-600">
                    This is a demonstration run. Send a real list and this page shows your own shopper, your
                    own basket and your own photos.
                  </p>
                </div>
                <div className="mt-4">
                  <ButtonLink to="/shop" variant="primary" size="md" full magnetic={false}>
                    Send your list
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
