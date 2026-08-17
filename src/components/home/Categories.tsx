import { motion } from 'motion/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight, Check, Plus } from 'lucide-react'
import { CATEGORIES, BUNDLES, PRODUCTS } from '@/data/catalog'
import { MARKETS } from '@/data/markets'
import { P } from '@/data/images'
import { Eyebrow, Section } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { RevealGroup, RevealItem, Reveal } from '@/components/ui/Reveal'
import { ButtonLink } from '@/components/ui/Button'
import { popIn, spring, EASE } from '@/lib/motion'
import { naira, cn } from '@/lib/utils'
import { useList } from '@/store/list'

/* ============================================================ Categories */

export function Categories() {
  return (
    <Section id="categories" tone="cream" className="grain">
      <div className="container-x">
        <div className="mb-14 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Eyebrow>What we shop for</Eyebrow>
            <TextReveal
              as="h2"
              text={'If it is sold in an\nIbadan market, *we buy it*.'}
              className="mt-4 text-h1 font-extrabold text-brand-950"
            />
          </div>
          <FadeText className="max-w-md text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
            Foodstuff, fresh produce, meat and fish, provisions, cleaning, toiletries — one list, one shopper,
            one delivery. No more three separate trips.
          </FadeText>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4" gap={0.055}>
          {CATEGORIES.map((c, i) => (
            <RevealItem
              key={c.id}
              variants={popIn}
              className={cn(
                // First and sixth tiles run double-width for rhythm on desktop.
                i === 0 && 'sm:col-span-2',
                i === 5 && 'lg:col-span-2',
              )}
            >
              {/*
                The aspect ratio has to change at exactly the breakpoint where
                the tile starts spanning two columns — otherwise a 16:9 tile
                sits in a one-column slot and leaves a band of bare background.
              */}
              <CategoryCard
                category={c}
                aspect={
                  i === 0
                    ? 'aspect-[4/5] sm:aspect-[16/9]'
                    : i === 5
                      ? 'aspect-[4/5] lg:aspect-[16/9]'
                      : 'aspect-[4/5]'
                }
                wide={i === 0 || i === 5}
              />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-10 flex justify-center" delay={0.1}>
          <ButtonLink to="/shop" variant="primary" size="lg" icon={<ArrowUpRight className="h-4 w-4" />}>
            Browse the full market
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  )
}

function CategoryCard({
  category,
  aspect,
  wide,
}: {
  category: (typeof CATEGORIES)[number]
  /** Responsive aspect classes — must track the tile's column span. */
  aspect: string
  /** Only affects the resolution we request, not the layout. */
  wide?: boolean
}) {
  const count = PRODUCTS.filter((p) => p.category === category.id).length

  return (
    <Link
      to={`/shop?c=${category.id}`}
      className="group relative block h-full overflow-hidden rounded-3xl bg-brand-950"
    >
      <div className={cn('relative w-full', aspect)}>
        <img
          src={P(category.photo, wide ? 900 : 560, wide ? 700 : 700)}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.09]"
        />
        {/* legibility scrim, deepens on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/45 to-brand-950/5 transition-opacity duration-500 group-hover:from-brand-950 group-hover:via-brand-950/60" />

        {/* colour flash keyed to the category */}
        <div
          className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-45"
          style={{ backgroundColor: category.accent }}
        />

        {/* Pinned to the corner rather than sitting in a flex row with the
            title — at two-column mobile widths it would squeeze every name
            onto three lines. */}
        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-cream-100/12 text-cream-100 backdrop-blur-sm transition-all duration-400 group-hover:bg-cream-100 group-hover:text-brand-950">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-400 group-hover:rotate-45" />
        </span>

        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
          <span
            className="mb-2 inline-block w-fit text-2xl transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
            aria-hidden
          >
            {category.emoji}
          </span>
          <h3 className="font-display text-[1.05rem] font-bold leading-tight tracking-[-0.03em] text-cream-100 sm:text-[1.2rem]">
            {category.name}
          </h3>
          <p className="mt-1 whitespace-nowrap text-[0.75rem] text-cream-100/55">{count} items priced</p>

          {/* blurb slides up on hover — desktop only, it would clip on mobile */}
          <div className="hidden overflow-hidden lg:block">
            <p className="mt-0 max-h-0 text-[0.8rem] leading-relaxed text-cream-100/75 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100">
              {category.blurb}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

/* =============================================================== Bundles */

export function Bundles() {
  return (
    <Section tone="white" className="grain overflow-hidden">
      <div className="container-x">
        <div className="mb-14 max-w-2xl">
          <Eyebrow>Start in one tap</Eyebrow>
          <TextReveal
            as="h2"
            text={'Ready-made lists for\nthe way you *actually cook*.'}
            className="mt-4 text-h1 font-extrabold text-brand-950"
          />
          <FadeText className="mt-5 text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
            Tap one, then add or remove whatever you like. Faster than typing a list from scratch at 11pm.
          </FadeText>
        </div>

        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
          {BUNDLES.map((b) => (
            <RevealItem key={b.id} variants={popIn}>
              <BundleCard bundle={b} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

function BundleCard({ bundle }: { bundle: (typeof BUNDLES)[number] }) {
  const { addMany, setOpen } = useList()
  const items = bundle.items.flatMap((id) => PRODUCTS.find((p) => p.id === id) ?? [])
  const estimate = items.reduce((s, p) => s + p.price, 0)

  return (
    <motion.article
      whileHover="hover"
      initial="rest"
      animate="rest"
      className="group flex h-full flex-col overflow-hidden rounded-3xl bg-cream-100 ring-1 ring-inset ring-brand-900/8 transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={P(bundle.photo, 620, 400)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1.1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
        <span className="absolute bottom-3 left-3 rounded-full bg-cream-100/92 px-2.5 py-1 text-[0.68rem] font-bold text-brand-900 backdrop-blur-sm">
          {bundle.serves}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.03em] text-brand-950">
          {bundle.name}
        </h3>
        <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-500">{bundle.tagline}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {items.slice(0, 4).map((p) => (
            <li
              key={p.id}
              className="rounded-full bg-brand-900/5 px-2.5 py-1 text-[0.7rem] font-medium text-ink-600"
            >
              {p.name}
            </li>
          ))}
          {items.length > 4 && (
            <li className="rounded-full bg-brand-900/5 px-2.5 py-1 text-[0.7rem] font-semibold text-brand-700">
              +{items.length - 4} more
            </li>
          )}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-3 pt-5">
          <div>
            <p className="text-[0.7rem] text-ink-500">From about</p>
            <p className="font-display text-[1.25rem] font-extrabold tabular-nums text-brand-900">
              {naira(estimate)}
            </p>
          </div>
          <AddBundleButton
            onAdd={() => {
              addMany(bundle.items)
              setOpen(true)
            }}
          />
        </div>
      </div>
    </motion.article>
  )
}

function AddBundleButton({ onAdd }: { onAdd: () => void }) {
  const [added, setAdded] = useState(false)
  return (
    <motion.button
      onClick={() => {
        onAdd()
        setAdded(true)
        setTimeout(() => setAdded(false), 1800)
      }}
      whileTap={{ scale: 0.93 }}
      transition={spring}
      className={cn(
        'inline-flex h-11 items-center gap-1.5 overflow-hidden rounded-full px-4 text-[0.82rem] font-bold transition-colors duration-300',
        added ? 'bg-brand-500 text-white' : 'bg-brand-900 text-cream-100 hover:bg-accent-500',
      )}
    >
      <motion.span
        key={added ? 'done' : 'add'}
        initial={{ y: 14, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: EASE }}
        className="inline-flex items-center gap-1.5"
      >
        {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
        {added ? 'Added' : 'Add list'}
      </motion.span>
    </motion.button>
  )
}

/* ========================================================= Markets strip */

export function MarketsStrip() {
  return (
    <Section tone="dark" className="grain overflow-hidden">
      <div className="container-x">
        <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow className="!text-accent-400">The markets we run</Eyebrow>
            <TextReveal
              as="h2"
              text={'We know which stall\nsells the *good one*.'}
              className="mt-4 text-h1 font-extrabold text-cream-100"
            />
            <FadeText className="mt-5 max-w-xl text-[1rem] leading-relaxed text-cream-100/60" delay={0.15}>
              Eight markets, every morning. Our shoppers know that yam is cheaper at Bodija, pepper is cheaper
              at Oja’ba, and the woman at the third stall in Oje never sells soft ugu.
            </FadeText>
          </div>
        </div>
      </div>

      <MarketRail />
    </Section>
  )
}

function MarketRail() {
  const railRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative">
      <div
        ref={railRef}
        // scroll-pl must mirror the padding, otherwise snap-start aligns the
        // first card to the scrollport edge and eats the left inset.
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 scroll-pl-5 sm:px-8 sm:scroll-pl-8 lg:px-12 lg:scroll-pl-12"
      >
        {MARKETS.map((m, i) => (
          <motion.article
            key={m.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.08 }}
            className="group relative w-[16.5rem] shrink-0 snap-start overflow-hidden rounded-3xl sm:w-[19rem]"
          >
            <div className="relative aspect-[3/4]">
              <img
                src={P(m.photo, 640, 850)}
                alt={`${m.name}, ${m.area}`}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="eyebrow text-accent-400">{m.known}</span>
                <h3 className="mt-2 font-display text-[1.3rem] font-bold tracking-[-0.035em] text-cream-100">
                  {m.name}
                </h3>
                <p className="mt-0.5 text-[0.78rem] text-cream-100/50">{m.area}</p>

                <div className="overflow-hidden">
                  <p className="max-h-0 text-[0.82rem] leading-relaxed text-cream-100/75 opacity-0 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mt-3 group-hover:max-h-40 group-hover:opacity-100">
                    {m.blurb}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-cream-100/12 pt-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-pulse-ring absolute inline-flex h-full w-full rounded-full bg-brand-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-400" />
                  </span>
                  <p className="text-[0.72rem] font-semibold text-cream-100/70">
                    {m.runsPerWeek} runs a week
                  </p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}

        {/* trailing CTA card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex w-[16.5rem] shrink-0 snap-start flex-col justify-center rounded-3xl bg-cream-100/6 p-6 ring-1 ring-inset ring-cream-100/12 sm:w-[19rem]"
        >
          <h3 className="font-display text-[1.3rem] font-bold tracking-[-0.035em] text-cream-100">
            Your market not here?
          </h3>
          <p className="mt-2 text-[0.88rem] leading-relaxed text-cream-100/60">
            Tell us where you normally shop and we’ll send someone. We add new markets every month.
          </p>
          <div className="mt-5">
            <ButtonLink to="/contact" variant="light" size="md">
              Request a market
            </ButtonLink>
          </div>
        </motion.div>

        <div className="w-2 shrink-0" aria-hidden />
      </div>
    </div>
  )
}
