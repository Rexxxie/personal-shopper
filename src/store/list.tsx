import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ReactNode,
} from 'react'
import { PRODUCTS, type Product } from '@/data/catalog'
import { PLANS, type Plan } from '@/data/content'
import { ZONES, type Zone } from '@/data/brand'

/* ============================================================================
   THE SHOPPING LIST
   Deliberately framed as a "list" rather than a cart: the customer is not
   buying from us, they are handing a list to a shopper. Kept in a reducer +
   localStorage so the same logic ports cleanly to React Native later
   (swap localStorage for AsyncStorage and nothing else changes).
   ========================================================================== */

export interface ListLine {
  productId: string
  qty: number
  /** Free text the shopper reads at the stall: "small size", "cut in two". */
  note?: string
}

/** Anything not in our catalogue — typed in by the customer. */
export interface CustomLine {
  id: string
  text: string
  qty: number
}

interface State {
  lines: ListLine[]
  custom: CustomLine[]
  planId: string
  zoneName: string
  slotId: string
  budgetCap: number | null
}

type Action =
  | { type: 'add'; productId: string; qty?: number }
  | { type: 'remove'; productId: string }
  | { type: 'setQty'; productId: string; qty: number }
  | { type: 'setNote'; productId: string; note: string }
  | { type: 'addCustom'; text: string }
  | { type: 'removeCustom'; id: string }
  | { type: 'setCustomQty'; id: string; qty: number }
  | { type: 'addMany'; productIds: string[] }
  | { type: 'setPlan'; planId: string }
  | { type: 'setZone'; zoneName: string }
  | { type: 'setSlot'; slotId: string }
  | { type: 'setBudget'; cap: number | null }
  | { type: 'clear' }
  | { type: 'hydrate'; state: State }

const INITIAL: State = {
  lines: [],
  custom: [],
  planId: 'full',
  zoneName: 'Bodija',
  slotId: 'lunch',
  budgetCap: null,
}

const STORAGE_KEY = 'ojami.list.v1'

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'hydrate':
      return action.state

    case 'add': {
      const existing = state.lines.find((l) => l.productId === action.productId)
      if (existing) {
        return {
          ...state,
          lines: state.lines.map((l) =>
            l.productId === action.productId ? { ...l, qty: l.qty + (action.qty ?? 1) } : l,
          ),
        }
      }
      return { ...state, lines: [...state.lines, { productId: action.productId, qty: action.qty ?? 1 }] }
    }

    case 'addMany': {
      const next = [...state.lines]
      for (const id of action.productIds) {
        const found = next.find((l) => l.productId === id)
        if (found) found.qty += 1
        else next.push({ productId: id, qty: 1 })
      }
      return { ...state, lines: next }
    }

    case 'remove':
      return { ...state, lines: state.lines.filter((l) => l.productId !== action.productId) }

    case 'setQty':
      if (action.qty <= 0) return reducer(state, { type: 'remove', productId: action.productId })
      return {
        ...state,
        lines: state.lines.map((l) => (l.productId === action.productId ? { ...l, qty: action.qty } : l)),
      }

    case 'setNote':
      return {
        ...state,
        lines: state.lines.map((l) => (l.productId === action.productId ? { ...l, note: action.note } : l)),
      }

    case 'addCustom': {
      const text = action.text.trim()
      if (!text) return state
      return {
        ...state,
        custom: [...state.custom, { id: `c${Date.now()}${state.custom.length}`, text, qty: 1 }],
      }
    }

    case 'removeCustom':
      return { ...state, custom: state.custom.filter((c) => c.id !== action.id) }

    case 'setCustomQty':
      if (action.qty <= 0) return reducer(state, { type: 'removeCustom', id: action.id })
      return { ...state, custom: state.custom.map((c) => (c.id === action.id ? { ...c, qty: action.qty } : c)) }

    case 'setPlan':
      return { ...state, planId: action.planId }
    case 'setZone':
      return { ...state, zoneName: action.zoneName }
    case 'setSlot':
      return { ...state, slotId: action.slotId }
    case 'setBudget':
      return { ...state, budgetCap: action.cap }
    case 'clear':
      return { ...INITIAL, planId: state.planId, zoneName: state.zoneName, slotId: state.slotId }
    default:
      return state
  }
}

export interface ResolvedLine extends ListLine {
  product: Product
  subtotal: number
}

