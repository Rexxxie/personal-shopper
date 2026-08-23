import { motion } from 'motion/react'
import { cn } from '@/lib/utils'

/* ============================================================================
   FORM PRIMITIVES
   These used to live in ForOffices.tsx and were imported by Contact and
   Checkout — a page owning a shared primitive, which also dragged the whole
   offices page into the checkout chunk. They live here now.

   Fields are controlled. That sounds obvious, but the earlier version was
   uncontrolled with no ref and nothing reading it, so every form on the site
   silently discarded what the customer typed.

   State and validation rules live in `@/lib/form` — see the note there.
   ========================================================================== */

const INPUT_BASE =
  'w-full bg-brand-900/4 text-[0.92rem] ring-1 ring-inset placeholder:text-ink-500 focus:outline-none transition-shadow'

function ringFor(error?: string) {
  return error
    ? 'ring-red-500/55 focus:ring-2 focus:ring-red-500/60'
    : 'ring-brand-900/8 focus:ring-2 focus:ring-brand-500/50'
}

function FieldError({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <motion.p
      id={`${id}-error`}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-1.5 text-[0.78rem] font-medium text-red-600"
    >
      {error}
    </motion.p>
  )
}

interface FieldProps {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  error?: string
  autoComplete?: string
  inputMode?: 'text' | 'tel' | 'email' | 'numeric'
}

export function Field({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
  required,
  error,
  autoComplete,
  inputMode,
}: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[0.82rem] font-semibold text-ink-700">
        {label}
        {required && <span className="ml-0.5 text-accent-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        inputMode={inputMode}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(INPUT_BASE, ringFor(error), 'h-12 rounded-full px-4')}
      />
      <FieldError id={name} error={error} />
    </div>
  )
}

interface TextAreaProps {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
  required?: boolean
  error?: string
}

export function TextArea({
  label,
  name,
  value,
  onChange,
  placeholder,
  rows = 4,
  required,
  error,
}: TextAreaProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[0.82rem] font-semibold text-ink-700">
        {label}
        {required && <span className="ml-0.5 text-accent-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(INPUT_BASE, ringFor(error), 'rounded-2xl px-4 py-3')}
      />
      <FieldError id={name} error={error} />
    </div>
  )
}

/* ------------------------------------------------------------ choice pills */

export function ChoiceRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: readonly string[]
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <p className="mb-2 text-[0.82rem] font-semibold text-ink-700">{label}</p>
      {/*
        `aria-pressed` rather than role=radio: a radiogroup owes the user arrow-key
        navigation between options, and promising the role without the keyboard
        behaviour is worse than a row of honest toggle buttons.
      */}
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-pressed={value === o}
            className="relative rounded-full px-4 py-2 text-[0.82rem] font-semibold transition-colors duration-300"
          >
            {/*
              The pill is a plain absolute layer and the label is `relative`, so
              paint order alone puts the text on top. A negative z-index would
              drop the pill behind the nearest stacking context's background —
              which, inside a plain <form>, means it disappears entirely.
            */}
            {value === o ? (
              <motion.span
                layoutId={`choice-${label}`}
                className="absolute inset-0 rounded-full bg-brand-900"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            ) : (
              <span className="absolute inset-0 rounded-full ring-1 ring-inset ring-brand-900/12" />
            )}
            <span className={cn('relative', value === o ? 'text-cream-100' : 'text-ink-600')}>{o}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/** Multi-select version — same pills, independent on/off state. */
export function MultiChoiceRow({
  label,
  options,
  selected,
  onToggle,
  required,
  error,
}: {
  label: string
  options: readonly { id: string; label: string }[]
  selected: string[]
  onToggle: (id: string) => void
  required?: boolean
  error?: string
}) {
  return (
    <div>
      <p className="mb-2 text-[0.82rem] font-semibold text-ink-700">
        {label}
        {required && <span className="ml-0.5 text-accent-500">*</span>}
      </p>
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => {
          const on = selected.includes(o.id)
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onToggle(o.id)}
              aria-pressed={on}
              className={cn(
                'rounded-full px-4 py-2 text-[0.82rem] font-semibold ring-1 ring-inset transition-all duration-300',
                on
                  ? 'bg-brand-900 text-cream-100 ring-brand-900'
                  : 'bg-transparent text-ink-600 ring-brand-900/12 hover:ring-brand-900/40',
              )}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <FieldError id={`multi-${label}`} error={error} />
    </div>
  )
}
