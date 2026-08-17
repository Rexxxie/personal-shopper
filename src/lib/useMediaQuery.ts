import { useEffect, useState } from 'react'

/**
 * Subscribe to a media query.
 *
 * Starts `false` on the first render so the server/first paint never assumes a
 * desktop layout — callers should treat `false` as "small screen / no fancy
 * effects", which is the safe default.
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)

    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

/** Tailwind's `lg` breakpoint. */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
