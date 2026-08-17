import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { BRAND } from '@/data/brand'
import { cn } from '@/lib/utils'

/**
 * The mark: a woven market basket. Two handles form an "O" for Ojà,
 * the weave lines animate on hover like a basket being filled.
 */
export function LogoMark({ className, animate = true }: { className?: string; animate?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 40 40"
      className={cn('h-9 w-9', className)}
      fill="none"
      initial="rest"
      whileHover={animate ? 'hover' : undefined}
      aria-hidden
    >
      <motion.circle cx="20" cy="20" r="19" className="fill-brand-900" />
      {/* handle */}
      <motion.path
        d="M13 17v-2.5a7 7 0 0 1 14 0V17"
        stroke="currentColor"
        className="text-accent-400"
        strokeWidth="2.2"
        strokeLinecap="round"
        variants={{ rest: { pathLength: 1 }, hover: { pathLength: [0, 1] } }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* basket body */}
      <path
        d="M9 17.5h22l-1.9 12.2a3 3 0 0 1-3 2.5H13.9a3 3 0 0 1-3-2.5L9 17.5z"
        className="fill-cream-100"
      />
      {/* weave */}
      {[0, 1, 2].map((i) => (
        <motion.path
          key={i}
          d={`M${11.6 + i * 0.5} ${21.5 + i * 3.1}h${16.8 - i}`}
          stroke="currentColor"
          className="text-brand-700"
          strokeWidth="1.5"
          strokeLinecap="round"
          variants={{
            rest: { pathLength: 1, opacity: 0.85 },
            hover: { pathLength: [0, 1], opacity: 1 },
          }}
          transition={{ duration: 0.5, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </motion.svg>
  )
}

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Link
      to="/"
      className={cn('group inline-flex items-center gap-2.5', className)}
      aria-label={`${BRAND.name} — home`}
    >
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            'font-display text-[1.35rem] font-extrabold tracking-[-0.045em]',
            dark ? 'text-cream-100' : 'text-brand-900',
          )}
        >
          {BRAND.name}
        </span>
        <span
          className={cn(
            'mt-0.5 text-[0.56rem] font-bold uppercase tracking-[0.18em]',
            dark ? 'text-cream-100/55' : 'text-brand-700/55',
          )}
        >
          Ibadan
        </span>
      </span>
    </Link>
  )
}
