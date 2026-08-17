import { motion } from 'motion/react'
import { useState } from 'react'
import { ArrowRight, Building2, Check, FileText, Users, CalendarClock } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { FinalCta } from '@/components/home/Proof'
import { Section, Eyebrow, Chip } from '@/components/ui/primitives'
import { TextReveal, FadeText } from '@/components/ui/TextReveal'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { Counter } from '@/components/ui/Counter'
import { ChoiceRow, Field, TextArea } from '@/components/ui/Form'
import { emailRule, phoneRule, required, useFields } from '@/lib/form'
import { popIn, fadeUp, EASE } from '@/lib/motion'
import { naira } from '@/lib/utils'
import { bold, composeMessage, labelled, normalisePhone, openWhatsApp } from '@/lib/whatsapp'

const BENEFITS = [
  {
    icon: CalendarClock,
    title: 'One standing weekly list',
    body: 'Set it once. Every Thursday your shopper runs it, and only messages you if something needs a decision.',
  },
  {
    icon: FileText,
    title: 'One invoice, properly itemised',
    body: 'Monthly statement your finance team will actually accept — every item, every trader receipt, our fee listed separately.',
  },
  {
    icon: Users,
    title: 'A named shopper for your building',
    body: 'The same person every week. They learn your brands, your reception desk, and the security protocol at your gate.',
  },
  {
    icon: Building2,
    title: 'Multi-site delivery',
    body: 'Branches across Ibadan? One list, several drop-offs, one bill. Common for banks and clinics on our books.',
  },
]

const USE_CASES = [
  { title: 'Office kitchens', body: 'Tea, coffee, Milo, milk, sugar, water, noodles, snacks — restocked before anybody notices it ran out.' },
  { title: 'Staff welfare packages', body: 'End-of-month food packs for staff. Tell us the budget per head and the number of hampers.' },
  { title: 'Client & event catering', body: 'Raw ingredients for an in-house cook, or a full party list for a company event.' },
  { title: 'Guest houses & serviced flats', body: 'Turnover restocks between guests, run to a fixed checklist and a fixed budget.' },
  { title: 'Clinics & schools', body: 'Canteen supplies and cleaning consumables on a recurring schedule with proper documentation.' },
  { title: 'Restaurants & food vendors', body: 'Daily or twice-weekly bulk produce runs. Priced individually above ₦500,000 a month.' },
]

