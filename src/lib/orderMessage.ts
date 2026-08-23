import { SLOTS } from '@/data/brand'
import { naira } from '@/lib/utils'
import { composeMessage, normalisePhone } from '@/lib/validate'

/* ============================================================================
   ORDER → PLAIN TEXT
   Kept deliberately independent of the store's shape: it takes exactly the
   fields it prints, so it can be unit-tested, reused by the shopper app later,
   and won't break when the store is refactored.

   Plain text with no markup — it goes into a chat composer and an agent's
   event feed, both of which render it literally.
   ========================================================================== */

export interface OrderLineInput {
  name: string
  unit: string
  market: string
  qty: number
  subtotal: number
  note?: string
}

export interface OrderCustomInput {
  text: string
  qty: number
}

export interface OrderInput {
  reference: string
  contact: { name: string; phone: string; address: string; instructions?: string }
  lines: OrderLineInput[]
  custom: OrderCustomInput[]
  planName: string
  serviceFee: number
  zoneName: string
  deliveryFee: number
  slotId: string
  estimate: number
  total: number
  budgetCap: number | null
}

/**
 * Past roughly this much text the message stops being something a person wants
 * to read in a chat panel. Beyond it we drop per-item price estimates — a figure
 * the shopper re-checks at the stall anyway — and keep every single item, then
 * say plainly what was left out.
 *
 * Measured: ~25 items sits near 1.5k of text; 50 items exceeds it.
 */
const COMPACT_OVER = 1800

export function buildOrderMessage(order: OrderInput): string {
  const full = render(order, false)
  return full.length <= COMPACT_OVER ? full : render(order, true)
}

function render(order: OrderInput, compact: boolean) {
  const slot = SLOTS.find((s) => s.id === order.slotId)
  const markets = [...new Set(order.lines.map((l) => l.market))]

  const items = order.lines.map((l) => {
    const note = l.note?.trim() ? ` — “${l.note.trim()}”` : ''
    // The unit stays even when compacting — "Big tuber" changes what they buy,
    // the estimate does not.
    if (compact) return `• ${l.qty} × ${l.name} (${l.unit})${note}`
    return `• ${l.qty} × ${l.name} (${l.unit}) — ${naira(l.subtotal)}${note}`
  })

  const extras = order.custom.map((c) => `• ${c.qty} × ${c.text}`)

  // A list with unpriced extras can only cost more than the figure shown.
  const totalLine = order.custom.length
    ? `Estimated total: from ${naira(order.total)} (${order.custom.length} item${
        order.custom.length === 1 ? '' : 's'
      } still to be priced)`
    : `Estimated total: ${naira(order.total)}`

  return composeMessage([
    `NEW MARKET LIST — ${order.reference}`,

    [
      `Name: ${order.contact.name}`,
      `Phone: ${normalisePhone(order.contact.phone)}`,
      `Address: ${order.contact.address}`,
    ].join('\n'),

    items.length > 0 && [`From the catalogue (${items.length})`, ...items].join('\n'),

    extras.length > 0 && [`Also buy — price at the stall (${extras.length})`, ...extras].join('\n'),

    [
      `Plan: ${order.planName}${order.serviceFee === 0 ? ' (on plan)' : ` — ${naira(order.serviceFee)}`}`,
      `Deliver to: ${order.zoneName} — ${naira(order.deliveryFee)}`,
      slot && `Window: ${slot.label}, ${slot.window}`,
      markets.length > 0 && `Markets: ${markets.join(', ')}`,
      order.budgetCap !== null && `Budget cap: ${naira(order.budgetCap)}`,
    ]
      .filter(Boolean)
      .join('\n'),

    [
      `Goods estimate: ${naira(order.estimate)}`,
      totalLine,
      compact && '(Long list — per-item estimates left off. Please price each item at the stall.)',
    ]
      .filter(Boolean)
      .join('\n'),

    order.contact.instructions?.trim() && `Notes: ${order.contact.instructions.trim()}`,

    'Sent from the Ojàmi website. Please confirm today’s real prices before I transfer anything.',
  ])
}
