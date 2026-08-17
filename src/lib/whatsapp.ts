import { BRAND } from '@/data/brand'

/* ============================================================================
   WHATSAPP HANDOFF
   Until there is a backend, WhatsApp *is* the backend. Every form on the site
   composes a plain-text message and hands the customer off to the business
   number, which means an enquiry actually lands somewhere a human reads it.

   This is not a stopgap that gets thrown away either: the copy already promises
   "you'll get a WhatsApp message with the fully costed list", so the handoff is
   the real product flow. When order storage exists it goes *alongside* this,
   not instead of it.
   ========================================================================== */

export function waLink(message: string) {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`
}

/**
 * Opens the WhatsApp thread with the message pre-filled. Must be called from
 * inside a real user gesture (submit/click) or the popup blocker eats it —
 * hence the same-tab fallback rather than a silent failure.
 */
export function openWhatsApp(message: string) {
  const url = waLink(message)
  const opened = window.open(url, '_blank', 'noopener,noreferrer')
  if (!opened) window.location.href = url
}

/* -------------------------------------------------------------- formatting */

/** Drops empty sections so an optional field left blank doesn't leave a hole. */
export function composeMessage(blocks: (string | null | undefined | false)[]) {
  return blocks.filter(Boolean).join('\n\n')
}

/** WhatsApp renders *single asterisks* as bold. */
export function bold(s: string) {
  return `*${s}*`
}

export function labelled(label: string, value: string | null | undefined) {
  if (!value) return null
  return `${bold(label)}: ${value}`
}

/* -------------------------------------------------------------- validation */

/**
 * Nigerian mobile numbers as people actually type them: `0801 234 5678`,
 * `+234 801 234 5678`, `234801...`. Deliberately loose — rejecting a real
 * customer's number costs far more than accepting a slightly odd one.
 */
export function isPhone(value: string) {
  const digits = value.replace(/\D/g, '')
  return /^(0\d{10}|234\d{10})$/.test(digits)
}

export function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim())
}

/** Normalises whatever they typed to the international form for our records. */
export function normalisePhone(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.startsWith('0')) return `+234${digits.slice(1)}`
  if (digits.startsWith('234')) return `+${digits}`
  return value.trim()
}