export default function ForOffices() {
  return (
    <>
      <PageHeader
        eyebrow="Ojàmi for teams"
        title={'Give your admin team\ntheir *Fridays back*.'}
        lead="Somebody in your office is currently spending half a work day in Bodija buying tea bags and bottled water. That is an expensive way to restock a kitchen. Hand it to us instead."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink to="#enquiry" variant="accent" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
            Request a proposal
          </ButtonLink>
          <ButtonLink to="/pricing" variant="outline" size="lg">
            See the office plan
          </ButtonLink>
        </div>
      </PageHeader>

      {/* ---------------------------------------------------- numbers ---- */}
      <section className="border-y border-brand-900/8 bg-cream-50 py-14">
        <div className="container-x">
          <RevealGroup className="grid grid-cols-2 gap-8 lg:grid-cols-4" gap={0.08}>
            {[
              { v: 140, s: '+', l: 'Ibadan offices on a standing list' },
              { v: 6, s: ' hrs', l: 'Admin time saved per office, per week' },
              { v: 8, s: '', l: 'Markets covered on one invoice' },
              { v: 98, s: '%', l: 'Office drops inside the lunch window' },
            ].map((s) => (
              <RevealItem key={s.l} variants={fadeUp} className="text-center lg:text-left">
                <p className="font-display text-[clamp(2rem,4.5vw,3rem)] font-extrabold leading-none tracking-[-0.05em] text-brand-900">
                  <Counter to={s.v} suffix={s.s} />
                </p>
                <p className="mt-2.5 text-[0.85rem] leading-snug text-ink-500">{s.l}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* --------------------------------------------------- benefits ---- */}
      <Section tone="cream" className="grain">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-[7.5rem] lg:h-fit">
              <Eyebrow>What you get</Eyebrow>
              <TextReveal
                as="h2"
                text={'Built for the person\nwho *has to sign off*.'}
                className="mt-4 text-h1 font-extrabold text-brand-950"
              />
              <FadeText className="mt-6 text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
                Office procurement fails on documentation, not on shopping. So every run comes back with the
                paperwork your finance team needs and none of the arguments they usually have.
              </FadeText>

              <div className="mt-8">
                <Img
                  photo="officeManSuit3"
                  alt="An office manager in Ibadan reviewing a delivery"
                  w={860}
                  h={640}
                  parallax={5}
                  rounded="rounded-3xl"
                  className="aspect-[4/3]"
                />
              </div>
            </div>

            <RevealGroup className="space-y-3" gap={0.08}>
              {BENEFITS.map((b) => (
                <RevealItem key={b.title} variants={popIn}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className="group flex gap-5 rounded-3xl bg-cream-50 p-6 ring-1 ring-inset ring-brand-900/8 transition-shadow duration-500 hover:shadow-lift"
                  >
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-900 text-cream-100 transition-all duration-400 group-hover:rotate-6 group-hover:bg-accent-500">
                      <b.icon className="h-[1.2rem] w-[1.2rem]" strokeWidth={1.8} />
                    </span>
                    <div>
                      <h3 className="font-display text-[1.15rem] font-bold tracking-[-0.03em] text-brand-950">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-600">{b.body}</p>
                    </div>
                  </motion.div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      {/* -------------------------------------------------- use cases ---- */}
      <Section tone="dark" className="grain">
        <div className="container-x">
          <div className="mb-12 max-w-2xl">
            <Eyebrow className="!text-accent-400">Who uses this</Eyebrow>
            <TextReveal
              as="h2"
              text={'Not just *office kitchens*.'}
              className="mt-4 text-h1 font-extrabold text-cream-100"
            />
          </div>

          <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
            {USE_CASES.map((u) => (
              <RevealItem key={u.title} variants={popIn}>
                <div className="group h-full rounded-3xl bg-cream-100/5 p-6 ring-1 ring-inset ring-cream-100/12 transition-colors duration-400 hover:bg-cream-100/9">
                  <h3 className="font-display text-[1.1rem] font-bold tracking-[-0.03em] text-cream-100">
                    {u.title}
                  </h3>
                  <p className="mt-2.5 text-[0.9rem] leading-relaxed text-cream-100/60">{u.body}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* --------------------------------------------------- enquiry ---- */}
      <EnquiryForm />

      <FinalCta />
    </>
  )
}

/* ------------------------------------------------------------------------ */

const SIZES = ['1 – 10 people', '11 – 30 people', '31 – 80 people', '80+ people']
const FREQ = ['Weekly', 'Twice a month', 'Monthly', 'Not sure yet']

function EnquiryForm() {
  const [sent, setSent] = useState(false)
  const [size, setSize] = useState(SIZES[1])
  const [freq, setFreq] = useState(FREQ[0])
  const form = useFields({ name: '', company: '', email: '', phone: '', area: '', notes: '' })

  const submit = () => {
    const valid = form.validate({
      name: required('We need a name to address the proposal to'),
      company: required('Which company is this for?'),
      email: emailRule(),
      phone: phoneRule(),
      area: required('Where in Ibadan is the office?'),
    })
    if (!valid) return

    const { values } = form
    openWhatsApp(
      composeMessage([
        bold('Office enquiry — proposal request'),
        [
          `${bold('Contact')}: ${values.name}`,
          `${bold('Company')}: ${values.company}`,
          `${bold('Email')}: ${values.email.trim()}`,
          `${bold('Phone')}: ${normalisePhone(values.phone)}`,
          `${bold('Office')}: ${values.area}`,
        ].join('\n'),
        [labelled('Team size', size), labelled('Frequency', freq)].filter(Boolean).join('\n'),
        values.notes.trim() && `${bold('Normally buys')}: ${values.notes.trim()}`,
        'Sent from the Ojàmi website — please send a proposal and a suggested standing list.',
      ]),
    )
    setSent(true)
  }

  return (
    <Section id="enquiry" tone="white" className="grain">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <Eyebrow>Talk to us</Eyebrow>
            <TextReveal
              as="h2"
              text={'Tell us about\nyour *office*.'}
              className="mt-4 text-h1 font-extrabold text-brand-950"
            />
            <FadeText className="mt-6 text-[1rem] leading-relaxed text-ink-600" delay={0.15}>
              We will come back within one working day with a proposal: a suggested standing list, a monthly
              figure, and the name of the shopper who would run it.
            </FadeText>

            <Reveal className="mt-9 space-y-3">
              {[
                'No setup fee and no minimum contract',
                'First run is free if you switch from another provider',
                'Cancel any month with two weeks’ notice',
              ].map((t) => (
                <p key={t} className="flex items-start gap-2.5 text-[0.92rem] text-ink-600">
                  <span className="mt-0.5 flex h-[1.15rem] w-[1.15rem] shrink-0 items-center justify-center rounded-full bg-brand-500/14 text-brand-600">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {t}
                </p>
              ))}
            </Reveal>

            <Reveal className="mt-8">
              <div className="rounded-3xl bg-brand-950 p-6 text-cream-100">
                <Chip tone="dark">Office plan</Chip>
                <p className="mt-4 font-display text-[2.4rem] font-extrabold leading-none tracking-[-0.05em]">
                  {naira(14000)}
                  <span className="ml-2 text-[0.9rem] font-normal text-cream-100/50">per month</span>
                </p>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-cream-100/60">
                  8 runs a month — that is {naira(1750)} a run — plus delivery. Larger operations are quoted
                  individually.
                </p>
              </div>
            </Reveal>
          </div>

          {/* form */}
          <Reveal>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                submit()
              }}
              className="rounded-[1.75rem] bg-cream-100 p-6 ring-1 ring-inset ring-brand-900/10 sm:p-8"
            >
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex flex-col items-center py-12 text-center"
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
                    Ready in WhatsApp
                  </h3>
                  <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-600">
                    Press send in the WhatsApp thread that just opened and we will come back within one
                    working day with a proposal and a suggested standing list for your office.
                  </p>
                  <Button
                    type="button"
                    onClick={() => {
                      form.reset()
                      setSent(false)
                    }}
                    variant="ghost"
                    size="sm"
                    className="mt-6"
                  >
                    Send another enquiry
                  </Button>
                </motion.div>
              ) : (
                <div className="space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Your name"
                      name="name"
                      placeholder="Adenike Ogunlana"
                      autoComplete="name"
                      required
                      value={form.values.name}
                      onChange={form.set('name')}
                      error={form.errors.name}
                    />
                    <Field
                      label="Company"
                      name="company"
                      placeholder="Acme Ltd"
                      autoComplete="organization"
                      required
                      value={form.values.company}
                      onChange={form.set('company')}
                      error={form.errors.company}
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Work email"
                      name="email"
                      type="email"
                      inputMode="email"
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                      value={form.values.email}
                      onChange={form.set('email')}
                      error={form.errors.email}
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
                  <Field
                    label="Office location in Ibadan"
                    name="area"
                    placeholder="Ring Road, Challenge…"
                    required
                    value={form.values.area}
                    onChange={form.set('area')}
                    error={form.errors.area}
                  />

                  <ChoiceRow label="How many people?" options={SIZES} value={size} onChange={setSize} />
                  <ChoiceRow label="How often?" options={FREQ} value={freq} onChange={setFreq} />

                  <TextArea
                    label="What do you normally buy?"
                    name="notes"
                    placeholder="Tea, coffee, Milo, milk, sugar, bottled water, noodles, cleaning supplies…"
                    value={form.values.notes}
                    onChange={form.set('notes')}
                  />

                  <Button type="submit" variant="accent" size="lg" full magnetic={false}>
                    Send enquiry on WhatsApp
                  </Button>
                  <p className="text-center text-[0.75rem] text-ink-400">
                    Opens WhatsApp with your enquiry ready to send. We reply within one working day.
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
