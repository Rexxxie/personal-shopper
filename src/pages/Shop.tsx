import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, Plus, Search, SlidersHorizontal, ShoppingBasket, X, Sparkles } from 'lucide-react'
import { CATEGORIES, PRODUCTS, BUNDLES, type Product } from '@/data/catalog'
import { P } from '@/data/images'
import { useList } from '@/store/list'
import { naira, cn } from '@/lib/utils'
import { EASE, popIn, spring } from '@/lib/motion'
import { Eyebrow, Chip, Blobs } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { Button } from '@/components/ui/Button'
import { Stepper } from '@/components/list/ListDrawer'

type Sort = 'popular' | 'low' | 'high' | 'az'

const SORTS: { id: Sort; label: string }[] = [
  { id: 'popular', label: 'Most ordered' },
  { id: 'low', label: 'Price: low to high' },
  { id: 'high', label: 'Price: high to low' },
  { id: 'az', label: 'A – Z' },
]

export default function Shop() {
  const [params, setParams] = useSearchParams()
  const active = params.get('c') ?? 'all'
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<Sort>('popular')
  const [customText, setCustomText] = useState('')
  const { count, setOpen, addCustom, estimate } = useList()

  const setCategory = (id: string) => {
    const next = new URLSearchParams(params)
    if (id === 'all') next.delete('c')
    else next.set('c', id)
    setParams(next, { replace: true })
  }

  const results = useMemo(() => {
    let list = active === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === active)

    const q = query.trim().toLowerCase()
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.unit.toLowerCase().includes(q) ||
          p.market.toLowerCase().includes(q),
      )
    }

    const sorted = [...list]
    switch (sort) {
      case 'low':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'high':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        sorted.sort((a, b) => Number(!!b.popular) - Number(!!a.popular))
    }
    return sorted
  }, [active, query, sort])

  const activeCategory = CATEGORIES.find((c) => c.id === active)

  return (
    <>
      {/* ------------------------------------------------------ header ---- */}
      <header className="grain relative overflow-hidden pb-10 pt-[8.5rem] sm:pt-[10rem]">
        <Blobs tone="mixed" className="opacity-70" />
        <div className="container-x">
          <Eyebrow>Browse the market</Eyebrow>
          <TextReveal
            as="h1"
            text={'Build your list.\nWe’ll do *the walking*.'}
            className="mt-4 text-h1 font-extrabold text-brand-950"
          />
          <FadeText className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-ink-600" delay={0.12}>
            Prices below are what these items recently cost in Ibadan markets — a guide, not a quote. Your
            shopper confirms today’s real price before you pay a naira.
          </FadeText>

          {/* search + custom add */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search rice, tomatoes, palm oil, pampers…"
                aria-label="Search the market"
                className="h-[3.4rem] w-full rounded-full bg-cream-50 pl-12 pr-11 text-[0.95rem] shadow-soft ring-1 ring-inset ring-brand-900/8 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
              <AnimatePresence>
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.6 }}
                    onClick={() => setQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink-400 transition-colors hover:bg-brand-900/6 hover:text-brand-900"
                    aria-label="Clear search"
                  >
                    <X className="h-3.5 w-3.5" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            <form
              className="flex gap-2 sm:w-[22rem]"
              onSubmit={(e) => {
                e.preventDefault()
                if (!customText.trim()) return
                addCustom(customText)
                setCustomText('')
                setOpen(true)
              }}
            >
              <input
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Can’t find it? Type it…"
                aria-label="Add a custom item to your list"
                className="h-[3.4rem] min-w-0 flex-1 rounded-full bg-brand-900/5 px-5 text-[0.92rem] ring-1 ring-inset ring-brand-900/8 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
              />
              <button
                type="submit"
                className="inline-flex h-[3.4rem] w-[3.4rem] shrink-0 items-center justify-center rounded-full bg-brand-900 text-cream-100 transition-all hover:bg-accent-500 active:scale-95"
                aria-label="Add custom item"
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* ---------------------------------------------------- filters ---- */}
      <div className="sticky top-[4.6rem] z-30 border-y border-brand-900/8 bg-cream-100/88 backdrop-blur-lg">
        <div className="container-x flex items-center gap-3 py-3">
          <div className="no-scrollbar -mx-1 flex flex-1 gap-2 overflow-x-auto px-1">
            <FilterPill active={active === 'all'} onClick={() => setCategory('all')}>
              Everything
              <span className="ml-1.5 opacity-50">{PRODUCTS.length}</span>
            </FilterPill>
            {CATEGORIES.map((c) => (
              <FilterPill key={c.id} active={active === c.id} onClick={() => setCategory(c.id)}>
                <span aria-hidden>{c.emoji}</span>
                {c.short}
              </FilterPill>
            ))}
          </div>

          <div className="relative hidden shrink-0 sm:block">
            <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort products"
              className="h-10 cursor-pointer appearance-none rounded-full bg-brand-900/6 pl-9 pr-8 text-[0.82rem] font-semibold text-brand-900 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------- grid ---- */}
      <section className="grain relative bg-cream-100 pb-32 pt-10 sm:pb-24">
        <div className="container-x">
          {activeCategory && (
            <motion.div
              key={activeCategory.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-7 flex flex-col gap-1"
            >
              <h2 className="font-display text-h2 font-extrabold text-brand-950">{activeCategory.name}</h2>
              <p className="text-[0.95rem] text-ink-500">{activeCategory.blurb}</p>
            </motion.div>
          )}

          <p className="mb-5 text-[0.85rem] text-ink-500">
            {results.length} item{results.length === 1 ? '' : 's'}
            {query && (
              <>
                {' '}
                matching “<span className="font-semibold text-brand-800">{query}</span>”
              </>
            )}
          </p>

          {results.length === 0 ? (
            <EmptyResults
              query={query}
              onAdd={() => {
                addCustom(query)
                setQuery('')
                setOpen(true)
              }}
            />
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            >
              <AnimatePresence mode="popLayout">
                {results.map((p, i) => (
                  <motion.div
                    key={p.id}
                    layout
                    variants={popIn}
                    initial="hidden"
                    animate="show"
                    exit={{ opacity: 0, scale: 0.92, transition: { duration: 0.2 } }}
                    transition={{ delay: Math.min(i, 12) * 0.03 }}
                  >
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ready-made lists */}
          {active === 'all' && !query && (
            <div className="mt-20">
              <h2 className="font-display text-h2 font-extrabold text-brand-950">Or start from a ready list</h2>
              <p className="mt-2 text-[0.95rem] text-ink-500">
                Tap to load it into your basket, then edit whatever you like.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {BUNDLES.map((b) => (
                  <QuickBundle key={b.id} bundle={b} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------ mobile bar ---- */}
      <AnimatePresence>
        {count > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={spring}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-900/10 bg-cream-100/92 p-3 backdrop-blur-lg sm:hidden"
          >
            <button
              onClick={() => setOpen(true)}
              className="flex w-full items-center justify-between gap-3 rounded-full bg-brand-900 px-5 py-3.5 text-cream-100"
            >
              <span className="flex items-center gap-2">
                <ShoppingBasket className="h-4 w-4" />
                <span className="text-[0.88rem] font-bold">
                  {count} item{count === 1 ? '' : 's'}
                </span>
              </span>
              <span className="flex items-center gap-2 text-[0.88rem]">
                <span className="font-bold tabular-nums">{naira(estimate)}</span>
                <span className="rounded-full bg-accent-500 px-3 py-1 text-[0.78rem] font-bold">Review</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ------------------------------------------------------------------------ */

function FilterPill({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'relative inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-colors duration-300',
        active ? 'text-cream-100' : 'text-ink-600 hover:text-brand-900',
      )}
    >
      {active && (
        <motion.span
          layoutId="filter-pill"
          className="absolute inset-0 rounded-full bg-brand-900"
          transition={spring}
        />
      )}
      {/* `relative` keeps the label painting above the pill without needing a
          negative z-index, which is fragile across stacking contexts. */}
      <span className="relative inline-flex items-center gap-1.5">{children}</span>
    </button>
  )
}

export function ProductCard({ product }: { product: Product }) {
  const { add, has, qtyOf, setQty } = useList()
  const inList = has(product.id)

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={spring}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-inset ring-brand-900/7 transition-shadow duration-500 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={P(product.photo, 480, 360)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        {product.popular && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-accent-500 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white">
            Popular
          </span>
        )}
        <span className="absolute bottom-2.5 left-2.5 rounded-full bg-brand-950/72 px-2.5 py-1 text-[0.62rem] font-semibold text-cream-100 backdrop-blur-sm">
          {product.market}
        </span>

        {/* checkmark badge once it's on the list */}
        <AnimatePresence>
          {inList && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 480, damping: 20 }}
              className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-white shadow-sm"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-1 flex-col p-3.5">
        <h3 className="text-[0.9rem] font-bold leading-snug text-brand-950">{product.name}</h3>
        <p className="mt-0.5 text-[0.74rem] text-ink-500">{product.unit}</p>

        {product.note && (
          <p className="mt-2 text-[0.7rem] leading-snug text-brand-700/80">{product.note}</p>
        )}

        {/*
          Stacked on phones, side-by-side from `sm`. A two-column card is only
          ~135px of inner width — the price and a stepper cannot share a row
          there without one of them running off the edge.
        */}
        <div className="mt-auto flex flex-col gap-2.5 pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.62rem] uppercase tracking-wider text-ink-400">Market price</p>
            <p className="font-display text-[1.1rem] font-extrabold tabular-nums leading-tight text-brand-900">
              {naira(product.price)}
            </p>
          </div>

          {inList ? (
            <div className="flex justify-center sm:justify-end">
              <Stepper value={qtyOf(product.id)} onChange={(v) => setQty(product.id, v)} label={product.name} />
            </div>
          ) : (
            <motion.button
              onClick={() => add(product.id)}
              whileTap={{ scale: 0.88 }}
              transition={spring}
              className="inline-flex h-9 w-full shrink-0 items-center justify-center gap-1.5 rounded-full bg-brand-900 text-[0.8rem] font-bold text-cream-100 transition-colors duration-300 hover:bg-accent-500 sm:w-9 sm:gap-0"
              aria-label={`Add ${product.name} to your list`}
            >
              <Plus className="h-4 w-4" />
              <span className="sm:hidden">Add</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.article>
  )
}

function QuickBundle({ bundle }: { bundle: (typeof BUNDLES)[number] }) {
  const { addMany, setOpen } = useList()
  const [added, setAdded] = useState(false)

  return (
    <button
      onClick={() => {
        addMany(bundle.items)
        setAdded(true)
        setOpen(true)
        setTimeout(() => setAdded(false), 1600)
      }}
      className="group relative overflow-hidden rounded-2xl text-left"
    >
      <div className="relative aspect-[16/10]">
        <img
          src={P(bundle.photo, 520, 330)}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[1s] group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-4">
          <p className="font-display text-[1rem] font-bold text-cream-100">{bundle.name}</p>
          <p className="mt-0.5 text-[0.72rem] text-cream-100/60">{bundle.items.length} items · {bundle.serves}</p>
        </div>
        <span
          className={cn(
            'absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300',
            added ? 'bg-brand-500 text-white' : 'bg-cream-100/90 text-brand-900 group-hover:bg-accent-500 group-hover:text-white',
          )}
        >
          {added ? <Check className="h-4 w-4" strokeWidth={3} /> : <Plus className="h-4 w-4" />}
        </span>
      </div>
    </button>
  )
}

function EmptyResults({ query, onAdd }: { query: string; onAdd: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center rounded-3xl bg-cream-50 px-6 py-16 text-center ring-1 ring-inset ring-brand-900/7"
    >
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500/10 text-brand-600">
        <Search className="h-7 w-7" strokeWidth={1.5} />
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-brand-950">We don’t have that listed</h3>
      <p className="mt-2 max-w-md text-[0.92rem] leading-relaxed text-ink-500">
        That doesn’t mean we can’t buy it. Add it to your list as a custom item and your shopper will find it
        and price it at the market.
      </p>
      {query && (
        <Button onClick={onAdd} variant="accent" size="md" className="mt-6" icon={<Plus className="h-4 w-4" />}>
          Add “{query}” to my list
        </Button>
      )}
      <Chip tone="neutral" className="mt-5">
        Custom items get priced before you pay
      </Chip>
    </motion.div>
  )
}
