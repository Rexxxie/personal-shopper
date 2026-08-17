import type { ReactNode } from 'react'
import { Eyebrow, Blobs } from './primitives'
import { TextReveal, FadeText } from './TextReveal'
import { Reveal } from './Reveal'

interface PageHeaderProps {
  eyebrow: string
  /** Wrap words in *asterisks* to give them the brand gradient. */
  title: string
  lead?: string
  children?: ReactNode
  tone?: 'brand' | 'accent' | 'mixed'
}

export function PageHeader({ eyebrow, title, lead, children, tone = 'mixed' }: PageHeaderProps) {
  return (
    <header className="grain relative overflow-hidden pb-14 pt-[8.5rem] sm:pb-16 sm:pt-[10rem]">
      <Blobs tone={tone} className="opacity-70" />
      <div className="container-x">
        <Eyebrow>{eyebrow}</Eyebrow>
        <TextReveal as="h1" text={title} className="mt-4 text-h1 font-extrabold text-brand-950" />
        {lead && (
          <FadeText className="mt-6 max-w-2xl text-[1.05rem] leading-relaxed text-ink-600 sm:text-[1.15rem]" delay={0.12}>
            {lead}
          </FadeText>
        )}
        {children && (
          <Reveal className="mt-9" delay={0.2}>
            {children}
          </Reveal>
        )}
      </div>
    </header>
  )
}
