import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CounterProps {
  to: number
  suffix?: string
  prefix?: string
  className?: string
  /** Seconds. */
  duration?: number
}

/** easeOutExpo — fast off the mark, long settle. Matches the site's easing. */
const ease = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t))

/**
 * Number that rolls up when it scrolls into view.
 *
 * Deliberately hand-rolled: a plain IntersectionObserver plus a rAF loop,
 * both created and torn down in one effect. Splitting "detect visibility"
 * and "run the animation" across two effects (or across a motion value and
 * its subscription) makes the counter vulnerable to StrictMode's
 * mount → unmount → remount cycle, where it can silently stick at zero.
 */
export function Counter({ to, suffix = '', prefix = '', className, duration = 1.9 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(to)
      return
    }

    let raf = 0
    let start: number | null = null

    const tick = (now: number) => {
      start ??= now
      const t = Math.min(1, (now - start) / (duration * 1000))
      setDisplay(Math.round(ease(t) * to))
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.2 },
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [to, duration])

  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {prefix}
      {display.toLocaleString('en-NG')}
      {suffix}
    </span>
  )
}
