import type { Transition, Variants } from 'motion/react'

/* ============================================================================
   Shared motion language.
   Everything on the site pulls from these so the whole product moves as one
   thing rather than a pile of independently-animated components.
   ========================================================================== */

/** The house easing — fast out of the gate, long luxurious settle. */
export const EASE = [0.16, 1, 0.3, 1] as const
export const EASE_SPRING = [0.34, 1.56, 0.64, 1] as const

export const spring: Transition = { type: 'spring', stiffness: 220, damping: 28, mass: 0.9 }
export const springSoft: Transition = { type: 'spring', stiffness: 120, damping: 20, mass: 1 }
export const springSnappy: Transition = { type: 'spring', stiffness: 420, damping: 32 }

/** When a section scrolls into view: start a touch late so it feels intentional. */
export const viewport = { once: true, margin: '-12% 0px -12% 0px' } as const

/** Parent that staggers its children in. */
export const stagger = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
}

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
}

/** Cards that rise and settle with a hint of overshoot. */
export const popIn: Variants = {
  hidden: { opacity: 0, y: 34, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_SPRING } },
}

/** Image containers: the wrapper clips, the <img> un-zooms. Classic reveal. */
export const imageReveal: Variants = {
  hidden: { scale: 1.24, opacity: 0.4 },
  show: { scale: 1, opacity: 1, transition: { duration: 1.25, ease: EASE } },
}

/** Word-by-word headline reveal (used by <TextReveal />). */
export const wordUp: Variants = {
  hidden: { y: '110%', opacity: 0 },
  show: { y: '0%', opacity: 1, transition: { duration: 0.85, ease: EASE } },
}

/** Page-level route transition. */
export const pageVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE, when: 'beforeChildren' } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.3, ease: 'easeIn' } },
}

/** Hover treatment shared by every interactive card on the site. */
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: spring },
} satisfies Variants
