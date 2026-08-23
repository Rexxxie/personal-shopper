/**
 * tawk.to live chat — loader, control surface, and enquiry hand-off.
 *
 * This is the site's one contact channel. Orders, office enquiries, shopper
 * applications and support questions all land here, which is the whole point:
 * a customer never gets pushed out to another app mid-checkout, and we never
 * lose the ones who would have bounced at that jump.
 *
 * The widget's own launcher is hidden — we drive it from our branded FAB in
 * `components/layout/Chrome.tsx` so support looks like the rest of the site.
 */

import { BRAND } from '@/data/brand'

/** Embed URL, e.g. https://embed.tawk.to/<propertyId>/<widgetId>. Set in `data/brand.ts`. */
const SRC = BRAND.tawk.trim()

/** `brand.ts` ships a placeholder so the repo has no half-configured widget. */
const CONFIGURED = SRC.length > 0 && !SRC.includes('PROPERTY_ID')

if (!CONFIGURED && import.meta.env.DEV) {
  console.warn('[tawk] Chat is off — set BRAND.tawk in src/data/brand.ts.')
}

/** Only the slice of the tawk.to API we actually call. */
type TawkApi = {
  onLoad?: () => void
  hideWidget?: () => void
  showWidget?: () => void
  maximize?: () => void
  minimize?: () => void
  toggle?: () => void
  isChatMaximized?: () => boolean
  onChatMinimized?: () => void
  onChatMaximized?: () => void
  setAttributes?: (attrs: Record<string, string>, cb?: (err?: unknown) => void) => void
  addEvent?: (event: string, metadata?: Record<string, string>, cb?: (err?: unknown) => void) => void
  addTags?: (tags: string[], cb?: (err?: unknown) => void) => void
}

declare global {
  interface Window {
    Tawk_API?: TawkApi
    Tawk_LoadStart?: Date
  }
}

/** Set once the <script> has been appended, so we never inject it twice. */
let injected = false
/** Flipped by tawk's own onLoad — the attribute/event APIs are no-ops before it. */
let ready = false
/** Work queued before the widget finished loading. */
const pending: (() => void)[] = []

/**
 * Subscribers to chat open/close.
 *
 * The dispatchers below are installed on `Tawk_API` exactly once, in `loadTawk`,
 * and subscribers go in this set. Assigning `onChatMaximized` per subscriber
 * instead — capturing and restoring the previous value — silently breaks under
 * React StrictMode, which mounts, unmounts, then remounts effects: the restore
 * can put back a callback belonging to a fiber that no longer renders anything.
 */
const listeners = new Set<(open: boolean) => void>()

function emit(open: boolean) {
  for (const fn of listeners) fn(open)
}

/** Runs `fn` now if the widget is up, otherwise queues it for onLoad. */
function whenReady(fn: () => void) {
  if (ready) fn()
  else pending.push(fn)
}

/** True when a property ID is configured — callers use this to hide the FAB. */
export const tawkEnabled = CONFIGURED

/**
 * Injects the tawk.to script, once. Safe to call on every mount.
 *
 * The widget is hidden the moment it loads: `hideWidget` only works after
 * `onLoad`, so we register the callback on `Tawk_API` *before* the script runs
 * — tawk reads the object we hand it rather than replacing it.
 */
export function loadTawk() {
  if (injected || !CONFIGURED || typeof document === 'undefined') return
  injected = true

  const api: TawkApi = window.Tawk_API ?? {}
  window.Tawk_API = api
  window.Tawk_LoadStart = new Date()

  const prevOnLoad = api.onLoad
  api.onLoad = () => {
    prevOnLoad?.()
    api.hideWidget?.()
    ready = true
    while (pending.length) pending.shift()?.()
  }

  api.onChatMaximized = () => emit(true)
  api.onChatMinimized = () => {
    // The panel's close button minimises it but leaves tawk's own launcher
    // visible — hide it again so only our FAB is ever on screen.
    api.hideWidget?.()
    emit(false)
  }

  const s = document.createElement('script')
  s.src = SRC
  s.async = true
  s.charset = 'UTF-8'
  s.setAttribute('crossorigin', '*')
  document.head.appendChild(s)
}

/**
 * Opens the chat panel. Called from a click handler, so the script may still be
 * in flight — in that case we queue the open behind `onLoad`.
 */
export function openTawk() {
  if (!CONFIGURED) return
  loadTawk()
  whenReady(() => {
    window.Tawk_API?.showWidget?.()
    window.Tawk_API?.maximize?.()
  })
}

/**
 * Runs `fn` whenever the chat panel opens or closes, with the new state.
 * Returns an unsubscribe.
 */
export function onTawkVisibility(fn: (open: boolean) => void) {
  listeners.add(fn)
  return () => {
    listeners.delete(fn)
  }
}

/* ========================================================================== */
/*  ENQUIRY HAND-OFF                                                          */
/* ========================================================================== */

export interface ChatSubmission {
  /** Short label the agent sees in the visitor's event feed. */
  subject: string
  /** The full plain-text enquiry. */
  body: string
  /** Identifies the visitor in the agent's panel. */
  visitor?: { name?: string; email?: string; phone?: string }
  /** Surfaced alongside the event — keep values short, tawk truncates. */
  meta?: Record<string, string>
  /** Groups conversations in the tawk dashboard. */
  tags?: string[]
}

export type SubmitOutcome = 'chat' | 'copied' | 'unavailable'

/**
 * Hands an enquiry to tawk and opens the chat.
 *
 * Two things happen because neither alone is sufficient:
 *
 *  - `setAttributes` + `addEvent` attach the full enquiry to the visitor record,
 *    so whoever picks the conversation up already has the order in front of them.
 *  - the body is copied to the clipboard, because tawk has no API to pre-fill
 *    the composer, and a conversation only reliably reaches the dashboard once
 *    the visitor actually sends something. Copying makes that one paste.
 *
 * Must be called inside a real user gesture — the clipboard write needs it.
 */
export async function submitToChat(s: ChatSubmission): Promise<SubmitOutcome> {
  let copied = false
  try {
    await navigator.clipboard?.writeText(s.body)
    copied = true
  } catch {
    // Denied permission, insecure origin, or an older browser. The confirmation
    // screen shows the full text anyway, so this is a soft failure.
  }

  if (!CONFIGURED) return copied ? 'copied' : 'unavailable'

  loadTawk()
  whenReady(() => {
    const api = window.Tawk_API
    if (!api) return

    const attrs: Record<string, string> = {}
    if (s.visitor?.name) attrs.name = s.visitor.name
    if (s.visitor?.email) attrs.email = s.visitor.email
    if (s.visitor?.phone) attrs.phone = s.visitor.phone
    for (const [k, v] of Object.entries(s.meta ?? {})) attrs[k] = v

    // setAttributes rejects the whole call on one bad value, so failures here
    // must not stop the event or the panel from opening.
    if (Object.keys(attrs).length) api.setAttributes?.(attrs, () => {})
    if (s.tags?.length) api.addTags?.(s.tags, () => {})
    api.addEvent?.(s.subject, { ...s.meta, details: s.body.slice(0, 800) }, () => {})

    api.showWidget?.()
    api.maximize?.()
  })

  return 'chat'
}
