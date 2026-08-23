import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'motion/react'
import { useEffect, useState } from 'react'
import { EASE } from '@/lib/motion'
import { BRAND } from '@/data/brand'
import { loadTawk, onTawkVisibility, openTawk, tawkEnabled } from '@/lib/tawk'
import { LogoMark } from './Logo'

/* ------------------------------------------------------- Scroll progress */

/** Hairline at the top of the viewport tracking read progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-brand-500 via-brand-400 to-accent-500"
      aria-hidden
    />
  )
}

/* -------------------------------------------------------------- Preloader */

/** Long enough to read the wordmark; short enough not to be a toll gate. */
const MIN_MS = 500
/** Hard ceiling — a slow font or image must never hold the site hostage. */
const MAX_MS = 1100

/**
 * First-paint curtain, shown once per session.
 *
 * It waits on `document.fonts.ready` rather than a flat timeout: the old version
 * sat there for a fixed 1.75s whether or not anything was still loading, which
 * on Ibadan mobile data is 1.75s added to an already slow first contentful paint
 * for no benefit. Now it covers real work and gets out of the way as soon as
 * that work is done. Skipped entirely for reduced-motion, like everything else.
 */
export function Preloader() {
  const [done, setDone] = useState(() => {
    if (typeof window === 'undefined') return true
    if (sessionStorage.getItem('ojami.seen') === '1') return true
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    if (done) return

    let cancelled = false
    const finish = () => {
      if (cancelled) return
      cancelled = true
      setDone(true)
      sessionStorage.setItem('ojami.seen', '1')
    }

    const floor = new Promise((r) => setTimeout(r, MIN_MS))
    const ceiling = setTimeout(finish, MAX_MS)

    // `fonts` is unavailable in a couple of older mobile browsers we care about.
    const fonts = document.fonts?.ready ?? Promise.resolve()
    Promise.all([floor, fonts]).then(finish)

    return () => {
      cancelled = true
      clearTimeout(ceiling)
    }
  }, [done])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="grain absolute inset-0 bg-brand-950" />

          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <LogoMark className="h-16 w-16" animate={false} />
            </motion.div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.08 }}
                className="font-display text-3xl font-extrabold tracking-[-0.045em] text-cream-100"
              >
                {BRAND.name}
              </motion.p>
            </div>

            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-cream-100/15">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.95, ease: [0.4, 0, 0.2, 1] }}
                className="h-full origin-left bg-accent-500"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.32 }}
              className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-cream-100/60"
            >
              Heading to the market
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ----------------------------------------------------------- Custom cursor */

/**
 * Trailing ring that grows over interactive elements. Fine-pointer devices
 * only — it would be meaningless (and janky) on touch.
 */
export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 520, damping: 34, mass: 0.42 })
  const sy = useSpring(y, { stiffness: 520, damping: 34, mass: 0.42 })
  const [variant, setVariant] = useState<'default' | 'link' | 'hidden'>('default')
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    setEnabled(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const el = e.target as HTMLElement | null
      const interactive = el?.closest('a,button,input,select,textarea,[role="button"],[data-cursor="link"]')
      setVariant(interactive ? 'link' : 'default')
    }
    const leave = () => setVariant('hidden')

    window.addEventListener('mousemove', move, { passive: true })
    document.addEventListener('mouseleave', leave)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
        aria-hidden
      >
        <motion.div
          animate={{
            width: variant === 'link' ? 46 : 26,
            height: variant === 'link' ? 46 : 26,
            opacity: variant === 'hidden' ? 0 : variant === 'link' ? 1 : 0.55,
            backgroundColor: variant === 'link' ? 'rgba(255,107,24,0.14)' : 'rgba(6,48,28,0)',
            borderColor: variant === 'link' ? 'rgba(255,107,24,0.75)' : 'rgba(6,48,28,0.45)',
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 26 }}
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px]"
        />
      </motion.div>

      {/* Precise dot with no spring lag */}
      <motion.div
        style={{ x, y }}
        className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
        aria-hidden
      >
        <motion.div
          animate={{ scale: variant === 'link' ? 0 : 1, opacity: variant === 'hidden' ? 0 : 1 }}
          className="h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-900"
        />
      </motion.div>
    </>
  )
}

/* ------------------------------------------------------ Floating support */

/**
 * Branded launcher for the tawk.to live chat. tawk's own bubble stays hidden
 * (see `lib/tawk.ts`) so the entry point matches the rest of the site.
 *
 * Deliberately does *not* wait for scroll: this is the site's contact channel,
 * that one was an order hand-off, this is support, and someone stuck on the
 * hero shouldn't have to scroll to find help. It only hides while the chat
 * panel itself is open, so it doesn't sit on top of it.
 */
export function SupportFab() {
  const [chatOpen, setChatOpen] = useState(false)

  useEffect(() => {
    loadTawk()
    return onTawkVisibility(setChatOpen)
  }, [])

  // No property ID configured — don't dangle a button that opens nothing.
  if (!tawkEnabled) return null

  return (
    <motion.button
      type="button"
      onClick={openTawk}
      initial={{ scale: 0, opacity: 0, y: 20 }}
      // Animated in place rather than mounted/unmounted through AnimatePresence:
      // an exiting child is left in the DOM here, which would leave an invisible
      // but still tabbable button sitting over the open chat panel.
      animate={chatOpen ? { scale: 0, opacity: 0, y: 20 } : { scale: 1, opacity: 1, y: 0 }}
      whileHover={chatOpen ? undefined : { scale: 1.07 }}
      whileTap={chatOpen ? undefined : { scale: 0.94 }}
      transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      className={`fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand-500 text-white shadow-[0_10px_30px_-8px_rgba(23,160,90,0.7)] sm:bottom-7 sm:right-7 ${
        chatOpen ? 'pointer-events-none' : ''
      }`}
      aria-label={`Chat with ${BRAND.name} support`}
      aria-hidden={chatOpen}
      tabIndex={chatOpen ? -1 : 0}
    >
      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500/45" aria-hidden />
      <svg
        viewBox="0 0 24 24"
        className="relative h-7 w-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.5 11.6a7.9 7.9 0 0 1-8.5 7.9 9 9 0 0 1-2.6-.45L4.2 20.8l1.36-4.1a7.7 7.7 0 0 1-1.56-4.66 7.9 7.9 0 0 1 8.5-7.85 8 8 0 0 1 7.9 7.41z" />
        <path d="M8.7 11.8h.01M12.3 11.8h.01M15.9 11.8h.01" />
      </svg>
    </motion.button>
  )
}
