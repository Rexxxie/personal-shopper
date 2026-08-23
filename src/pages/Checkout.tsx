import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, ShoppingBasket, Wallet } from 'lucide-react'
import { useList } from '@/store/list'
import { ZONES, SLOTS, BRAND } from '@/data/brand'
import { PLANS } from '@/data/content'
import { P } from '@/data/images'
import { naira, cn } from '@/lib/utils'
import { EASE } from '@/lib/motion'
import { buildOrderMessage } from '@/lib/orderMessage'
import { submitToChat, tawkEnabled, openTawk, type SubmitOutcome } from '@/lib/tawk'
import { Eyebrow, Chip } from '@/components/ui/primitives'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Field, TextArea } from '@/components/ui/Form'
import { phoneRule, required, useFields } from '@/lib/form'

const STEPS = ['Your list', 'Delivery', 'Confirm'] as const

/** Short, human-readable, and stable enough for a customer to quote back. */
function makeReference() {
  return `OJA-${String(Math.floor(Date.now() / 1000)).slice(-6)}`
}

/**
 * What the confirmation screen shows. Snapshotted at submit rather than read
 * live from the store, because the list is cleared the moment it is sent — a
 * live read would blank the receipt out from under the customer.
 */
interface SentOrder {
  reference: string
  total: number
  totalIsPartial: boolean
  zoneName: string
  /** Kept so the customer can re-copy it if the hand-off went wrong. */
  message: string
  /** Whether the chat actually opened, so the screen can say the right thing. */
  outcome: SubmitOutcome
}

/** Only the parts of the form object step 3 actually renders. */
type ContactKey = 'name' | 'phone' | 'address' | 'instructions'
interface ContactForm {
  values: Record<ContactKey, string>
  set: (key: ContactKey) => (value: string) => void
  errors: Partial<Record<ContactKey, string>>
}

export default function Checkout() {
  const list = useList()
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState<SentOrder | null>(null)
  const [direction, setDirection] = useState(1)

  const form = useFields({ name: '', phone: '', address: '', instructions: '' })

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1)
    setStep(next)
  }

  const submit = async () => {
    // Enter inside a quantity box on an earlier step would otherwise land here.
    if (step !== STEPS.length - 1) return

    const valid = form.validate({
      name: required('The shopper needs a name to ask for'),
      phone: phoneRule(),
      address: required('We need somewhere to bring it'),
    })
    if (!valid) return

    const reference = makeReference()

    const message = buildOrderMessage({
        reference,
        contact: {
          name: form.values.name,
          phone: form.values.phone,
          address: form.values.address,
          instructions: form.values.instructions,
        },
        lines: list.lines.map((l) => ({
          name: l.product.name,
          unit: l.product.unit,
          market: l.product.market,
          qty: l.qty,
          subtotal: l.subtotal,
          note: l.note,
        })),
        custom: list.custom.map((c) => ({ text: c.text, qty: c.qty })),
        planName: list.plan.name,
        serviceFee: list.serviceFee,
        zoneName: list.zone.name,
        deliveryFee: list.deliveryFee,
        slotId: list.state.slotId,
        estimate: list.estimate,
        total: list.total,
        budgetCap: list.state.budgetCap,
    })

    // Awaited before the screen swaps: the clipboard write inside needs to stay
    // within this user gesture, and the confirmation copy depends on the result.
    const outcome = await submitToChat({
      subject: `New market list — ${reference}`,
      body: message,
      visitor: { name: form.values.name, phone: form.values.phone },
      meta: {
        reference,
        deliverTo: list.zone.name,
        plan: list.plan.name,
        estimate: naira(list.total),
        items: String(list.count),
      },
      tags: ['order'],
    })

    setSent({
      reference,
      total: list.total,
      totalIsPartial: list.totalIsPartial,
      zoneName: list.zone.name,
      message,
      outcome,
    })
    // The list has left the building — don't leave it sitting here to re-send.
    list.clear()
  }

  if (sent) return <Success order={sent} />
  if (list.count === 0) return <EmptyCheckout />

  return (
    <div className="grain relative min-h-screen bg-cream-100 pb-24 pt-[8.5rem] sm:pt-[9.5rem]">
      <div className="container-x">
        <Link
          to="/shop"
          className="mb-6 flex w-fit items-center gap-1.5 text-[0.85rem] font-semibold text-ink-500 transition-colors hover:text-brand-900"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Keep shopping
        </Link>

        <Eyebrow>Almost there</Eyebrow>
        <h1 className="mt-3 text-h1 font-extrabold text-brand-950">Send your list</h1>

        {/* --------------------------------------------------- steps ---- */}
        <div className="mt-8 flex items-center gap-2 sm:gap-4">
          {STEPS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => i < step && go(i)}
              disabled={i > step}
              aria-current={i === step ? 'step' : undefined}
              className={cn(
                'group flex flex-1 flex-col gap-2 text-left',
                i > step && 'cursor-default',
              )}
            >
              <span className="relative h-1 w-full overflow-hidden rounded-full bg-brand-900/10">
                <motion.span
                  initial={false}
                  animate={{ scaleX: i <= step ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="absolute inset-0 origin-left rounded-full bg-brand-600"
                />
              </span>
              <span
                className={cn(
                  'text-[0.78rem] font-bold transition-colors sm:text-[0.85rem]',
                  i <= step ? 'text-brand-900' : 'text-ink-500',
                )}
              >
                <span className="mr-1.5 tabular-nums">{i + 1}.</span>
                {label}
              </span>
            </button>
          ))}
        </div>

        {/* ---------------------------------------------------- body ---- */}
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit()
          }}
          className="mt-10 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12"
        >
          <div className="min-h-[26rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                {step === 0 && <StepList />}
                {step === 1 && <StepDelivery />}
                {step === 2 && <StepConfirm form={form} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-9 flex gap-3">
              {step > 0 && (
                <Button type="button" onClick={() => go(step - 1)} variant="ghost" size="lg" magnetic={false}>
                  Back
                </Button>
              )}
              {step < STEPS.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => go(step + 1)}
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="flex-1 sm:flex-none"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="accent"
                  size="lg"
                  icon={<ArrowRight className="h-4 w-4" />}
                  className="flex-1 sm:flex-none"
                >
                  Send my list
                </Button>
              )}
            </div>
          </div>

          <OrderSummary />
        </form>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- step 1 */

