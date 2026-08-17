import { motion } from 'motion/react'
import { Fragment, type ReactNode } from 'react'
import { EASE, viewport } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface TextRevealProps {
  /**
   * The headline. `\n` forces a line break; anything wrapped in *asterisks*
   * gets the brand gradient — including multi-word phrases like
   * `*market price*`.
   */
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  once?: boolean
}

interface Token {
  word: string
  highlight: boolean
}

/**
 * Split a line into words while tracking which of them fall inside a *…* span.
 * Parsed at the phrase level rather than word-by-word so `*market price*`
 * highlights both words instead of leaving stray asterisks on screen.
 */
function tokenize(line: string): Token[] {
  const tokens: Token[] = []
  let current: Token | null = null
  let inMark = false

  // Walk character by character rather than splitting on '*' first — that way
  // a closing mark placed before punctuation (`*market price*.`) keeps the
  // trailing full stop attached to its word instead of orphaning it.
  for (const ch of line) {
    if (ch === '*') {
      inMark = !inMark
      continue
    }
    if (ch === ' ') {
      if (current) tokens.push(current)
      current = null
      continue
    }
    // A word takes the highlight of its first character.
    if (!current) current = { word: '', highlight: inMark }
    current.word += ch
  }
  if (current) tokens.push(current)

  return tokens
}

/**
 * Headline that reveals word-by-word from behind a mask.
 * Each word sits in an overflow-hidden span and slides up — the classic
 * editorial reveal, and the single highest-impact animation on the site.
 */
export function TextReveal({
  text,
  className,
  delay = 0,
  stagger = 0.055,
  as = 'h2',
  once = true,
}: TextRevealProps) {
  const Tag = motion[as]
  const lines = text.split('\n')

  return (
    <Tag
      // Block, not inline-block: the per-word spans inside handle the masking,
      // and an inline-block root would share a line box with a preceding
      // <Eyebrow> instead of starting on its own line.
      className={cn('block', className)}
      initial="hidden"
      whileInView="show"
      viewport={once ? viewport : { ...viewport, once: false }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      // The visual version is split into per-word spans, so give screen
      // readers the clean sentence instead.
      aria-label={text.replace(/\*/g, '').replace(/\n/g, ' ')}
    >
      {lines.map((line, li) => {
        const tokens = tokenize(line)
        return (
          <Fragment key={li}>
            {li > 0 && <br />}
            {tokens.map((token, wi) => (
              <span
                key={`${li}-${wi}`}
                // overflow-hidden is the mask each word slides up from; the
                // padding / negative-margin pair keeps descenders from clipping.
                className="inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]"
                aria-hidden
              >
                <motion.span
                  className={cn('inline-block', token.highlight && 'gradient-text')}
                  variants={{
                    hidden: { y: '108%', opacity: 0 },
                    show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
                  }}
                >
                  {token.word}
                  {wi < tokens.length - 1 && ' '}
                </motion.span>
              </span>
            ))}
          </Fragment>
        )
      })}
    </Tag>
  )
}

/** Lighter variant: fades a paragraph in without the per-word mask machinery. */
export function FadeText({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.p
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.p>
  )
}
