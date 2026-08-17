import { PageHeader } from '@/components/ui/PageHeader'
import { Section } from '@/components/ui/primitives'
import { Reveal } from '@/components/ui/Reveal'
import { BRAND } from '@/data/brand'

/**
 * Plain-language placeholders. Have a Nigerian lawyer review these before you
 * take real money — particularly the sections on holding customer funds.
 */
const CONTENT = {
  terms: {
    eyebrow: 'Legal',
    title: 'Terms of *service*',
    lead: `The plain-English version of what you agree to when you send ${BRAND.name} a market list.`,
    sections: [
      {
        h: '1. What we actually do',
        p: `${BRAND.name} is a personal shopping service. We do not own, stock or resell goods. When you send a list, you are asking us to send a shopper to buy those goods on your behalf, as your agent, at whatever the market price is on that day. Title to the goods passes from the trader directly to you.`,
      },
      {
        h: '2. Prices and our fee',
        p: 'Prices shown on this website are indicative, based on recent market rates. They are not quotes. Your shopper confirms the real price at the stall and sends you a costed list to approve before buying. Our service fee is fixed per run and stated upfront. It does not change based on the value of your basket.',
      },
      {
        h: '3. Your money',
        p: 'You deposit an approved amount before we buy. Your shopper spends from that deposit. Any unspent balance is returned to you the same day, in full. We do not retain change and we do not apply a margin to goods.',
      },
      {
        h: '4. Substitutions',
        p: 'If something on your list is unavailable or the price has moved sharply, your shopper contacts you before deciding. If we genuinely cannot reach you within a reasonable time, they will use judgement in your interest and stay inside any budget cap you set — and you may return the substituted item.',
      },
      {
        h: '5. Delivery',
        p: 'We deliver inside the window you chose, across our listed Ibadan zones. Perishables are our priority on every run. Someone must be available to receive the delivery; if nobody is, we will hold the goods and re-attempt once, and a second delivery fee may apply.',
      },
      {
        h: '6. If something is wrong',
        p: 'Contact us within 30 minutes of delivery with a photo. On Full Basket and Office plans we re-deliver the item free of charge. On Quick Run we refund that item. Perishable goods cannot be returned after that window for food-safety reasons.',
      },
      {
        h: '7. Cancellation',
        p: 'You may cancel free of charge at any point before your shopper begins buying. Once buying has started, you are responsible for the goods already purchased plus the service fee for that run.',
      },
      {
        h: '8. Our liability',
        p: 'We are liable for the reasonable value of goods lost or damaged in our care. We are not liable for indirect losses, or for the ordinary quality variation inherent in fresh market produce — which is exactly why we photograph everything before it leaves the stall.',
      },
      {
        h: '9. Governing law',
        p: `These terms are governed by the laws of the Federal Republic of Nigeria, and disputes fall to the courts of ${BRAND.state}.`,
      },
    ],
  },
  privacy: {
    eyebrow: 'Legal',
    title: 'Privacy *policy*',
    lead: 'What we collect, why we collect it, and what we will never do with it.',
    sections: [
      {
        h: '1. What we collect',
        p: 'Your name, phone number, delivery address and order history. If you use the office plan, we also hold your company name and billing contact. That is the whole list — we do not collect anything we do not need to complete a run.',
      },
      {
        h: '2. Why we collect it',
        p: 'To shop for you, deliver to you, contact you about a run in progress, and keep a record of what you ordered so repeat lists are quick. Nothing else.',
      },
      {
        h: '3. Who sees it',
        p: 'The shopper assigned to your run sees your first name, delivery address and list. Nobody else outside our operations team sees your details. We do not sell, rent or share your data with advertisers or third parties, ever.',
      },
      {
        h: '4. Shopper verification data',
        p: 'For people who apply to shop with us, we collect NIN, proof of address and guarantor details in order to verify identity. This is held securely, used only for verification, and deleted if an application is unsuccessful.',
      },
      {
        h: '5. Payments',
        p: 'Bank transfers and card payments are handled by a licensed Nigerian payment processor. We never see or store your full card number.',
      },
      {
        h: '6. How long we keep it',
        p: 'Order history is kept for two years so you can repeat past lists and so we can resolve disputes. You can ask us to delete your account and history at any time and we will do it within seven days.',
      },
      {
        h: '7. Your rights',
        p: `Under the Nigeria Data Protection Act you may ask what we hold about you, correct it, or have it deleted. Email ${BRAND.email} and a person will handle it.`,
      },
      {
        h: '8. Cookies',
        p: 'This site stores your shopping list in your own browser so it survives a refresh. We use no advertising or cross-site tracking cookies.',
      },
    ],
  },
} as const

export default function Legal({ kind }: { kind: 'terms' | 'privacy' }) {
  const c = CONTENT[kind]

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="brand" />

      <Section tone="cream" className="grain !pt-4">
        <div className="container-x">
          <div className="mx-auto max-w-3xl">
            <Reveal className="mb-10 rounded-2xl bg-accent-500/10 p-5 ring-1 ring-inset ring-accent-600/20">
              <p className="text-[0.88rem] leading-relaxed text-ink-600">
                <strong className="font-semibold text-accent-800">Note for the business owner:</strong> this is
                a plain-language starting point, not legal advice. Have a Nigerian lawyer review it — especially
                the sections about holding customer funds — before taking real money.
              </p>
            </Reveal>

            <div className="space-y-9">
              {c.sections.map((s) => (
                <Reveal key={s.h}>
                  <h2 className="font-display text-[1.25rem] font-bold tracking-[-0.03em] text-brand-950">
                    {s.h}
                  </h2>
                  <p className="mt-3 text-[1rem] leading-relaxed text-ink-600">{s.p}</p>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-14 border-t border-brand-900/10 pt-8">
              <p className="text-[0.88rem] text-ink-500">
                Questions about this page? Email{' '}
                <a
                  href={`mailto:${BRAND.email}`}
                  className="font-semibold text-brand-700 underline underline-offset-4"
                >
                  {BRAND.email}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