interface ListContext {
  state: State
  lines: ResolvedLine[]
  custom: CustomLine[]
  count: number
  estimate: number
  plan: Plan
  zone: Zone
  serviceFee: number
  deliveryFee: number
  total: number
  /** True when unpriced custom items mean `total` is a floor, not a figure. */
  totalIsPartial: boolean
  overBudget: boolean
  /** Drawer open state lives here so any component can pop the list open. */
  open: boolean
  setOpen: (v: boolean) => void
  /** Fires whenever an item is added — drives the fly-to-cart flourish. */
  lastAdded: { id: string; at: number } | null
  add: (productId: string, qty?: number) => void
  addMany: (ids: string[]) => void
  remove: (productId: string) => void
  setQty: (productId: string, qty: number) => void
  setNote: (productId: string, note: string) => void
  addCustom: (text: string) => void
  removeCustom: (id: string) => void
  setCustomQty: (id: string, qty: number) => void
  setPlan: (id: string) => void
  setZone: (name: string) => void
  setSlot: (id: string) => void
  setBudget: (cap: number | null) => void
  clear: () => void
  has: (productId: string) => boolean
  qtyOf: (productId: string) => number
}

const Ctx = createContext<ListContext | null>(null)

export function ListProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL)
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState<{ id: string; at: number } | null>(null)
  const [hydrated, setHydrated] = useState(false)

  // Restore any list left over from a previous visit.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as State
        // Drop lines whose products no longer exist in the catalogue.
        parsed.lines = (parsed.lines ?? []).filter((l) => PRODUCTS.some((p) => p.id === l.productId))
        dispatch({ type: 'hydrate', state: { ...INITIAL, ...parsed } })
      }
    } catch {
      /* corrupt storage — start fresh rather than crash the app */
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* private mode / quota — non-fatal */
    }
  }, [state, hydrated])

  const lines = useMemo<ResolvedLine[]>(
    () =>
      state.lines.flatMap((l) => {
        const product = PRODUCTS.find((p) => p.id === l.productId)
        if (!product) return []
        return [{ ...l, product, subtotal: product.price * l.qty }]
      }),
    [state.lines],
  )

  const estimate = useMemo(() => lines.reduce((sum, l) => sum + l.subtotal, 0), [lines])
  const count = useMemo(
    () => lines.reduce((n, l) => n + l.qty, 0) + state.custom.reduce((n, c) => n + c.qty, 0),
    [lines, state.custom],
  )

  const plan = PLANS.find((p) => p.id === state.planId) ?? PLANS[1]
  const zone = ZONES.find((z) => z.name === state.zoneName) ?? ZONES[0]

  // Monthly plans bill separately — a single run under one carries no per-run fee.
  const serviceFee = plan.billing === 'monthly' ? 0 : plan.price
  const deliveryFee = zone.fee
  const total = estimate + serviceFee + deliveryFee
  const overBudget = state.budgetCap !== null && total > state.budgetCap
  /**
   * Custom items have no price until a shopper reaches the stall, so any list
   * containing one has a total that can only go up. The UI shows "from ₦X"
   * rather than a confident figure it cannot stand behind.
   */
  const totalIsPartial = state.custom.length > 0

  const add = useCallback((productId: string, qty = 1) => {
    dispatch({ type: 'add', productId, qty })
    setLastAdded({ id: productId, at: Date.now() })
  }, [])

  const addMany = useCallback((ids: string[]) => {
    dispatch({ type: 'addMany', productIds: ids })
    setLastAdded({ id: ids[0] ?? '', at: Date.now() })
  }, [])

  const value: ListContext = {
    state,
    lines,
    custom: state.custom,
    count,
    estimate,
    plan,
    zone,
    serviceFee,
    deliveryFee,
    total,
    totalIsPartial,
    overBudget,
    open,
    setOpen,
    lastAdded,
    add,
    addMany,
    remove: (productId) => dispatch({ type: 'remove', productId }),
    setQty: (productId, qty) => dispatch({ type: 'setQty', productId, qty }),
    setNote: (productId, note) => dispatch({ type: 'setNote', productId, note }),
    addCustom: (text) => dispatch({ type: 'addCustom', text }),
    removeCustom: (id) => dispatch({ type: 'removeCustom', id }),
    setCustomQty: (id, qty) => dispatch({ type: 'setCustomQty', id, qty }),
    setPlan: (planId) => dispatch({ type: 'setPlan', planId }),
    setZone: (zoneName) => dispatch({ type: 'setZone', zoneName }),
    setSlot: (slotId) => dispatch({ type: 'setSlot', slotId }),
    setBudget: (cap) => dispatch({ type: 'setBudget', cap }),
    clear: () => dispatch({ type: 'clear' }),
    has: (productId) => state.lines.some((l) => l.productId === productId),
    qtyOf: (productId) => state.lines.find((l) => l.productId === productId)?.qty ?? 0,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

/*
 * Kept beside the provider on purpose. Splitting the hook into its own module
 * would satisfy the fast-refresh rule, but it separates the context from the
 * only thing allowed to read it and costs an import in every consumer. The rule
 * only governs HMR ergonomics — editing this file full-reloads instead of
 * preserving state — which is a fair price for the provider and its accessor
 * living together.
 */
// oxlint-disable-next-line react/only-export-components
export function useList() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useList must be used inside <ListProvider>')
  return ctx
}