function StepList() {
  const { lines, custom, setQty, remove } = useList()

  return (
    <div>
      <h2 className="text-h3 font-bold text-brand-950">Check what you’re asking for</h2>
      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">
        Add a note to anything that needs a particular size, cut or brand — your shopper reads these at the
        stall.
      </p>

      <div className="mt-6 space-y-2.5">
        {lines.map((l) => (
          <motion.div
            key={l.productId}
            layout
            className="flex items-center gap-3 rounded-2xl bg-cream-50 p-3 ring-1 ring-inset ring-brand-900/7"
          >
            <img src={P(l.product.photo, 120, 120)} alt="" className="h-14 w-14 rounded-xl object-cover" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9rem] font-semibold text-brand-900">{l.product.name}</p>
              <p className="text-[0.75rem] text-ink-500">
                {l.product.unit} · {l.product.market}
                {l.note && <span className="text-brand-700"> · “{l.note}”</span>}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                value={l.qty}
                onChange={(e) => setQty(l.productId, Number(e.target.value))}
                aria-label={`Quantity of ${l.product.name}`}
                className="h-9 w-14 rounded-lg bg-brand-900/5 text-center text-[0.85rem] font-bold tabular-nums focus:outline-none focus:ring-2 focus:ring-brand-500/40"
              />
              <span className="w-20 text-right text-[0.88rem] font-bold tabular-nums text-brand-900">
                {naira(l.subtotal)}
              </span>
              <button
                type="button"
                onClick={() => remove(l.productId)}
                className="text-[0.72rem] font-semibold text-ink-500 transition-colors hover:text-red-500"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))}

        {custom.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-3 rounded-2xl border border-dashed border-brand-600/30 bg-brand-500/5 p-4"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[0.9rem] font-semibold text-brand-900">
                {c.text} <span className="text-ink-500">× {c.qty}</span>
              </p>
              <p className="text-[0.75rem] text-ink-500">Priced at the market before you pay</p>
            </div>
            <Chip tone="brand">To be priced</Chip>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- step 2 */

function StepDelivery() {
  const { state, setZone, setSlot, setPlan, setBudget } = useList()
  const [budgetOn, setBudgetOn] = useState(state.budgetCap !== null)

  return (
    <div className="space-y-9">
      <div>
        <h2 className="text-h3 font-bold text-brand-950">Where are we bringing it?</h2>
        <div
          className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
          role="group"
          aria-label="Delivery zone"
        >
          {ZONES.map((z) => (
            <button
              key={z.name}
              type="button"
              onClick={() => setZone(z.name)}
              aria-pressed={state.zoneName === z.name}
              className={cn(
                'relative rounded-2xl p-3.5 text-left ring-1 ring-inset transition-all duration-300',
                state.zoneName === z.name
                  ? 'bg-brand-900 text-cream-100 ring-brand-900'
                  : 'bg-cream-50 text-ink-700 ring-brand-900/8 hover:ring-brand-900/30',
              )}
            >
              <p className="text-[0.88rem] font-bold">{z.name}</p>
              <p className={cn('mt-0.5 text-[0.72rem]', state.zoneName === z.name ? 'text-cream-100/60' : 'text-ink-500')}>
                {naira(z.fee)} · ~{z.eta}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-h3 font-bold text-brand-950">When suits you?</h2>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2" role="group" aria-label="Delivery window">
          {SLOTS.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setSlot(s.id)}
              aria-pressed={state.slotId === s.id}
              className={cn(
                'rounded-2xl p-4 text-left ring-1 ring-inset transition-all duration-300',
                state.slotId === s.id
                  ? 'bg-brand-900 text-cream-100 ring-brand-900'
                  : 'bg-cream-50 text-ink-700 ring-brand-900/8 hover:ring-brand-900/30',
              )}
            >
              <p className="text-[0.92rem] font-bold">{s.label}</p>
              <p className={cn('mt-0.5 text-[0.82rem]', state.slotId === s.id ? 'text-cream-100/70' : 'text-ink-600')}>
                {s.window}
              </p>
              <p className={cn('mt-1 text-[0.72rem]', state.slotId === s.id ? 'text-cream-100/50' : 'text-ink-500')}>
                {s.note}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-h3 font-bold text-brand-950">Which plan?</h2>
        <div className="mt-5 space-y-2.5" role="group" aria-label="Plan">
          {PLANS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              aria-pressed={state.planId === p.id}
              className={cn(
                'flex w-full items-center justify-between gap-4 rounded-2xl p-4 text-left ring-1 ring-inset transition-all duration-300',
                state.planId === p.id
                  ? 'bg-brand-900 text-cream-100 ring-brand-900'
                  : 'bg-cream-50 text-ink-700 ring-brand-900/8 hover:ring-brand-900/30',
              )}
            >
              <div>
                <p className="text-[0.95rem] font-bold">
                  {p.name} <span className="font-normal opacity-60">· {p.native}</span>
                </p>
                <p className={cn('mt-0.5 text-[0.8rem]', state.planId === p.id ? 'text-cream-100/60' : 'text-ink-500')}>
                  {p.cap}
                </p>
              </div>
              <span className="shrink-0 font-display text-[1.15rem] font-extrabold tabular-nums">
                {naira(p.price)}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={budgetOn}
            onChange={(e) => {
              setBudgetOn(e.target.checked)
              setBudget(e.target.checked ? 50000 : null)
            }}
            className="h-4.5 w-4.5 accent-brand-600"
          />
          <span className="text-[0.95rem] font-semibold text-brand-950">Set a budget cap for this run</span>
        </label>
        <AnimatePresence>
          {budgetOn && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4">
                <input
                  type="number"
                  min={5000}
                  step={1000}
                  value={state.budgetCap ?? 50000}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  aria-label="Budget cap in naira"
                  className="h-12 w-48 rounded-full bg-brand-900/5 px-5 text-[0.95rem] font-bold tabular-nums ring-1 ring-inset ring-brand-900/8 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
                <p className="mt-2 text-[0.82rem] text-ink-500">
                  Your shopper works to this and calls you before exceeding it.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

/* ---------------------------------------------------------------- step 3 */

function StepConfirm({ form }: { form: ContactForm }) {
  const { values, set, errors } = form

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-h3 font-bold text-brand-950">Who should the shopper call?</h2>
        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">
          Nothing is charged now. Sending opens our chat with your whole list ready — a shopper replies with
          today’s real prices for you to approve first.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Full name"
          name="name"
          placeholder="Adenike Ogunlana"
          autoComplete="name"
          required
          value={values.name}
          onChange={set('name')}
          error={errors.name}
        />
        <Field
          label="Phone / WhatsApp"
          name="phone"
          type="tel"
          inputMode="tel"
          placeholder="0801 234 5678"
          autoComplete="tel"
          required
          value={values.phone}
          onChange={set('phone')}
          error={errors.phone}
        />
      </div>

      <Field
        label="Delivery address"
        name="address"
        placeholder="12 Awolowo Avenue, Old Bodija"
        autoComplete="street-address"
        required
        value={values.address}
        onChange={set('address')}
        error={errors.address}
      />

      <TextArea
        label="Anything else the shopper should know?"
        name="instructions"
        rows={3}
        placeholder="Call when you reach the gate. Security will let you in. Ask for Kemi at reception."
        value={values.instructions}
        onChange={set('instructions')}
        error={errors.instructions}
      />

      <div className="flex items-start gap-3 rounded-2xl bg-brand-500/8 p-4 ring-1 ring-inset ring-brand-600/15">
        <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
        <p className="text-[0.88rem] leading-relaxed text-ink-600">
          <strong className="font-semibold text-brand-800">No payment yet.</strong> A shopper reviews your
          list, walks the market, and sends you today’s real prices. You approve that before transferring
          anything — and any change comes back to you the same day.
        </p>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------- summary */

function OrderSummary() {
  const {
    lines,
    custom,
    estimate,
    serviceFee,
    deliveryFee,
    total,
    totalIsPartial,
    plan,
    zone,
    state,
    overBudget,
  } = useList()
  const slot = SLOTS.find((s) => s.id === state.slotId)

  return (
    <aside className="lg:sticky lg:top-[7.5rem] lg:h-fit">
      <div className="rounded-[1.5rem] bg-brand-950 p-6 text-cream-100">
        <h3 className="font-display text-[1.15rem] font-bold">Your run</h3>

        <dl className="mt-5 space-y-2.5 text-[0.88rem]">
          <div className="flex justify-between">
            <dt className="text-cream-100/55">{lines.length} priced items</dt>
            <dd className="font-semibold tabular-nums">{naira(estimate)}</dd>
          </div>
          {custom.length > 0 && (
            <div className="flex justify-between">
              <dt className="text-cream-100/55">{custom.length} custom items</dt>
              <dd className="font-semibold text-accent-400">To be priced</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-cream-100/55">{plan.name} fee</dt>
            <dd className="font-semibold tabular-nums">
              {serviceFee === 0 ? 'On plan' : naira(serviceFee)}
            </dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-cream-100/55">Delivery · {zone.name}</dt>
            <dd className="font-semibold tabular-nums">{naira(deliveryFee)}</dd>
          </div>
          <div className="flex items-baseline justify-between border-t border-cream-100/12 pt-3.5">
            <dt className="font-display text-[1rem] font-bold">Estimated total</dt>
            <dd className="font-display text-[1.6rem] font-extrabold tabular-nums">
              {totalIsPartial && <span className="mr-1 text-[0.85rem] font-bold">from</span>}
              {naira(total)}
            </dd>
          </div>
        </dl>

        {totalIsPartial && (
          <p className="mt-3 text-[0.78rem] leading-relaxed text-cream-100/50">
            Your custom items are not in this figure — your shopper prices them at the stall, so the real
            total will be higher.
          </p>
        )}

        {overBudget && state.budgetCap && (
          <p className="mt-3 rounded-xl bg-accent-500/15 p-3 text-[0.8rem] leading-relaxed text-accent-200">
            This estimate is above your {naira(state.budgetCap)} cap. Your shopper will call you before
            spending over it.
          </p>
        )}

        <div className="mt-5 space-y-2 border-t border-cream-100/12 pt-5 text-[0.82rem] text-cream-100/55">
          <p>
            <span className="text-cream-100/85">Delivery window:</span> {slot?.label} · {slot?.window}
          </p>
          <p>
            <span className="text-cream-100/85">Markets:</span>{' '}
            {[...new Set(lines.map((l) => l.product.market))].join(', ') || '—'}
          </p>
        </div>
      </div>

      <p className="mt-4 px-1 text-[0.78rem] leading-relaxed text-ink-500">
        Questions before you send it?{' '}
        {tawkEnabled ? (
          <button
            type="button"
            onClick={openTawk}
            className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
          >
            Chat with us
          </button>
        ) : (
          <a href={BRAND.phoneHref} className="font-semibold text-brand-700 underline underline-offset-2">
            Call us
          </a>
        )}{' '}
        — a real person answers.
      </p>
    </aside>
  )
}

/* --------------------------------------------------------------- states */

function EmptyCheckout() {
  return (
    <div className="grain relative flex min-h-screen items-center justify-center bg-cream-100 px-6 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="max-w-md text-center"
      >
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-brand-500/10 text-brand-600"
        >
          <ShoppingBasket className="h-11 w-11" strokeWidth={1.4} />
        </motion.div>
        <h1 className="mt-7 text-h2 font-extrabold text-brand-950">Nothing to send yet</h1>
        <p className="mt-3 text-[1rem] leading-relaxed text-ink-600">
          Add a few things from the market — or load one of our ready-made lists — and come back here.
        </p>
        <div className="mt-7">
          <ButtonLink to="/shop" variant="accent" size="lg">
            Browse the market
          </ButtonLink>
        </div>
      </motion.div>
    </div>
  )
}

/**
 * The safety net for the whole hand-off: clipboards work when a deep link or a
 * pre-filled body doesn't, so the list can never be stranded in a closed tab.
 */
function CopyListButton({ message }: { message: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
    } catch {
      // Denied clipboard permission or an insecure origin — the email fallback
      // above is still there, so say nothing rather than throw an error at them.
    }
  }

  return (
    <Button type="button" onClick={copy} variant="ghost" size="sm" magnetic={false}>
      {copied ? 'Copied to clipboard' : 'Copy my list'}
    </Button>
  )
}

function Success({ order }: { order: SentOrder }) {
  return (
    <div className="grain relative flex min-h-screen items-center justify-center bg-cream-100 px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="w-full max-w-xl text-center"
      >
        <motion.span
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.15 }}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-white"
        >
          <Check className="h-10 w-10" strokeWidth={2.5} />
        </motion.span>

        <h1 className="mt-8 text-h1 font-extrabold text-brand-950">Your list is ready to send</h1>
        <p className="mx-auto mt-4 max-w-md text-[1.05rem] leading-relaxed text-ink-600">
          {order.outcome === 'chat' ? (
            <>
              The chat has opened with your details, and your full list is copied to your clipboard — paste
              it in and hit send. A shopper picks it up from there and sends the fully costed list back to
              approve, usually within 20 minutes.
            </>
          ) : (
            <>
              Your full list for {order.zoneName} is below. Send it to us and a shopper picks it up — you’ll
              get the fully costed list back to approve, usually within 20 minutes.
            </>
          )}
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mx-auto mt-8 max-w-sm rounded-3xl bg-cream-50 p-6 text-left ring-1 ring-inset ring-brand-900/8"
        >
          <div className="flex items-baseline justify-between">
            <span className="text-[0.8rem] text-ink-500">Reference</span>
            <span className="font-display text-[1rem] font-extrabold tracking-wide text-brand-900">
              {order.reference}
            </span>
          </div>
          <div className="mt-3 flex items-baseline justify-between border-t border-brand-900/8 pt-3">
            <span className="text-[0.8rem] text-ink-500">Estimated total</span>
            <span className="font-display text-[1.2rem] font-extrabold tabular-nums text-brand-900">
              {order.totalIsPartial && <span className="mr-1 text-[0.8rem]">from</span>}
              {naira(order.total)}
            </span>
          </div>
        </motion.div>

        <div className="mx-auto mt-5 max-w-sm">
          <p className="text-[0.82rem] leading-relaxed text-ink-500">
            Chat didn’t open, or the paste came out short?{' '}
            {tawkEnabled && (
              <>
                <button
                  type="button"
                  onClick={openTawk}
                  className="font-semibold text-brand-700 underline underline-offset-2 hover:text-brand-900"
                >
                  Open the chat
                </button>{' '}
                and paste it in, or{' '}
              </>
            )}
            <a
              href={`mailto:${BRAND.email}?subject=${encodeURIComponent(`Market list ${order.reference}`)}&body=${encodeURIComponent(order.message)}`}
              className="font-semibold text-brand-700 underline underline-offset-2"
            >
              email it to us
            </a>
            .
          </p>
          <div className="mt-3">
            <CopyListButton message={order.message} />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
        >
          <ButtonLink to="/shop" variant="accent" size="lg">
            Start another list
          </ButtonLink>
          <ButtonLink to="/" variant="outline" size="lg">
            Back to home
          </ButtonLink>
        </motion.div>

        {/* Not "track *your* run" — tracking is a preview until the shopper app exists. */}
        <p className="mt-6 text-[0.8rem] text-ink-500">
          <Link to="/track" className="font-semibold text-brand-700 underline underline-offset-2">
            See what live tracking will look like
          </Link>
        </p>
      </motion.div>
    </div>
  )
}
