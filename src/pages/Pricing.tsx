import { motion } from 'motion/react'
import { useState } from 'react'
import { Check, Info, X } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { PlanCard, Faq, FinalCta } from '@/components/home/Proof'
import { PLANS } from '@/data/content'
import { ZONES } from '@/data/brand'
import { PRODUCTS } from '@/data/catalog'
import { Section, Eyebrow, Chip } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { popIn, spring, EASE } from '@/lib/motion'
import { naira, cn } from '@/lib/utils'

const COMPARE = [
  { label: 'Markets per run', quick: '1', full: 'Up to 3', office: 'Unlimited' },
  { label: 'Items on the list', quick: 'Up to 12', full: 'Unlimited', office: 'Unlimited' },
  { label: 'Photo proof at the stall', quick: true, full: true, office: true },
  { label: 'Trader receipts', quick: true, full: true, office: true },
  { label: 'Three-stall price check', quick: false, full: true, office: true },
  { label: 'Choose your delivery window', quick: false, full: true, office: true },
  { label: 'Meat cut / fish cleaned to order', quick: false, full: true, office: true },
  { label: 'Free re-delivery on mistakes', quick: false, full: true, office: true },
  { label: 'Same shopper every time', quick: false, full: false, office: true },
  { label: 'Office reception drop-off', quick: false, full: true, office: true },
  { label: 'Monthly invoice & statement', quick: false, full: false, office: true },
  { label: 'Priority WhatsApp line', quick: false, full: false, office: true },
]

