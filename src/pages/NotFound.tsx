import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'
import { Blobs } from '@/components/ui/primitives'
import { P } from '@/data/images'
import { EASE } from '@/lib/motion'

const SUGGESTIONS = [
  { label: 'Browse the market', to: '/shop' },
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact us', to: '/contact' },
]

export default function NotFound() {
  return (
    <div className="grain relative flex min-h-screen items-center overflow-hidden bg-cream-100 px-6 py-32">
      <Blobs tone="mixed" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="font-display text-[clamp(5rem,16vw,11rem)] font-extrabold leading-none tracking-[-0.06em] gradient-text"
            >
              404
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="mt-4 text-h2 font-extrabold text-brand-950"
            >
              This stall has moved.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.18 }}
              className="mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-600"
            >
              We looked everywhere — Bodija, Oje, even Aleshinloye. Whatever you were after is not at this
              address. Try one of these instead.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.26 }}
              className="mt-9 flex flex-wrap gap-2.5"
            >
              <ButtonLink to="/" variant="accent" size="lg">
                Back to home
              </ButtonLink>
              {SUGGESTIONS.map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="inline-flex h-[3.6rem] items-center rounded-full px-6 text-[0.95rem] font-semibold text-ink-600 ring-1 ring-inset ring-brand-900/12 transition-all duration-300 hover:bg-brand-900/5 hover:text-brand-900"
                >
                  {s.label}
                </Link>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotate: -4 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="relative mx-auto w-full max-w-sm"
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src={P('goodsShop', 700, 880)}
                alt=""
                className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-lift"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
