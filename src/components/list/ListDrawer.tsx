import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBasket, Trash2, X, PenLine, Sparkles } from 'lucide-react'
import { useList } from '@/store/list'
import { useScrollLock } from '@/lib/useLenis'
import { naira, cn } from '@/lib/utils'
import { EASE, spring } from '@/lib/motion'
import { P } from '@/data/images'
import { Button, ButtonLink } from '@/components/ui/Button'

export function ListDrawer() {
  const {
    open,
    setOpen,
    lines,
    custom,
    count,
    estimate,
    serviceFee,
    deliveryFee,
    total,
    totalIsPartial,
    plan,
    zone,
    setQty,
    remove,
    setNote,
    addCustom,
    removeCustom,
    setCustomQty,
    clear,
  } = useList()

  const [customText, setCustomText] = useState('')
  const [noteFor, setNoteFor] = useState<string | null>(null)
  const navigate = useNavigate()
  useScrollLock(open)

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(false)}
            className="absolute inset-0 bg-brand-950/45 backdrop-blur-[3px]"
            aria-label="Close list"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            className="absolute inset-y-0 right-0 flex w-full max-w-[30rem] flex-col bg-cream-100 shadow-2xl"
            role="dialog"
            aria-label="Your market list"
          >
            {/* ---------------------------------------------- header ---- */}
            <header className="flex items-center justify-between border-b border-brand-900/8 px-6 py-5">
              <div>
                <h2 className="font-display text-xl font-bold tracking-[-0.035em] text-brand-900">
                  Your market list
                </h2>
                <p className="mt-0.5 text-[0.8rem] text-ink-500">
                  {count === 0 ? 'Nothing on it yet' : `${count} item${count === 1 ? '' : 's'} to buy`}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-brand-900/6"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            {/* ------------------------------------------------ body ---- */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-5">
              {count === 0 ? (
                <EmptyState onBrowse={() => { setOpen(false); navigate('/shop') }} />
              ) : (
                <div className="space-y-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {lines.map((line) => (
                      <motion.div
                        key={line.productId}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
                        transition={spring}
                        className="group rounded-2xl bg-cream-50 p-3 ring-1 ring-inset ring-brand-900/6"
                      >
                        <div className="flex gap-3">
                          <img
                            src={P(line.product.photo, 160, 160)}
                            alt=""
                            className="h-16 w-16 shrink-0 rounded-xl object-cover"
                            loading="lazy"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-[0.9rem] font-semibold text-brand-900">
                                  {line.product.name}
                                </p>
                                <p className="mt-0.5 text-[0.75rem] text-ink-500">
                                  {line.product.unit} · {line.product.market}
                                </p>
                              </div>
                              <button
                                onClick={() => remove(line.productId)}
                                className="shrink-0 rounded-lg p-1.5 text-ink-400 opacity-0 transition-all hover:bg-red-50 hover:text-red-500 focus-visible:opacity-100 group-hover:opacity-100"
                                aria-label={`Remove ${line.product.name}`}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between gap-2">
                              <Stepper
                                value={line.qty}
                                onChange={(v) => setQty(line.productId, v)}
                                label={line.product.name}
                              />
                              <span className="text-[0.9rem] font-bold tabular-nums text-brand-900">
                                {naira(line.subtotal)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* note-to-shopper */}
                        <div className="mt-2.5">
                          {noteFor === line.productId || line.note ? (
                            <input
                              autoFocus={noteFor === line.productId}
                              value={line.note ?? ''}
                              onChange={(e) => setNote(line.productId, e.target.value)}
                              onBlur={() => setNoteFor(null)}
                              placeholder="Note for your shopper — “small size”, “cut in two”…"
                              className="w-full rounded-xl bg-brand-900/4 px-3 py-2 text-[0.78rem] text-ink-700 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                            />
                          ) : (
                            <button
                              onClick={() => setNoteFor(line.productId)}
                              className="inline-flex items-center gap-1.5 text-[0.74rem] font-medium text-ink-500 transition-colors hover:text-brand-700"
                            >
                              <PenLine className="h-3 w-3" />
                              Add a note for your shopper
                            </button>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {custom.map((c) => (
                      <motion.div
                        key={c.id}
                        layout
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
                        transition={spring}
                        className="group flex items-center gap-3 rounded-2xl border border-dashed border-brand-600/30 bg-brand-500/5 p-3"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-500/12 text-brand-700">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[0.88rem] font-semibold text-brand-900">{c.text}</p>
                          <p className="text-[0.72rem] text-ink-500">We’ll price this at the market</p>
                        </div>
                        <Stepper value={c.qty} onChange={(v) => setCustomQty(c.id, v)} label={c.text} />
                        <button
                          onClick={() => removeCustom(c.id)}
                          className="rounded-lg p-1.5 text-ink-400 transition-colors hover:bg-red-50 hover:text-red-500"
                          aria-label={`Remove ${c.text}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* add anything */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      addCustom(customText)
                      setCustomText('')
                    }}
                    className="flex gap-2 pt-1"
                  >
                    <input
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="Not in our list? Type it here…"
                      aria-label="Add a custom item"
                      className="h-11 min-w-0 flex-1 rounded-full bg-brand-900/5 px-4 text-[0.85rem] placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500/40"
                    />
                    <button
                      type="submit"
                      className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-900 text-cream-100 transition-transform active:scale-95"
                      aria-label="Add item"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </form>

                  <button
                    onClick={clear}
                    className="pt-2 text-[0.76rem] font-medium text-ink-400 transition-colors hover:text-red-500"
                  >
                    Clear the whole list
                  </button>
                </div>
              )}
            </div>

            {/* ---------------------------------------------- footer ---- */}
            {count > 0 && (
              <motion.footer
                layout
                className="border-t border-brand-900/8 bg-cream-50 px-6 py-5"
              >
                <dl className="space-y-2 text-[0.85rem]">
                  <Row label={`Market estimate (${lines.length} priced)`} value={naira(estimate)} />
                  <Row
                    label={`${plan.name} service fee`}
                    value={serviceFee === 0 ? 'On your plan' : naira(serviceFee)}
                  />
                  <Row label={`Delivery to ${zone.name}`} value={naira(deliveryFee)} />
                  <div className="!mt-3 flex items-baseline justify-between border-t border-brand-900/8 pt-3">
                    <dt className="font-display text-[1rem] font-bold text-brand-900">Estimated total</dt>
                    <dd className="font-display text-[1.4rem] font-extrabold tabular-nums text-brand-900">
                      {totalIsPartial && <span className="mr-1 text-[0.8rem] font-bold">from</span>}
                      {naira(total)}
                    </dd>
                  </div>
                </dl>

                {custom.length > 0 && (
                  <p className="mt-2 text-[0.72rem] leading-relaxed text-ink-500">
                    Your {custom.length} custom item{custom.length === 1 ? '' : 's'} aren’t priced yet — your
                    shopper will add today’s market price before you pay.
                  </p>
                )}

                <p className="mt-3 text-[0.72rem] leading-relaxed text-ink-500">
                  This is an estimate from recent market prices. You’ll approve the real costed list before any
                  money moves.
                </p>

                <div className="mt-4">
                  <ButtonLink to="/checkout" variant="accent" size="lg" full onClick={() => setOpen(false)}>
                    Review & send list
                  </ButtonLink>
                </div>
              </motion.footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  )
}

/* ------------------------------------------------------------------------ */

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-ink-500">{label}</dt>
      <dd className="font-semibold tabular-nums text-ink-700">{value}</dd>
    </div>
  )
}

export function Stepper({
  value,
  onChange,
  label,
  size = 'sm',
}: {
  value: number
  onChange: (v: number) => void
  label: string
  size?: 'sm' | 'md'
}) {
  const dim = size === 'sm' ? 'h-7 w-7' : 'h-9 w-9'
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-brand-900/6 p-0.5">
      <button
        onClick={() => onChange(value - 1)}
        className={cn(dim, 'inline-flex items-center justify-center rounded-full text-brand-900 transition-all hover:bg-cream-100 active:scale-90')}
        aria-label={`Reduce ${label}`}
      >
        <Minus className="h-3 w-3" />
      </button>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="w-6 text-center text-[0.82rem] font-bold tabular-nums text-brand-900"
        >
          {value}
        </motion.span>
      </AnimatePresence>
      <button
        onClick={() => onChange(value + 1)}
        className={cn(dim, 'inline-flex items-center justify-center rounded-full text-brand-900 transition-all hover:bg-cream-100 active:scale-90')}
        aria-label={`Add another ${label}`}
      >
        <Plus className="h-3 w-3" />
      </button>
    </div>
  )
}

function EmptyState({ onBrowse }: { onBrowse: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="flex h-full flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="flex h-24 w-24 items-center justify-center rounded-full bg-brand-500/10 text-brand-600"
      >
        <ShoppingBasket className="h-11 w-11" strokeWidth={1.4} />
      </motion.div>
      <h3 className="mt-6 font-display text-xl font-bold text-brand-900">Your basket is empty</h3>
      <p className="mt-2 max-w-[24rem] text-[0.9rem] leading-relaxed text-ink-500">
        Add what you need from the market — or start from one of our ready-made lists and edit from there.
      </p>
      <Button onClick={onBrowse} variant="primary" size="md" className="mt-6">
        Browse the market
      </Button>
    </motion.div>
  )
}
