import { motion, type Variants } from 'motion/react'
import type { ElementType, ReactNode } from 'react'
import { fadeUp, stagger, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface RevealProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  as?: ElementType
}

/** Single element that rises into view once. */
export function Reveal({ children, className, variants = fadeUp, delay = 0, as }: RevealProps) {
  const Comp = motion[(as ?? 'div') as 'div']
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={variants}
      transition={delay ? { delay } : undefined}
      className={className}
    >
      {children}
    </Comp>
  )
}

interface RevealGroupProps {
  children: ReactNode
  className?: string
  gap?: number
  delay?: number
  as?: ElementType
}

/** Parent that cascades its <RevealItem> children in one after another. */
export function RevealGroup({ children, className, gap = 0.08, delay = 0, as }: RevealGroupProps) {
  const Comp = motion[(as ?? 'div') as 'div']
  return (
    <Comp
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={stagger(gap, delay)}
      className={className}
    >
      {children}
    </Comp>
  )
}

/** Child of RevealGroup — inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  variants = fadeUp,
  as,
}: {
  children: ReactNode
  className?: string
  variants?: Variants
  as?: ElementType
}) {
  const Comp = motion[(as ?? 'div') as 'div']
  return (
    <Comp variants={variants} className={cn(className)}>
      {children}
    </Comp>
  )
}
