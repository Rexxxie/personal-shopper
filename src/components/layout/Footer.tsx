import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ArrowUpRight, Check, Mail, MapPin, Phone, Clock } from 'lucide-react'
import { BRAND, ZONES } from '@/data/brand'
import { CATEGORIES } from '@/data/catalog'
import { EASE, viewport } from '@/lib/motion'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { LogoMark } from './Logo'
import { cn } from '@/lib/utils'

const COLUMNS = [
  {
    title: 'Service',
    links: [
      { label: 'How it works', to: '/how-it-works' },
      { label: 'Browse the market', to: '/shop' },
      { label: 'Pricing & plans', to: '/pricing' },
      { label: 'For offices & teams', to: '/for-offices' },
      { label: 'Track an order', to: '/track' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Ojàmi', to: '/about' },
      { label: 'Become a shopper', to: '/become-a-shopper' },
      { label: 'Contact us', to: '/contact' },
      { label: 'FAQs', to: '/how-it-works#faq' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-brand-950 text-cream-100">
      {/* ambient wash */}
      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="animate-blob absolute -left-[10%] top-[-20%] h-[30rem] w-[30rem] rounded-full bg-brand-500/18 blur-[120px]" />
        <div
          className="animate-blob absolute -right-[8%] bottom-[-25%] h-[26rem] w-[26rem] rounded-full bg-accent-500/14 blur-[120px]"
          style={{ animationDelay: '-10s' }}
        />
      </div>

      <div className="container-x relative">
        {/* ---------------------------------------------------- top ---- */}
        <div className="grid gap-14 border-b border-cream-100/10 py-16 lg:grid-cols-[1.15fr_1fr] lg:gap-20 lg:py-20">
          <Reveal>
            <div className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="font-display text-2xl font-extrabold tracking-[-0.045em]">{BRAND.name}</span>
            </div>
            <p className="mt-6 max-w-md text-[1.05rem] leading-relaxed text-cream-100/65">
              We send a trusted human being to the market so you don’t have to go yourself. Bodija, Oje,
              Aleshinloye and every market that matters in Ibadan — priced honestly, delivered the same day.
            </p>

            <div className="mt-8 space-y-3 text-[0.92rem]">
              <FooterContact icon={<Phone className="h-4 w-4" />} href={BRAND.phoneHref} text={BRAND.phone} />
              <FooterContact icon={<Mail className="h-4 w-4" />} href={`mailto:${BRAND.email}`} text={BRAND.email} />
              <FooterContact icon={<MapPin className="h-4 w-4" />} text={`${BRAND.address}, ${BRAND.state}`} />
              <FooterContact icon={<Clock className="h-4 w-4" />} text={BRAND.hours} />
            </div>

            <div className="mt-8 flex gap-2.5">
              {(['instagram', 'twitter', 'tiktok', 'facebook'] as const).map((k) => (
                <a
                  key={k}
                  href={BRAND.social[k]}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-inset ring-cream-100/15 transition-all duration-300 hover:bg-cream-100 hover:text-brand-950"
                  aria-label={k}
                >
                  <SocialIcon name={k} />
                </a>
              ))}
            </div>
          </Reveal>

          <div className="grid gap-10 sm:grid-cols-2">
            {COLUMNS.map((col) => (
              <RevealGroup key={col.title}>
                <RevealItem>
                  <h4 className="eyebrow text-cream-100/40">{col.title}</h4>
                </RevealItem>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <RevealItem key={l.to} as="li">
                      <Link
                        to={l.to}
                        className="group inline-flex items-center gap-1 text-[0.94rem] text-cream-100/70 transition-colors hover:text-cream-100"
                      >
                        <span className="relative">
                          {l.label}
                          <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-400 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
                        </span>
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-60" />
                      </Link>
                    </RevealItem>
                  ))}
                </ul>
              </RevealGroup>
            ))}

            <div className="sm:col-span-2">
              <Newsletter />
            </div>
          </div>
        </div>

        {/* ---------------------------------------------- categories ---- */}
        <div className="border-b border-cream-100/10 py-10">
          <h4 className="eyebrow mb-5 text-cream-100/40">What we shop for</h4>
          <RevealGroup className="flex flex-wrap gap-2" gap={0.03}>
            {CATEGORIES.map((c) => (
              <RevealItem key={c.id}>
                <Link
                  to={`/shop?c=${c.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.8rem] font-medium text-cream-100/60 ring-1 ring-inset ring-cream-100/12 transition-all duration-300 hover:bg-cream-100/8 hover:text-cream-100"
                >
                  <span aria-hidden>{c.emoji}</span>
                  {c.short}
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* --------------------------------------------------- zones ---- */}
        <div className="border-b border-cream-100/10 py-10">
          <h4 className="eyebrow mb-5 text-cream-100/40">Delivering across Ibadan</h4>
          <p className="flex flex-wrap gap-x-1.5 gap-y-2 text-[0.85rem] text-cream-100/45">
            {ZONES.map((z, i) => (
              <span key={z.name}>
                <span className="transition-colors hover:text-cream-100/85">{z.name}</span>
                {i < ZONES.length - 1 && <span className="ml-1.5 text-cream-100/20">·</span>}
              </span>
            ))}
          </p>
        </div>

        {/* ------------------------------------------------ wordmark ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 1, ease: EASE }}
          className="pointer-events-none select-none pt-14"
          aria-hidden
        >
          <span className="block bg-gradient-to-b from-cream-100/16 to-cream-100/[0.02] bg-clip-text text-center font-display text-[clamp(4rem,20vw,16rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-transparent">
            {BRAND.name}
          </span>
        </motion.div>

        {/* -------------------------------------------------- bottom ---- */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-cream-100/10 py-7 text-[0.78rem] text-cream-100/40 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {BRAND.name}. Built in {BRAND.city}, {BRAND.country}.
          </p>
          <div className="flex gap-5">
            <Link to="/terms" className="transition-colors hover:text-cream-100/80">
              Terms
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-cream-100/80">
              Privacy
            </Link>
            <Link to="/become-a-shopper" className="transition-colors hover:text-cream-100/80">
              Work with us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ------------------------------------------------------------------------ */

function FooterContact({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const inner = (
    <>
      <span className="text-accent-400">{icon}</span>
      <span>{text}</span>
    </>
  )
  const cls = 'flex items-center gap-3 text-cream-100/65 transition-colors'
  return href ? (
    <a href={href} className={cn(cls, 'hover:text-cream-100')}>
      {inner}
    </a>
  ) : (
    <p className={cls}>{inner}</p>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  return (
    <Reveal className="rounded-3xl bg-cream-100/6 p-6 ring-1 ring-inset ring-cream-100/10">
      <h4 className="font-display text-lg font-bold">Market prices, every Monday</h4>
      <p className="mt-2 text-[0.88rem] leading-relaxed text-cream-100/60">
        What a paint of rice, a basket of tomatoes and a tuber of yam actually cost this week in Ibadan. Free,
        and useful even if you never order from us.
      </p>

      <form
        className="mt-5 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!email.trim()) return
          setSent(true)
          setEmail('')
        }}
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@work.com"
          aria-label="Your email address"
          className="h-12 min-w-0 flex-1 rounded-full bg-cream-100/8 px-5 text-[0.9rem] text-cream-100 placeholder:text-cream-100/35 ring-1 ring-inset ring-cream-100/12 transition-shadow focus:outline-none focus:ring-2 focus:ring-accent-400"
        />
        <Button type="submit" variant="accent" size="md" magnetic={false} className="shrink-0 !px-5">
          {sent ? <Check className="h-4 w-4" /> : 'Join'}
        </Button>
      </form>

      {sent && (
        <motion.p
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-[0.8rem] text-brand-300"
        >
          You’re in. First price list lands Monday morning.
        </motion.p>
      )}
    </Reveal>
  )
}

function SocialIcon({ name }: { name: 'instagram' | 'twitter' | 'tiktok' | 'facebook' }) {
  const c = 'h-[1.05rem] w-[1.05rem]'
  switch (name) {
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="currentColor">
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.86s0 3.6-.07 4.86c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.86.07s-3.6 0-4.86-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.86c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.46 2.2 8.84 2.2 12 2.2zm0 1.98c-3.14 0-3.51.01-4.75.07-1.15.05-1.77.24-2.18.4-.55.22-.94.47-1.35.88-.41.41-.66.8-.88 1.35-.16.41-.35 1.03-.4 2.18-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.05 1.15.24 1.77.4 2.18.22.55.47.94.88 1.35.41.41.8.66 1.35.88.41.16 1.03.35 2.18.4 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c1.15-.05 1.77-.24 2.18-.4.55-.22.94-.47 1.35-.88.41-.41.66-.8.88-1.35.16-.41.35-1.03.4-2.18.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.05-1.15-.24-1.77-.4-2.18a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.18-.4-1.24-.06-1.61-.07-4.75-.07zm0 3.37a5.45 5.45 0 1 1 0 10.9 5.45 5.45 0 0 1 0-10.9zm0 8.99a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08zm6.94-9.2a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0z" />
        </svg>
      )
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="currentColor">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.81-5.96 6.81H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="currentColor">
          <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 1 1 .77-5.06V9.7a5.67 5.67 0 0 0-.77-.05A5.66 5.66 0 1 0 15.54 15.3V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3a4.29 4.29 0 0 1-3.24-1.48z" />
        </svg>
      )
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" className={c} fill="currentColor">
          <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.52 1.5-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.45 2.9h-2.33V22c4.78-.76 8.44-4.92 8.44-9.94z" />
        </svg>
      )
  }
}
