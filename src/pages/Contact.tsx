import { motion } from 'motion/react'
import { useState } from 'react'
import { Check, Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/primitives'
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal'
import { Button } from '@/components/ui/Button'
import { Img } from '@/components/ui/Img'
import { ChoiceRow, Field, TextArea } from '@/components/ui/Form'
import { emailRule, optional, phoneRule, required, useFields } from '@/lib/form'
import { BRAND } from '@/data/brand'
import { popIn, EASE } from '@/lib/motion'
import { bold, composeMessage, labelled, normalisePhone, openWhatsApp } from '@/lib/whatsapp'

const CHANNELS = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: 'Fastest — usually under 5 minutes',
    href: `https://wa.me/${BRAND.whatsapp}`,
    accent: true,
  },
  { icon: Phone, label: 'Call us', value: BRAND.phone, href: BRAND.phoneHref },
  { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: MapPin, label: 'Office', value: `${BRAND.address}, ${BRAND.state}` },
  { icon: Clock, label: 'Open', value: BRAND.hours },
]

export default function Contact() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title={'A real person in Ibadan\nwill *answer you*.'}
        lead="No ticket system, no bot that misunderstands you. WhatsApp is the fastest way to reach us, and there is almost always somebody on it during market hours."
      />

      <Section tone="cream" className="grain !pt-4">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            {/* channels */}
            <div>
              <RevealGroup className="space-y-2.5" gap={0.07}>
                {CHANNELS.map((c) => {
                  const Inner = (
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                      className={`group flex items-center gap-4 rounded-2xl p-5 ring-1 ring-inset transition-shadow duration-400 ${
                        c.accent
                          ? 'bg-[#25D366]/10 ring-[#25D366]/25 hover:shadow-soft'
                          : 'bg-cream-50 ring-brand-900/8 hover:shadow-soft'
                      }`}
                    >
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform duration-400 group-hover:rotate-6 ${
                          c.accent ? 'bg-[#25D366] text-white' : 'bg-brand-900 text-cream-100'
                        }`}
                      >
                        <c.icon className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.88rem] font-bold text-brand-950">{c.label}</p>
                        <p className="truncate text-[0.82rem] text-ink-500">{c.value}</p>
                      </div>
                    </motion.div>
                  )

                  return (
                    <RevealItem key={c.label} variants={popIn}>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith('http') ? '_blank' : undefined}
                          rel={c.href.startsWith('http') ? 'noreferrer noopener' : undefined}
                          className="block"
                        >
                          {Inner}
                        </a>
                      ) : (
                        Inner
                      )}
                    </RevealItem>
                  )
                })}
              </RevealGroup>

              <Reveal className="mt-6">
                <Img
                  photo="marketStallProduce"
                  alt="A market stall in Ibadan"
                  w={760}
                  h={560}
                  parallax={5}
                  rounded="rounded-3xl"
                  className="aspect-[4/3]"
                />
              </Reveal>
            </div>

            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  )
}

const TOPICS = ['Send a market list', 'Office / team enquiry', 'Problem with an order', 'Become a shopper', 'Something else']

function ContactForm() {
  const [sent, setSent] = useState(false)
  const [topic, setTopic] = useState(TOPICS[0])
  const form = useFields({ name: '', phone: '', email: '', area: '', message: '' })

  const submit = () => {
    const valid = form.validate({
      name: required('Tell us who you are'),
      phone: phoneRule(),
      email: optional(emailRule()),
      message: required('Let us know what you need'),
    })
    if (!valid) return

    const { values } = form
    openWhatsApp(
      composeMessage([
        bold(topic),
        [
          `${bold('Name')}: ${values.name}`,
          `${bold('Phone')}: ${normalisePhone(values.phone)}`,
          labelled('Email', values.email.trim()),
          labelled('Area', values.area.trim()),
        ]
          .filter(Boolean)
          .join('\n'),
        values.message.trim(),
        'Sent from the Ojàmi website.',
      ]),
    )
    setSent(true)
  }

  return (
    <Reveal>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit()
        }}
        className="rounded-[1.75rem] bg-cream-50 p-6 ring-1 ring-inset ring-brand-900/10 sm:p-9"
      >
        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col items-center py-16 text-center"
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-500 text-white"
            >
              <Check className="h-8 w-8" strokeWidth={2.5} />
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-bold text-brand-950">Over to WhatsApp</h3>
            <p className="mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-600">
              Your message is waiting in WhatsApp — press send and somebody picks it up, usually within a few
              minutes during market hours.
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
              Send another
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-5">
            <ChoiceRow label="What is this about?" options={TOPICS} value={topic} onChange={setTopic} />

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
              label="Your area in Ibadan"
              name="area"
              placeholder="Bodija, Jericho, Akobo…"
              value={form.values.area}
              onChange={form.set('area')}
              error={form.errors.area}
            />

            <TextArea
              label="Your message"
              name="message"
              rows={5}
              required
              placeholder="Tell us what you need…"
              value={form.values.message}
              onChange={form.set('message')}
              error={form.errors.message}
            />

            <Button type="submit" variant="accent" size="lg" full magnetic={false}>
              Send on WhatsApp
            </Button>
          </div>
        )}
      </form>
    </Reveal>
  )
}
