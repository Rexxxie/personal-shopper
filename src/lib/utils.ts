import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

/** ₦12,500 — Nigerian Naira, no decimals (kobo is dead in practice). */
export function naira(amount: number) {
  return `₦${Math.round(amount).toLocaleString('en-NG')}`
}

/** Compact form for stat counters: 12500 -> "12.5k" */
export function compact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}m`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}k`
  return `${n}`
}

export function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Deterministic pick so SSR/re-renders stay stable. */
export function pick<T>(arr: T[], seed: number): T {
  return arr[Math.abs(seed) % arr.length]
}
