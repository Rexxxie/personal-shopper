import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowRight, Check, Banknote, Clock3, GraduationCap, HeartHandshake } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section, Eyebrow, Chip } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { Counter } from '@/components/ui/Counter'
import { ChoiceRow, Field, MultiChoiceRow, TextArea } from '@/components/ui/Form'
import { emailRule, optional, phoneRule, required, useFields } from '@/lib/form'
import { MARKETS } from '@/data/markets'
import { popIn, fadeUp, EASE } from '@/lib/motion'
import { naira } from '@/lib/utils'
import { bold, composeMessage, labelled, normalisePhone, openWhatsApp } from '@/lib/whatsapp'

const PERKS = [
  {
    icon: Banknote,
    title: 'Paid per run, weekly',
    body: 'Between ₦1,800 and ₦4,500 per completed run depending on size and distance. Paid into your account every Friday, no delays.',
  },
  {
    icon: Clock3,
    title: 'Choose your own days',
    body: 'Take the runs that fit your week. Many of our shoppers do mornings only and are done by 11am.',
  },
  {
    icon: GraduationCap,
    title: 'We train you properly',
    body: 'Two days on how we price, how we photograph, how we talk to customers, and how to spot bad produce.',
  },
  {
    icon: HeartHandshake,
    title: 'Tips go straight to you',
    body: 'Customers tip often, especially on the office plan. Every naira of it is yours — we never take a cut.',
  },
]

const REQUIREMENTS = [
  'You live in Ibadan and know at least two of our markets well',
  'Valid NIN and a bank account in your own name',
  'A smartphone that can take clear photos and use WhatsApp',
  'One guarantor we can actually reach by phone',
  'You can read and write well enough to handle a written list',
  'You are patient with people — this is a customer service job as much as a shopping one',
]

const STEPS = [
  { n: '01', t: 'Apply below', b: 'Five minutes. Tell us where you live and which markets you know.' },
  { n: '02', t: 'Short interview', b: 'A phone call, then a meeting at our Bodija office. Bring your NIN.' },
  { n: '03', t: 'Verification', b: 'We confirm your ID, address and guarantor. Usually takes 3–5 days.' },
  { n: '04', t: 'Training & first run', b: 'Two days of training, then you shadow a senior shopper on a real run.' },
]

