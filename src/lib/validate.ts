/* ============================================================================
   FIELD VALIDATION
   Channel-agnostic on purpose — these rules outlive whatever we happen to send
   enquiries through this month.
   ========================================================================== */

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

/* -------------------------------------------------------------- formatting */

/** Drops empty sections so an optional field left blank doesn't leave a hole. */
export function composeMessage(blocks: (string | null | undefined | false)[]) {
  return blocks.filter(Boolean).join('\n\n')
}

export function labelled(label: string, value: string | null | undefined) {
  if (!value) return null
  return `${label}: ${value}`
}
