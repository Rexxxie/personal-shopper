import { motion, useScroll, useTransform } from 'motion/react'
import { useEffect, useRef } from 'react'
import { ArrowRight, BadgeCheck, Camera, MapPin, Play } from 'lucide-react'
import { TextReveal } from '@/components/ui/TextReveal'
import { ButtonLink } from '@/components/ui/Button'
import { Blobs, Chip, Tilt } from '@/components/ui/primitives'
import { Img } from '@/components/ui/Img'
import { Marquee } from '@/components/ui/Marquee'
import { P } from '@/data/images'
import { EASE } from '@/lib/motion'
import { useIsDesktop } from '@/lib/useMediaQuery'
import { naira } from '@/lib/utils'

const TICKER = [
  'Bodija Market',
  'Fresh tomatoes',
  'Oje Market',
  'Puna yam',
  'Aleshinloye',
  'Ugu & ewedu',
  'Live chicken',
  "Oja'ba",
  'Palm oil',
  'Agbeni Market',
  'Ijebu garri',
  'Titus fish',
  'Sango Market',
  'Oloyin beans',
  'Molete Market',
  'Rodo & tatashe',
]

const AVATARS = ['personWomanSmiling', 'officeManSuit', 'personWomanWrap', 'personManBlue'] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const isDesktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // The whole hero drifts up and dims as you scroll past it.
  const y = useTransform(scrollYProgress, [0, 1], [0, 140])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  /*
   * Motion writes opacity/transform straight onto the node, and dropping the
   * `style` prop does not clear what it already wrote. Shrinking a desktop
   * window past the breakpoint mid-page therefore stranded the hero at
   * opacity 0 — headline, copy and CTA all invisible. Clear it by hand.
   */
  useEffect(() => {
    if (isDesktop || !wrapRef.current) return
    wrapRef.current.style.opacity = ''
    wrapRef.current.style.transform = ''
  }, [isDesktop])

  return (
    <section ref={ref} className="grain relative overflow-hidden pb-0 pt-[7.5rem] sm:pt-[8.5rem] lg:pt-[9.5rem]">
      <Blobs tone="mixed" />

      {/* faint market photo washed into the background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055]" aria-hidden>
        <img src={P('marketAerial', 1600, 1000)} alt="" className="h-full w-full object-cover" />
      </div>

      {/*
        The scroll-away only runs on desktop. On a phone the hero is nearly two
        viewports tall, so the same progress curve dims the copy while the user
        is still reading it.
      */}
      <motion.div ref={wrapRef} style={isDesktop ? { y, opacity, scale } : undefined} className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-20">
          {/* ------------------------------------------------- copy ---- */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-900/6 py-1.5 pl-1.5 pr-4 ring-1 ring-inset ring-brand-900/8"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-500 px-2.5 py-1 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-brand-950">
                <MapPin className="h-3 w-3" />
                Ibadan
              </span>
              <span className="text-[0.8rem] font-semibold text-brand-800">
                Your personal market shopper
              </span>
            </motion.div>

            {/* Breaks are explicit: at display size the second clause never
                fits on one line, and letting it wrap orphans "price." */}
            <TextReveal
              as="h1"
              text={'Skip the market.\nNot the\n*market price*.'}
              className="text-display font-extrabold text-brand-950"
              delay={0.3}
            />

            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.85 }}
              className="mt-7 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-600 sm:text-[1.15rem]"
            >
              Send your list. A verified Ojàmi shopper walks Bodija, Oje or Aleshinloye, haggles the way you
              would, photographs every item at the stall, and delivers it to your door or your desk — the same
              day.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1 }}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <ButtonLink to="/shop" variant="accent" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
                Send your market list
              </ButtonLink>
              <ButtonLink to="/how-it-works" variant="outline" size="lg" icon={<Play className="h-3.5 w-3.5" />}>
                See how it works
              </ButtonLink>
            </motion.div>

            {/* social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 1.2 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {AVATARS.map((a, i) => (
                    <motion.img
                      key={a}
                      src={P(a, 96, 96)}
                      alt=""
                      initial={{ scale: 0, x: -12 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ delay: 1.25 + i * 0.07, type: 'spring', stiffness: 340, damping: 20 }}
                      className="h-10 w-10 rounded-full object-cover ring-[2.5px] ring-cream-100"
                    />
                  ))}
                </div>
                <div className="text-[0.82rem] leading-tight">
                  <p className="font-bold text-brand-900">3,800+ households</p>
                  <p className="text-ink-500">already shopping this way</p>
                </div>
              </div>

              <div className="hidden h-9 w-px bg-brand-900/10 sm:block" />

              <div className="flex items-center gap-2 text-[0.82rem]">
                <BadgeCheck className="h-4.5 w-4.5 text-brand-500" />
                <span className="text-ink-600">
                  <strong className="font-bold text-brand-900">Receipts</strong> from every trader
                </span>
              </div>
            </motion.div>
          </div>

          {/* ---------------------------------------------- collage ---- */}
          <HeroCollage />
        </div>
      </motion.div>

      {/* ------------------------------------------------- ticker ---- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 1.35 }}
        className="relative mt-20 border-y border-brand-900/8 bg-brand-950 py-4 sm:mt-24"
      >
        <Marquee speed={44} className="edge-fade-r">
          {TICKER.map((t, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-6 font-display text-[0.95rem] font-semibold tracking-[-0.01em] text-cream-100/85 sm:text-[1.05rem]">
                {t}
              </span>
              <span className="text-accent-500" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  )
}

/* ------------------------------------------------------------------------ */

function HeroCollage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.45 }}
      className="relative mx-auto w-full max-w-[34rem] lg:max-w-none"
    >
      <Tilt intensity={6} scale={1.01} className="relative">
        {/* main frame */}
        <div className="relative aspect-[4/5] w-full sm:aspect-[5/5.4]">
          <Img
            photo="heroVendorTomatoes"
            alt="A market trader in Ibadan arranging fresh tomatoes on her stall"
            w={900}
            h={1100}
            priority
            reveal={false}
            rounded="rounded-[2.5rem]"
            className="h-full w-full shadow-lift"
          />

          {/* second frame, offset */}
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-8 left-0 w-[42%] sm:-left-10 sm:w-[38%]"
          >
            <Img
              photo="groceryBagVeg"
              alt="A bag of fresh vegetables ready for delivery"
              w={500}
              h={620}
              reveal={false}
              rounded="rounded-[1.6rem]"
              className="aspect-[4/5] shadow-lift ring-[6px] ring-cream-100"
            />
          </motion.div>
        </div>

        {/* ---- floating: live price card ---- */}
        <motion.div
          initial={{ opacity: 0, x: 30, y: 10 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.05 }}
          className="absolute -right-2 top-[12%] w-[11.5rem] sm:-right-6 sm:w-[13.5rem] lg:-right-8"
        >
          <motion.div
            animate={{ y: [0, -11, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="glass rounded-2xl p-3.5 shadow-lift ring-1 ring-inset ring-brand-900/8"
          >
            <div className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-500" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-500" />
              </span>
              <p className="eyebrow text-brand-700">Live at Bodija</p>
            </div>
            <div className="mt-2.5 space-y-1.5">
              {[
                ['Tomatoes · paint', 6500],
                ['Puna yam · big', 7500],
                ['Ugu · big bunch', 1500],
              ].map(([label, price]) => (
                <div key={label as string} className="flex items-baseline justify-between gap-2">
                  <span className="text-[0.72rem] text-ink-600">{label}</span>
                  <span className="text-[0.78rem] font-bold tabular-nums text-brand-900">
                    {naira(price as number)}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---- floating: photo-proof card ---- */}
        <motion.div
          initial={{ opacity: 0, x: -24, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
          // Hidden on the smallest screens — with the price card and the
          // shopper badge already on the collage, a third overlay is clutter.
          className="absolute -left-2 top-[46%] hidden sm:block sm:-left-8"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
            className="glass flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 shadow-lift ring-1 ring-inset ring-brand-900/8"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 text-brand-950">
              <Camera className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="text-[0.75rem] font-bold text-brand-900">Photo proof sent</p>
              <p className="text-[0.66rem] text-ink-500">from the stall, 2 min ago</p>
            </div>
          </motion.div>
        </motion.div>

        {/* ---- floating: shopper badge ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1], delay: 1.35 }}
          className="absolute -bottom-4 right-2 sm:right-6"
        >
          <div className="glass flex items-center gap-2.5 rounded-2xl p-2.5 shadow-lift ring-1 ring-inset ring-brand-900/8">
            <img src={P('personWomanWrap', 88, 88)} alt="" className="h-10 w-10 rounded-xl object-cover" />
            <div className="leading-tight">
              <p className="text-[0.78rem] font-bold text-brand-900">Bisi is shopping</p>
              <Chip tone="brand" className="mt-1 !py-0.5 !text-[0.62rem]">
                Verified shopper · 4.9★
              </Chip>
            </div>
          </div>
        </motion.div>
      </Tilt>
    </motion.div>
  )
}
