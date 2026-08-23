import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { useRef, useState } from 'react'
import { Check } from 'lucide-react'
import { STEPS } from '@/data/content'
import { P, PSet } from '@/data/images'
import { Eyebrow, Section } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { ButtonLink } from '@/components/ui/Button'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

/**
 * Sticky scroll-through process. The image column pins while the four steps
 * scroll past; the active step drives which photo is shown. On mobile the
 * whole thing degrades to a simple stacked list — pinning on a small screen
 * costs more than it gives.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.55', 'end 0.75'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(STEPS.length - 1, Math.max(0, Math.floor(v * STEPS.length)))
    setActive(idx)
  })

  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <Section id="how" tone="cream" className="grain">
      <div className="container-x">
        {/* ------------------------------------------------ header ---- */}
        <div className="mb-16 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow>How it works</Eyebrow>
            <TextReveal
              as="h2"
              text={'Four steps. No\nqueue, no *wahala*.'}
              className="mt-4 text-h1 font-extrabold text-brand-950"
            />
          </div>
          <FadeText className="text-[1rem] leading-relaxed text-ink-600 lg:pb-2" delay={0.15}>
            The whole point is that you never have to think about the market again — but you still see every
            naira, every item, and every price along the way.
          </FadeText>
        </div>

        {/* ------------------------------------------------- steps ---- */}
        <div ref={ref} className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* sticky image column */}
          <div className="hidden lg:block">
            <div className="sticky top-[7.5rem]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] bg-brand-950 shadow-lift">
                {STEPS.map((s, i) => (
                  <motion.img
                    key={s.n}
                    src={P(s.photo, 820, 1030)}
                    {...PSet(s.photo, 820, 1030)}
                    alt={s.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    initial={false}
                    animate={{
                      opacity: active === i ? 1 : 0,
                      scale: active === i ? 1 : 1.08,
                    }}
                    transition={{ duration: 0.9, ease: EASE }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                ))}

                <div className="absolute inset-0 bg-gradient-to-t from-brand-950/85 via-brand-950/10 to-transparent" />

                {/* big step numeral */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <div className="overflow-hidden">
                    <motion.p
                      key={`n-${active}`}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="font-display text-[4.5rem] font-extrabold leading-none tracking-[-0.06em] text-cream-100"
                    >
                      {STEPS[active].n}
                    </motion.p>
                  </div>
                  <div className="overflow-hidden">
                    <motion.p
                      key={`t-${active}`}
                      initial={{ y: '100%', opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.06 }}
                      className="mt-1 font-display text-[1.5rem] font-bold tracking-[-0.035em] text-cream-100"
                    >
                      {STEPS[active].title}
                    </motion.p>
                  </div>

                  {/* progress dots */}
                  <div className="mt-5 flex gap-1.5">
                    {STEPS.map((_, i) => (
                      <span
                        key={i}
                        className={cn(
                          'h-1 rounded-full transition-all duration-500',
                          active === i ? 'w-8 bg-accent-500' : 'w-4 bg-cream-100/25',
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* scrolling text column */}
          <ol className="relative">
            {/* the rail the progress bar rides */}
            <span className="absolute left-[1.42rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-brand-900/10 sm:block" aria-hidden />
            <motion.span
              style={{ scaleY: progressScale }}
              className="absolute left-[1.42rem] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-gradient-to-b from-brand-500 to-accent-500 sm:block"
              aria-hidden
            />

            {STEPS.map((step, i) => (
              <motion.li
                key={step.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-18%' }}
                transition={{ duration: 0.75, ease: EASE }}
                className="relative pb-12 last:pb-0 sm:pl-[4.5rem]"
              >
                {/* node */}
                <span
                  className={cn(
                    'absolute left-0 top-0 hidden h-12 w-12 items-center justify-center rounded-full font-display text-[0.95rem] font-extrabold ring-4 ring-cream-100 transition-colors duration-500 sm:flex',
                    active >= i ? 'bg-brand-900 text-cream-100' : 'bg-cream-300 text-ink-500',
                  )}
                >
                  {step.n}
                </span>

                {/* mobile image */}
                <div className="mb-5 aspect-[16/10] overflow-hidden rounded-2xl lg:hidden">
                  <img
                    src={P(step.photo, 760, 480)}
                    {...PSet(step.photo, 760, 480)}
                    alt={step.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>

                <h3 className="text-h3 font-bold text-brand-950">{step.title}</h3>
                <p className="mt-3 max-w-xl text-[1rem] leading-relaxed text-ink-600">{step.body}</p>

                <ul className="mt-5 space-y-2">
                  {step.detail.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[0.88rem] text-ink-600">
                      <span className="mt-0.5 flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center rounded-full bg-brand-500/14 text-brand-600">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="mt-4 sm:pl-[4.5rem]"
            >
              <ButtonLink to="/shop" variant="accent" size="lg">
                Start your first list
              </ButtonLink>
            </motion.div>
          </ol>
        </div>
      </div>
    </Section>
  )
}
