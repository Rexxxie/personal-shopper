import { useEffect } from 'react'
import Lenis from 'lenis'

let lenisInstance: Lenis | null = null

/** Programmatic scroll that respects the Lenis instance (used by anchor links). */
export function scrollToEl(target: string | HTMLElement, offset = -80) {
  if (lenisInstance) lenisInstance.scrollTo(target, { offset, duration: 1.4 })
  else if (typeof target !== 'string') target.scrollIntoView({ behavior: 'smooth' })
}

export function scrollTop(immediate = false) {
  if (lenisInstance) lenisInstance.scrollTo(0, { immediate })
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' })
}

/**
 * Momentum smooth-scrolling. This is what makes the whole page feel "designed"
 * rather than just animated — every scroll-linked effect inherits the easing.
 * Disabled entirely for users who ask for reduced motion.
 */
export function useLenis() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
      // Native inertia on touch already feels good; smoothing it fights the OS.
      syncTouch: false,
    })

    lenisInstance = lenis

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisInstance = null
    }
  }, [])
}

/** Lock scrolling while a drawer or modal is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    lenisInstance?.stop()
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      lenisInstance?.start()
      document.body.style.overflow = prev
    }
  }, [locked])
}
