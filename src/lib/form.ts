import { useCallback, useRef, useState } from 'react'
import { isEmail, isPhone } from '@/lib/whatsapp'

/* ============================================================================
   FORM STATE + VALIDATION
   Deliberately not in the components file: keeping the hook and the rules out
   of a module that exports components is what lets Vite hot-replace the inputs
   without tearing down every form's state.
   ========================================================================== */

type Rules<T> = Partial<Record<keyof T, (value: string, all: T) => string | null>>

/**
 * Minimal controlled-form state: values, per-field errors, and a validate pass
 * that also focuses the first offending field. Not a form library — just enough
 * that four forms don't each reinvent it.
 */
export function useFields<T extends Record<string, string>>(initial: T) {
  const initialRef = useRef(initial)
  const [values, setValues] = useState<T>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({})

  const set = useCallback(
    (key: keyof T) => (v: string) => {
      setValues((prev) => ({ ...prev, [key]: v }))
      // Clear the error as soon as they start fixing it, not on the next submit.
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
    },
    [],
  )

  const validate = useCallback(
    (rules: Rules<T>) => {
      const found: Partial<Record<keyof T, string>> = {}
      for (const key of Object.keys(rules) as (keyof T)[]) {
        const message = rules[key]?.(values[key] ?? '', values)
        if (message) found[key] = message
      }
      setErrors(found)

      // Fields are rendered with id={name}, so the key is the element id.
      const first = (Object.keys(found) as (keyof T)[])[0]
      if (first) {
        const el = document.getElementById(String(first))
        el?.focus()
        el?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
      return first === undefined
    },
    [values],
  )

  const reset = useCallback(() => {
    setValues(initialRef.current)
    setErrors({})
  }, [])

  return { values, set, errors, validate, reset }
}

/* ------------------------------------------------------------------- rules */

export const required =
  (message = 'This one is needed') =>
  (v: string) =>
    v.trim() ? null : message

export const phoneRule =
  (message = 'Enter a valid Nigerian number, e.g. 0801 234 5678') =>
  (v: string) =>
    isPhone(v) ? null : message

export const emailRule =
  (message = 'That email address does not look right') =>
  (v: string) =>
    isEmail(v) ? null : message

/** For fields that are optional but must be well-formed when filled in. */
export const optional =
  (rule: (v: string) => string | null) =>
  (v: string) =>
    v.trim() ? rule(v) : null
