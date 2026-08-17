import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { Link } from 'react-router-dom'
import { forwardRef, useRef, type ComponentProps, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { springSnappy } from '@/lib/motion'

type Variant = 'primary' | 'accent' | 'outline' | 'ghost' | 'light' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand-900 text-cream-100 hover:bg-brand-800',
  accent: 'bg-accent-500 text-white hover:bg-accent-600',
  outline: 'bg-transparent text-brand-900 ring-1 ring-inset ring-brand-900/25 hover:ring-brand-900/60',
  ghost: 'bg-brand-900/5 text-brand-900 hover:bg-brand-900/10',
  light: 'bg-cream-100 text-brand-900 hover:bg-white',
  dark: 'bg-ink-900 text-cream-100 hover:bg-ink-800',
}

const SIZES: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.82rem] gap-1.5',
  md: 'h-12 px-6 text-[0.9rem] gap-2',
  lg: 'h-[3.6rem] px-8 text-[0.98rem] gap-2.5',
}

interface BaseProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  className?: string
  icon?: ReactNode
  /** Pull the button toward the cursor. Off on touch devices automatically. */
  magnetic?: boolean
  full?: boolean
}

/**
 * The site's one button. Three things happen on hover:
 *   1. it drifts toward the cursor (magnetism)
 *   2. a colour wash sweeps up from the bottom
 *   3. the icon nudges forward
 */
function useMagnet(enabled: boolean, strength = 0.32) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, springSnappy)
  const sy = useSpring(y, springSnappy)

  const onMove = (e: React.MouseEvent) => {
    if (!enabled || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * strength)
    y.set((e.clientY - (r.top + r.height / 2)) * strength)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  // Content drifts slightly less than the shell — gives it depth.
  const cx = useTransform(sx, (v) => v * 0.35)
  const cy = useTransform(sy, (v) => v * 0.35)

  return { ref, sx, sy, cx, cy, onMove, onLeave }
}

const shell =
  'group relative inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold tracking-[-0.01em] transition-colors duration-300 will-change-transform disabled:pointer-events-none disabled:opacity-50'

function Inner({
  children,
  icon,
  cx,
  cy,
}: {
  children: ReactNode
  icon?: ReactNode
  cx: ReturnType<typeof useMotionValue<number>>
  cy: ReturnType<typeof useMotionValue<number>>
}) {
  return (
    <>
      {/* Wash that sweeps up on hover */}
      <span className="absolute inset-0 -z-0 translate-y-full bg-white/12 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
      <motion.span style={{ x: cx, y: cy }} className="relative z-10 inline-flex items-center gap-[inherit]">
        {children}
        {icon && (
          <span className="inline-flex transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </motion.span>
    </>
  )
}

export interface ButtonProps extends BaseProps, Omit<ComponentProps<'button'>, 'ref' | 'className' | 'children'> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, variant = 'primary', size = 'md', className, icon, magnetic = true, full, ...rest },
  _ref,
) {
  const canMagnet = magnetic && typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  const m = useMagnet(canMagnet)

  return (
    <motion.button
      ref={m.ref as React.Ref<HTMLButtonElement>}
      style={{ x: m.sx, y: m.sy }}
      onMouseMove={m.onMove}
      onMouseLeave={m.onLeave}
      whileTap={{ scale: 0.96 }}
      className={cn(shell, VARIANTS[variant], SIZES[size], full && 'w-full', className)}
      {...(rest as ComponentProps<typeof motion.button>)}
    >
      <Inner icon={icon} cx={m.cx} cy={m.cy}>
        {children}
      </Inner>
    </motion.button>
  )
})

export interface ButtonLinkProps extends BaseProps {
  to: string
  onClick?: () => void
}

export function ButtonLink({
  children,
  to,
  variant = 'primary',
  size = 'md',
  className,
  icon,
  magnetic = true,
  full,
  onClick,
}: ButtonLinkProps) {
  const canMagnet = magnetic && typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches
  const m = useMagnet(canMagnet)
  const external = to.startsWith('http') || to.startsWith('tel:') || to.startsWith('mailto:')

  const content = (
    <Inner icon={icon} cx={m.cx} cy={m.cy}>
      {children}
    </Inner>
  )
  const classes = cn(shell, VARIANTS[variant], SIZES[size], full && 'w-full', className)

  if (external) {
    return (
      <motion.a
        ref={m.ref as React.Ref<HTMLAnchorElement>}
        href={to}
        target={to.startsWith('http') ? '_blank' : undefined}
        rel={to.startsWith('http') ? 'noreferrer noopener' : undefined}
        style={{ x: m.sx, y: m.sy }}
        onMouseMove={m.onMove}
        onMouseLeave={m.onLeave}
        whileTap={{ scale: 0.96 }}
        className={classes}
        onClick={onClick}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.span
      ref={m.ref as React.Ref<HTMLSpanElement>}
      style={{ x: m.sx, y: m.sy }}
      onMouseMove={m.onMove}
      onMouseLeave={m.onLeave}
      whileTap={{ scale: 0.96 }}
      className={cn('inline-flex', full && 'w-full')}
    >
      <Link to={to} className={classes} onClick={onClick}>
        {content}
      </Link>
    </motion.span>
  )
}