export default function BecomeShopper() {
  return (
    <>
      <PageHeader
        eyebrow="Work with us"
        title={'Know the market?\nTurn that into *income*.'}
        lead="If you know which stall in Bodija sells the good yam and you can haggle without raising your voice, you already have the skill we hire for. We handle the customers, the payments and the training — you handle the market."
        tone="accent"
      >
        <ButtonLink to="#apply" variant="accent" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
          Apply to be a shopper
        </ButtonLink>
      </PageHeader>

      {/* ----------------------------------------------------- income ---- */}
      <section className="border-y border-brand-900/8 bg-cream-50 py-14">
        <div className="container-x">
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4" gap={0.08}>
            {[
              { p: '₦', v: 4500, s: '', l: 'Top pay per single run' },
              { p: '₦', v: 118000, s: '', l: 'Average monthly earnings, part-time' },
              { p: '', v: 214, s: '', l: 'Active shoppers across Ibadan' },
              { p: '', v: 5, s: ' days', l: 'From applying to your first run' },
            ].map((s) => (
              <RevealItem key={s.l} variants={fadeUp} className="text-center lg:text-left">
                <p className="font-display text-[clamp(1.8rem,4vw,2.8rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-900">
                  <Counter to={s.v} prefix={s.p} suffix={s.s} />
                </p>
                <p className="mt-2.5 text-[0.85rem] leading-snug text-ink-500">{s.l}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ------------------------------------------------------ perks ---- */}
      <Section tone="cream" className="grain">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>Why shoppers stay</Eyebrow>
              <TextReveal
                as="h2"
                text={'Honest work,\npaid *on time*.'}
                className="mt-4 text-h1 font-extrabold text-brand-950"
              />
              <FadeText className="mt-6 text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
                Most of our shoppers came to us from market trading, okada, or teaching. What they say kept
                them is that the money arrives when we said it would.
              </FadeText>

              <RevealGroup className="mt-9 space-y-3" gap={0.07}>
                {PERKS.map((p) => (
                  <RevealItem key={p.title} variants={popIn}>
                    <motion.div
                      whileHover={{ y: -5 }}
                      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                      className="group flex gap-5 rounded-3xl bg-cream-50 p-6 ring-1 ring-inset ring-brand-900/8 transition-shadow duration-500 hover:shadow-lift"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-cream-100 transition-all duration-400 group-hover:rotate-6 group-hover:bg-accent-500">
                        <p.icon className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.8} />
                      </span>
                      <div>
                        <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.03em] text-brand-950">
                          {p.title}
                        </h3>
                        <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{p.body}</p>
                      </div>
                    </motion.div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="lg:sticky lg:top-[7.5rem] lg:h-fit">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-3">
                  <Img photo="vendorSmiling" alt="An Ojàmi shopper at a market stall" w={520} h={680} parallax={5} rounded="rounded-[1.5rem]" className="aspect-[4/5]" />
                  <Img photo="carryingOnHead" alt="A shopper carrying goods from the market" w={520} h={520} parallax={4} rounded="rounded-[1.5rem]" className="aspect-square" />
                </div>
                <div className="space-y-3 pt-10">
                  <Img photo="personWomanWrap" alt="Portrait of an Ojàmi shopper" w={520} h={520} parallax={6} rounded="rounded-[1.5rem]" className="aspect-square" />
                  <Img photo="vendorWeighing" alt="A shopper weighing produce before buying" w={520} h={680} parallax={5} rounded="rounded-[1.5rem]" className="aspect-[4/5]" />
                </div>
              </div>

              <Reveal className="mt-6">
                <div className="rounded-3xl bg-brand-950 p-6 text-cream-100">
                  <Chip tone="dark">Typical week</Chip>
                  <div className="mt-4 space-y-2.5 text-[0.9rem]">
                    {[
                      ['12 runs completed', naira(31200)],
                      ['Tips from customers', naira(4800)],
                      ['Transport reimbursed', naira(6000)],
                    ].map(([l, v]) => (
                      <div key={l} className="flex justify-between text-cream-100/65">
                        <span>{l}</span>
                        <span className="font-semibold tabular-nums text-cream-100">{v}</span>
                      </div>
                    ))}
                    <div className="flex items-baseline justify-between border-t border-cream-100/12 pt-3">
                      <span className="font-display font-bold">Paid that Friday</span>
                      <span className="font-display text-[1.4rem] font-extrabold tabular-nums">
                        {naira(42000)}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------------ steps ---- */}
      <Section tone="dark" className="grain">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="!text-accent-400">Getting started</Eyebrow>
            <TextReveal
              as="h2"
              text={'From applying to your\nfirst run in *five days*.'}
              className="mt-4 text-h1 font-extrabold text-cream-100"
            />
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            {STEPS.map((s) => (
              <RevealItem key={s.n} variants={popIn}>
                <div className="h-full rounded-3xl bg-cream-100/5 p-6 ring-1 ring-inset ring-cream-100/12">
                  <span className="font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.05em] text-accent-500">
                    {s.n}
                  </span>
                  <h3 className="mt-4 font-display text-[1.1rem] font-bold text-cream-100">{s.t}</h3>
                  <p className="mt-2 text-[0.88rem] leading-relaxed text-cream-100/60">{s.b}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <div className="rounded-3xl bg-cream-100/5 p-7 ring-1 ring-inset ring-cream-100/12 sm:p-9">
              <h3 className="font-display text-h3 font-bold text-cream-100">What we need from you</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {REQUIREMENTS.map((r) => (
                  <li key={r} className="flex items-start gap-2.5 text-[0.92rem] text-cream-100/70">
                    <span className="mt-0.5 flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center rounded-full bg-accent-500/22 text-accent-300">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <ApplicationForm />
    </>
  )
}

/* ------------------------------------------------------------------------ */

const AVAILABILITY = ['Mornings only', 'Full days', 'Weekends only', 'Flexible']

function ApplicationForm() {
  const [sent, setSent] = useState(false)
  const [avail, setAvail] = useState(AVAILABILITY[0])
  const [markets, setMarkets] = useState<string[]>([])
  const [marketsError, setMarketsError] = useState<string>()
  const form = useFields({ name: '', phone: '', email: '', area: '', about: '' })

  const toggleMarket = (id: string) => {
    setMarketsError(undefined)
    setMarkets((m) => (m.includes(id) ? m.filter((x) => x !== id) : [...m, id]))
  }

  const submit = () => {
    // Market knowledge is the whole job, so it is not an optional answer.
    const marketsOk = markets.length > 0
    setMarketsError(marketsOk ? undefined : 'Pick at least one market you know well')

    const valid = form.validate({
      name: required('We need your full name'),
      phone: phoneRule(),
      email: optional(emailRule()),
      area: required('Tell us where you live'),
    })
    if (!valid || !marketsOk) return

    const { values } = form
    const named = MARKETS.filter((m) => markets.includes(m.id)).map((m) =>
      m.name.replace(' Market', ''),
    )

    openWhatsApp(
      composeMessage([
        bold('Shopper application'),
        [
          `${bold('Name')}: ${values.name}`,
          `${bold('Phone')}: ${normalisePhone(values.phone)}`,
          labelled('Email', values.email.trim()),
          `${bold('Lives in')}: ${values.area}`,
        ]
          .filter(Boolean)
          .join('\n'),
        [`${bold('Knows these markets')}: ${named.join(', ')}`, `${bold('Availability')}: ${avail}`].join(
          '\n',
        ),
        values.about.trim() && `${bold('About them')}: ${values.about.trim()}`,
        'Sent from the Ojàmi website — applying to become a shopper.',
      ]),
    )
    setSent(true)
  }

  return (
    <Section id="apply" tone="white" className="grain">
      <div className="container-x">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <Eyebrow>Application</Eyebrow>
            <TextReveal
              as="h2"
              text={'Apply to become an\nOjàmi *shopper*.'}
              className="mt-4 text-h1 font-extrabold text-brand-950"
            />
            <FadeText className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-ink-600" delay={0.12}>
              Takes about five minutes. If it looks like a fit, we will call you within two working days.
            </FadeText>
          </div>

          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="rounded-[1.75rem] bg-cream-100 p-6 ring-1 ring-inset ring-brand-900/10 sm:p-9"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col items-center py-14 text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white"
                  >
                    <Check className="h-8 w-8" strokeWidth={2.5} />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-bold text-brand-950">
                    One more step in WhatsApp
                  </h3>
                  <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink-600">
                    Press send on the WhatsApp message that just opened. If your application looks like a fit
                    we will call you within two working days to arrange a short interview at our Bodija
                    office.
                  </p>
                  <Button
                    type="button"
                    onClick={() => {
                      form.reset()
                      setMarkets([])
                      setSent(false)
                    }}
                    variant="ghost"
                    size="sm"
                    className="mt-6"
                  >
                    Submit another application
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Full name"
                      name="name"
                      placeholder="Bisi Adekunle"
                      autoComplete="name"
                      required
                      value={form.values.name}
                      onChange={form.set('name')}
                      error={form.errors.name}
                    />
                    <Field
                      label="Phone / WhatsApp"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      placeholder="0801 234 5678"
                      autoComplete="tel"
                      required
                      value={form.values.phone}
                      onChange={form.set('phone')}
                      error={form.errors.phone}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Email (optional)"
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="you@email.com"
                      autoComplete="email"
                      value={form.values.email}
                      onChange={form.set('email')}
                      error={form.errors.email}
                    />
                    <Field
                      label="Where do you live?"
                      name="area"
                      placeholder="Agbowo, Sango, Akobo…"
                      required
                      value={form.values.area}
                      onChange={form.set('area')}
                      error={form.errors.area}
                    />
                  </div>

                  <MultiChoiceRow
                    label="Which markets do you know well?"
                    required
                    options={MARKETS.map((m) => ({ id: m.id, label: m.name.replace(' Market', '') }))}
                    selected={markets}
                    onToggle={toggleMarket}
                    error={marketsError}
                  />

                  <ChoiceRow label="When can you work?" options={AVAILABILITY} value={avail} onChange={setAvail} />

                  <TextArea
                    label="Tell us a bit about yourself"
                    name="about"
                    placeholder="What do you do now? Have you traded or shopped for other people before?"
                    value={form.values.about}
                    onChange={form.set('about')}
                  />

                  <Button type="submit" variant="accent" size="lg" full magnetic={false}>
                    Send application on WhatsApp
                  </Button>
                  <p className="text-center text-[0.75rem] leading-relaxed text-ink-400">
                    We verify NIN, address and a guarantor before anyone starts. Your details stay with us and
                    are never shared.
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </Section>
  )
}
