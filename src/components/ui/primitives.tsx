import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { viewport } from '@/lib/motion'

/* ---------------------------------------------------------------- Eyebrow */

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: ReactNode
  className?: string
  dot?: boolean
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.6 }}
      // inline-flex so it inherits text-align from centred parents. Safe now
      // that <TextReveal> renders block-level and can't share its line box.
      className={cn('eyebrow inline-flex items-center gap-2 text-brand-600', className)}
    >
      {dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-accent-500" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-500" />
        </span>
      )}
      {children}
    </motion.span>
  )
}

/* ------------------------------------------------------------------- Tilt */

/**
 * 3D tilt toward the cursor. Used sparingly — hero cards and the app mockup —
 * because it reads as delightful once and gimmicky everywhere.
 */
export function Tilt({
  children,
  className,
  intensity = 9,
  scale = 1.02,
}: {
  children: ReactNode
  className?: string
  intensity?: number
  scale?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const cfg = { stiffness: 180, damping: 22 }
  const rotateX = useSpring(useTransform(my, [0, 1], [intensity, -intensity]), cfg)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-intensity, intensity]), cfg)

  return (
    <motion.div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        mx.set((e.clientX - r.left) / r.width)
        my.set((e.clientY - r.top) / r.height)
      }}
      onMouseLeave={() => {
        mx.set(0.5)
        my.set(0.5)
      }}
      whileHover={{ scale }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 1000 }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}

/* --------------------------------------------------------------- Section */

export function Section({
  children,
  className,
  id,
  tone = 'cream',
}: {
  children: ReactNode
  className?: string
  id?: string
  tone?: 'cream' | 'white' | 'dark' | 'none'
}) {
  const tones = {
    cream: 'bg-cream-100',
    white: 'bg-cream-50',
    dark: 'bg-brand-950 text-cream-100',
    none: '',
  }
  return (
    <section id={id} className={cn('relative py-20 sm:py-28 lg:py-36', tones[tone], className)}>
      {children}
    </section>
  )
}

/* ------------------------------------------------------------------ Chip */

export function Chip({
  children,
  className,
  tone = 'brand',
}: {
  children: ReactNode
  className?: string
  tone?: 'brand' | 'accent' | 'neutral' | 'dark'
}) {
  const tones = {
    brand: 'bg-brand-500/12 text-brand-700 ring-brand-600/20',
    accent: 'bg-accent-500/14 text-accent-700 ring-accent-600/20',
    neutral: 'bg-ink-800/6 text-ink-600 ring-ink-800/10',
    dark: 'bg-cream-100/10 text-cream-100 ring-cream-100/20',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-semibold ring-1 ring-inset',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

/* -------------------------------------------------------- Ambient blobs */

/** Slow-drifting colour fields behind sections. Purely atmospheric. */
export function Blobs({ className, tone = 'brand' }: { className?: string; tone?: 'brand' | 'accent' | 'mixed' }) {
  const colors =
    tone === 'accent'
      ? ['bg-accent-400/25', 'bg-accent-200/30']
      : tone === 'mixed'
        ? ['bg-brand-400/22', 'bg-accent-400/22']
        : ['bg-brand-400/22', 'bg-brand-300/25']

  return (
    <div className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)} aria-hidden>
      <div className={cn('animate-blob absolute -left-[15%] top-[-10%] h-[38rem] w-[38rem] rounded-full blur-[110px]', colors[0])} />
      <div
        className={cn('animate-blob absolute -right-[12%] bottom-[-15%] h-[32rem] w-[32rem] rounded-full blur-[110px]', colors[1])}
        style={{ animationDelay: '-8s' }}
      />
    </div>
  )
}

/* ------------------------------------------------------------ Star rating */

export function Stars({ n = 5, className }: { n?: number; className?: string }) {
  return (
    <span className={cn('inline-flex gap-0.5 text-accent-500', className)} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={cn('h-3.5 w-3.5', i >= n && 'opacity-25')} fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  )
}

/* --------------------------------------------------- Decorative divider */

/** Repeating market-basket rule used between major sections. */
export function Divider({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex items-center gap-4 opacity-40', className)} aria-hidden>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-800/30 to-transparent" />
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-brand-700" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 8h18l-1.8 11a2 2 0 0 1-2 1.7H6.8a2 2 0 0 1-2-1.7L3 8z" />
        <path d="M8.5 8V5.5a3.5 3.5 0 1 1 7 0V8" />
      </svg>
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-brand-800/30 to-transparent" />
    </div>
  )
}