/** Illustrative baskets so the flat fee lands as concretely as possible. */
const EXAMPLES = [
  {
    name: 'A mid-week top-up',
    items: ['tomato-paint', 'ugu', 'eggs', 'bread'],
    plan: 'quick' as const,
    zone: 'Bodija',
  },
  {
    name: 'A full monthly market run',
    items: ['rice-50kg', 'beans-oloyin', 'palm-oil', 'yam-big', 'beef', 'titus', 'onions', 'garri-ijebu'],
    plan: 'full' as const,
    zone: 'Ring Road',
  },
]

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title={'We charge for the walking.\nNot for your *groceries*.'}
        lead="One flat service fee per run, plus a flat delivery fee for your area. Everything else on your receipt is what the trader charged. Our fee does not rise because your basket did."
      />

      {/* ------------------------------------------------------- plans ---- */}
      <Section tone="cream" className="grain !pt-4">
        <div className="container-x">
          <RevealGroup className="grid gap-5 lg:grid-cols-3" gap={0.09}>
            {PLANS.map((p) => (
              <RevealItem key={p.id} variants={popIn} className={cn(p.featured && 'lg:-my-4')}>
                <PlanCard plan={p} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ----------------------------------------------------- compare ---- */}
      <Section tone="white" className="grain !py-16 sm:!py-20">
        <div className="container-x">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Side by side</Eyebrow>
            <TextReveal
              as="h2"
              text={'What each plan *includes*.'}
              className="mt-4 text-h2 font-extrabold text-brand-950"
            />
          </div>

          <Reveal className="overflow-hidden rounded-3xl ring-1 ring-inset ring-brand-900/10">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <thead>
                  <tr className="bg-brand-950 text-cream-100">
                    <th className="px-5 py-4 text-[0.8rem] font-semibold">Feature</th>
                    {PLANS.map((p) => (
                      <th key={p.id} className="px-5 py-4 text-center">
                        <span className="block font-display text-[0.98rem] font-bold">{p.name}</span>
                        <span className="mt-0.5 block text-[0.72rem] font-normal text-cream-100/55">
                          {naira(p.price)} {p.unit}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARE.map((row, i) => (
                    <tr key={row.label} className={cn(i % 2 === 0 ? 'bg-cream-100' : 'bg-cream-50')}>
                      <td className="px-5 py-3.5 text-[0.88rem] font-medium text-ink-700">{row.label}</td>
                      {(['quick', 'full', 'office'] as const).map((k) => (
                        <td key={k} className="px-5 py-3.5 text-center">
                          <Cell value={row[k]} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------------------------------------------- examples ---- */}
      <Section tone="cream" className="grain">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <Eyebrow>Worked examples</Eyebrow>
            <TextReveal
              as="h2"
              text={'What a real run\nactually *costs*.'}
              className="mt-4 text-h2 font-extrabold text-brand-950"
            />
            <FadeText className="mt-5 text-[1rem] leading-relaxed text-ink-600" delay={0.12}>
              Two typical baskets, priced end to end. Notice that the service fee is the same small number in
              both — that is the whole idea.
            </FadeText>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {EXAMPLES.map((ex) => (
              <ExampleCard key={ex.name} example={ex} />
            ))}
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------- zones ---- */}
      <Section tone="white" className="grain">
        <div className="container-x">
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Delivery fees</Eyebrow>
              <TextReveal
                as="h2"
                text={'Flat fee, by *your area*.'}
                className="mt-4 text-h2 font-extrabold text-brand-950"
              />
            </div>
            <FadeText className="max-w-md text-[0.95rem] leading-relaxed text-ink-600" delay={0.12}>
              Charged once per run no matter how heavy the load. Estimated times are from when your shopper
              leaves the market.
            </FadeText>
          </div>

          <RevealGroup className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4" gap={0.025}>
            {ZONES.map((z) => (
              <RevealItem key={z.name}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={spring}
                  className="flex items-center justify-between gap-2 rounded-2xl bg-cream-100 px-4 py-3.5 ring-1 ring-inset ring-brand-900/8"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[0.88rem] font-bold text-brand-900">{z.name}</p>
                    <p className="text-[0.7rem] text-ink-500">~{z.eta}</p>
                  </div>
                  <span className="shrink-0 text-[0.85rem] font-extrabold tabular-nums text-brand-700">
                    {naira(z.fee)}
                  </span>
                </motion.div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-6">
            <div className="flex items-start gap-3 rounded-2xl bg-brand-500/8 p-4 ring-1 ring-inset ring-brand-600/15">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-[0.88rem] leading-relaxed text-ink-600">
                Not seeing your area? We are adding zones every month — message us and we will quote your
                street directly. Bulk runs above ₦500,000 and restaurant supply are priced individually.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Faq />
      <FinalCta />
    </>
  )
}

/* ------------------------------------------------------------------------ */

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'string') {
    return <span className="text-[0.85rem] font-semibold text-ink-700">{value}</span>
  }
  return value ? (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/14 text-brand-600">
      <Check className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  ) : (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-ink-800/5 text-ink-400">
      <X className="h-3.5 w-3.5" strokeWidth={2.5} />
    </span>
  )
}

function ExampleCard({ example }: { example: (typeof EXAMPLES)[number] }) {
  const [open, setOpen] = useState(false)
  const items = example.items.flatMap((id) => PRODUCTS.find((p) => p.id === id) ?? [])
  const goods = items.reduce((s, p) => s + p.price, 0)
  const plan = PLANS.find((p) => p.id === example.plan)!
  const zone = ZONES.find((z) => z.name === example.zone)!
  const total = goods + plan.price + zone.fee
  const feePct = ((plan.price + zone.fee) / total) * 100

  return (
    <Reveal className="flex h-full flex-col rounded-3xl bg-cream-50 p-7 ring-1 ring-inset ring-brand-900/8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-[1.25rem] font-bold tracking-[-0.03em] text-brand-950">
            {example.name}
          </h3>
          <p className="mt-1 text-[0.82rem] text-ink-500">
            {items.length} items · {plan.name} · delivered to {zone.name}
          </p>
        </div>
        <Chip tone="brand">{plan.native}</Chip>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-5 self-start text-[0.8rem] font-semibold text-brand-700 underline decoration-brand-500/40 underline-offset-4 transition-colors hover:text-accent-600"
      >
        {open ? 'Hide the basket' : 'See what’s in the basket'}
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EASE }}
        className="overflow-hidden"
      >
        <ul className="mt-4 space-y-1.5">
          {items.map((p) => (
            <li key={p.id} className="flex items-baseline justify-between gap-3 text-[0.84rem]">
              <span className="text-ink-600">
                {p.name} <span className="text-ink-400">· {p.unit}</span>
              </span>
              <span className="shrink-0 font-semibold tabular-nums text-ink-700">{naira(p.price)}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <dl className="mt-auto space-y-2 border-t border-brand-900/10 pt-5 text-[0.9rem]">
        <div className="flex justify-between">
          <dt className="text-ink-500">Goods at market price</dt>
          <dd className="font-semibold tabular-nums text-ink-700">{naira(goods)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-500">{plan.name} service fee</dt>
          <dd className="font-semibold tabular-nums text-brand-700">{naira(plan.price)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-500">Delivery to {zone.name}</dt>
          <dd className="font-semibold tabular-nums text-brand-700">{naira(zone.fee)}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-brand-900/10 pt-3">
          <dt className="font-display text-[1rem] font-bold text-brand-950">You pay</dt>
          <dd className="font-display text-[1.5rem] font-extrabold tabular-nums text-brand-900">
            {naira(total)}
          </dd>
        </div>
      </dl>

      <div className="mt-4 rounded-2xl bg-brand-500/8 p-3.5">
        <p className="text-[0.8rem] text-ink-600">
          Our cut of this run:{' '}
          <strong className="font-bold text-brand-800">{feePct.toFixed(1)}%</strong> of the total.
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-brand-900/10">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: feePct / 100 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
            className="h-full origin-left rounded-full bg-accent-500"
          />
        </div>
      </div>
    </Reveal>
  )
}
