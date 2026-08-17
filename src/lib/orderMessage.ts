import { SLOTS } from '@/data/brand'
import { naira } from '@/lib/utils'
import { bold, composeMessage, normalisePhone } from '@/lib/whatsapp'

/* ============================================================================
   ORDER → WHATSAPP MESSAGE
   Kept deliberately independent of the store's shape: it takes exactly the
   fields it prints, so it can be unit-tested, reused by the shopper app later,
   and won't break when the store is refactored.
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
 * Above roughly this much message text the wa.me pre-fill stops being reliable —
 * some clients silently truncate the text rather than fail, which would drop
 * items off the end of a big office list without anyone noticing. Past the
 * threshold we drop per-item prices (an estimate the shopper re-checks at the
 * stall anyway) and keep every item, then say what was left out.
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
    ? `${bold('Estimated total')}: from ${naira(order.total)} (${order.custom.length} item${
        order.custom.length === 1 ? '' : 's'
      } still to be priced)`
    : `${bold('Estimated total')}: ${naira(order.total)}`

  return composeMessage([
    `${bold(`New market list — ${order.reference}`)}`,

    [
      `${bold('Name')}: ${order.contact.name}`,
      `${bold('Phone')}: ${normalisePhone(order.contact.phone)}`,
      `${bold('Address')}: ${order.contact.address}`,
    ].join('\n'),

    items.length > 0 && [bold(`From the catalogue (${items.length})`), ...items].join('\n'),

    extras.length > 0 &&
      [bold(`Also buy — price at the stall (${extras.length})`), ...extras].join('\n'),

    [
      `${bold('Plan')}: ${order.planName}${order.serviceFee === 0 ? ' (on plan)' : ` — ${naira(order.serviceFee)}`}`,
      `${bold('Deliver to')}: ${order.zoneName} — ${naira(order.deliveryFee)}`,
      slot && `${bold('Window')}: ${slot.label}, ${slot.window}`,
      markets.length > 0 && `${bold('Markets')}: ${markets.join(', ')}`,
      order.budgetCap !== null && `${bold('Budget cap')}: ${naira(order.budgetCap)}`,
    ]
      .filter(Boolean)
      .join('\n'),

    [
      `${bold('Goods estimate')}: ${naira(order.estimate)}`,
      totalLine,
      compact && '(Long list — per-item estimates left off. Please price each item at the stall.)',
    ]
      .filter(Boolean)
      .join('\n'),

    order.contact.instructions?.trim() && `${bold('Notes')}: ${order.contact.instructions.trim()}`,

    'Sent from the Ojàmi website. Please confirm today’s real prices before I transfer anything.',
  ])
}
