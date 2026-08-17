import type { PhotoKey } from './images'

/* ============================================================================
   MARKETING CONTENT
   ========================================================================== */

export const STATS = [
  { value: 12400, suffix: '+', label: 'Market runs completed' },
  { value: 3800, suffix: '+', label: 'Ibadan households & offices' },
  { value: 8, suffix: '', label: 'Markets we run daily' },
  { value: 96, suffix: '%', label: 'Delivered inside the slot' },
]

export interface Step {
  n: string
  title: string
  body: string
  photo: PhotoKey
  detail: string[]
}

export const STEPS: Step[] = [
  {
    n: '01',
    title: 'Send your list',
    body: 'Type it, tick items from our catalogue, or just voice-note it the way you would tell your sister. “Two paint of rice, one basket tomato, ugu.” We understand.',
    photo: 'groceryFlatlay',
    detail: ['Text, voice note or catalogue', 'Set a budget cap if you want', 'Tell us your brands and preferences'],
  },
  {
    n: '02',
    title: 'We price it before you pay',
    body: 'Your shopper walks the market, checks today’s real prices at three stalls, and sends you a costed list. You approve it before a single naira moves.',
    photo: 'vendorWeighing',
    detail: ['Live prices from the actual stall', 'Three-stall price check on big items', 'Approve, adjust or cancel — free'],
  },
  {
    n: '03',
    title: 'Your shopper buys & proves it',
    body: 'They haggle in Yoruba the way you would, photograph every item at the stall, and send the trader’s receipt. No mystery mark-ups, ever.',
    photo: 'heroVendorTomatoes',
    detail: ['Photo of every item at the stall', 'Trader receipts attached', 'Live chat while they shop'],
  },
  {
    n: '04',
    title: 'Delivered to your door or desk',
    body: 'Sorted, bagged and delivered inside your chosen window — including straight to your office reception before lunch.',
    photo: 'groceryBagVeg',
    detail: ['Morning, lunch or evening slot', 'Office reception drop-off', 'Change anything within 30 minutes'],
  },
]

export interface Feature {
  icon: string
  title: string
  body: string
}

export const FEATURES: Feature[] = [
  {
    icon: 'ReceiptText',
    title: 'You see the market price',
    body: 'Every receipt shows what the trader charged and what we charged. Our fee is a flat number agreed upfront — we never quietly pad the price of your tomatoes.',
  },
  {
    icon: 'ShieldCheck',
    title: 'Verified, bonded shoppers',
    body: 'NIN, proof of address, guarantor and an in-person interview before anyone carries your money. Every shopper is rated after every single run.',
  },
  {
    icon: 'Camera',
    title: 'Photo proof at the stall',
    body: 'Your shopper photographs each item where they bought it. You know your titus is titus and your yam is puna before it leaves the market.',
  },
  {
    icon: 'Clock',
    title: 'Built around a work day',
    body: 'Morning, lunch and evening drop windows because we know you cannot leave the office at 11am to argue about the price of pepper.',
  },
  {
    icon: 'HandCoins',
    title: 'Set a budget, we respect it',
    body: 'Cap the run at ₦40,000 and your shopper works to it, calling you only if something important would blow the cap. No surprise totals.',
  },
  {
    icon: 'Sparkles',
    title: 'We know how to pick',
    body: 'Our shoppers know a soft tomato from a firm one and which stall waters down palm oil. That instinct is the actual product.',
  },
]

export interface Plan {
  id: string
  name: string
  native: string
  price: number
  unit: string
  /**
   * How the fee is collected. `monthly` plans bill on a subscription, so a
   * single run under one carries no per-run service fee. Checkout reads this
   * rather than matching on the plan id, so a fourth plan doesn't need a code
   * change to be priced correctly.
   */
  billing: 'per-run' | 'monthly'
  blurb: string
  cap: string
  featured?: boolean
  features: string[]
  cta: string
}

export const PLANS: Plan[] = [
  {
    id: 'quick',
    name: 'Quick Run',
    native: 'Kékeré',
    price: 1500,
    unit: 'per run',
    billing: 'per-run',
    blurb: 'A short list from one market. Perfect for a mid-week top-up.',
    cap: 'Basket up to ₦25,000',
    cta: 'Send a list',
    features: [
      'One market, up to 12 items',
      'Photo proof + trader receipts',
      'Standard delivery window',
      'Live chat with your shopper',
      'Free cancellation before buying',
    ],
  },
  {
    id: 'full',
    name: 'Full Basket',
    native: 'Ojà Kíkún',
    price: 2500,
    unit: 'per run',
    billing: 'per-run',
    blurb: 'The proper monthly market run. Multiple markets, big list, no stress.',
    cap: 'Basket up to ₦120,000',
    featured: true,
    cta: 'Book a full run',
    features: [
      'Up to 3 markets in one run',
      'Unlimited items on the list',
      'Three-stall price check on bulk items',
      'Priority delivery window of your choice',
      'Meat cut and fish cleaned to instruction',
      'Free re-delivery if we get something wrong',
    ],
  },
  {
    id: 'office',
    name: 'Office Plan',
    native: 'Ọ̀sẹ̀',
    price: 14000,
    unit: 'per month',
    billing: 'monthly',
    blurb: 'For teams and households that need the market handled every week.',
    cap: '8 runs a month, any basket size',
    cta: 'Talk to us',
    features: [
      'Everything in Full Basket',
      '8 runs a month (₦1,750 a run)',
      'One dedicated shopper who learns your list',
      'Reception drop-off at your office',
      'Monthly invoice + itemised statement',
      'WhatsApp line that answers in minutes',
    ],
  },
]

export interface Testimonial {
  name: string
  role: string
  area: string
  quote: string
  photo: PhotoKey
  rating: number
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Adenike Ogunlana',
    role: 'Bank operations officer',
    area: 'Jericho',
    quote:
      'I used to lose my whole Saturday to Bodija. Now my list goes out Friday night and everything is at my door by 9am. The photos are what sold me — I can see my tomatoes before they leave the market.',
    photo: 'personWomanWrap',
    rating: 5,
  },
  {
    name: 'Tunde Adebayo',
    role: 'Software engineer',
    area: 'Agbowo',
    quote:
      'Honestly I was expecting them to inflate prices. They sent the trader receipt alongside their own fee and it matched what my mum pays. That is the whole reason I still use them.',
    photo: 'personManBlue',
    rating: 5,
  },
  {
    name: 'Mrs. Folasade Ige',
    role: 'Secondary school principal',
    area: 'Bodija',
    quote:
      'My shopper Bisi knows I like my ugu with the thick stems and my beef cut small. She does not need to ask me anymore. That is what I am paying for.',
    photo: 'personWomanSmiling',
    rating: 5,
  },
  {
    name: 'Emeka Nwosu',
    role: 'Office manager, oil services firm',
    area: 'Ring Road',
    quote:
      'We restock a 40-person office kitchen every week on the office plan. One invoice, one contact, delivered to reception before lunch. Our admin team got her Fridays back.',
    photo: 'officeManSuit',
    rating: 5,
  },
  {
    name: 'Yewande Salami',
    role: 'Medical doctor',
    area: 'UCH / Agodi',
    quote:
      'Night shifts mean I physically cannot get to a market before it closes. Ojàmi is the only reason there is food in my house. The evening drop window is everything.',
    photo: 'officeWomanWrap',
    rating: 5,
  },
  {
    name: 'Baba Segun Alao',
    role: 'Retired civil servant',
    area: 'Akobo',
    quote:
      'My knees cannot do Oje market anymore. The young man they send calls me from the stall so I can hear the price myself. Very respectful boy.',
    photo: 'personElder',
    rating: 5,
  },
]

export interface Faq {
  q: string
  a: string
}

export const FAQS: Faq[] = [
  {
    q: 'How do I know you are not inflating the market price?',
    a: 'Because you get the trader’s receipt. Your shopper photographs each item at the stall and attaches what the trader charged. Our fee is a flat amount you agreed before the run — ₦1,500 or ₦2,500 — and it never changes based on what your basket costs. If a price looks wrong to you, say so and we will show you the three stalls we checked.',
  },
  {
    q: 'What if I do not know exactly what I want?',
    a: 'Most people don’t. Send a rough list, a voice note, or a photo of what your kitchen is missing. Tell us "soup ingredients for a family of five" and your shopper will build it, price it, and send it back for your approval before buying anything.',
  },
  {
    q: 'How do I pay?',
    a: 'You approve the costed list first, then pay by bank transfer or card into a held balance. Your shopper spends from that. Whatever is left over comes straight back to you the same day — we do not round up and we do not keep change.',
  },
  {
    q: 'What if something arrives bad — soft tomatoes, wrong cut of meat?',
    a: 'Tell us within 30 minutes of delivery with a photo. On Full Basket and Office plans we re-deliver the item free. On Quick Run we refund it. This almost never happens, because your shopper photographs everything before it leaves the market — but it is your protection when it does.',
  },
  {
    q: 'Can you deliver to my office instead of my house?',
    a: 'Yes, and it is the most common request we get. We drop at reception or your front desk inside your chosen window. The lunch slot (12–2pm) is built exactly for this. Office plan customers get a named shopper who knows your building.',
  },
  {
    q: 'Which parts of Ibadan do you cover?',
    a: 'Bodija, UI/Agbowo, Samonda, Mokola, Jericho, Dugbe, Ring Road, Challenge, Oluyole, Apata, Akobo, Iwo Road, Ojoo, Moniya, Eleyele, Sango, Alakia, Egbeda, New Garage and Felele. Delivery is ₦1,000–₦2,500 depending on distance. If your area is not listed, message us — we are adding zones every month.',
  },
  {
    q: 'Do you buy in bulk for restaurants and events?',
    a: 'Yes. Bags of rice, cartons, crates and full party lists are the Full Basket plan’s home ground. For anything above ₦500,000 or a recurring restaurant supply, talk to us directly and we will price it properly.',
  },
  {
    q: 'How fast is delivery?',
    a: 'A list in before 10am is usually at your door the same afternoon. Same-day is standard across most zones. Bodija and nearby areas often land inside 45 minutes to an hour once the shopper leaves the market.',
  },
]

/** The specific pains we solve for the office-worker audience. */
export const OFFICE_PAINS = [
  {
    pain: 'You get home at 7pm',
    fix: 'The market closed at 6. We shop at 6am and hold your bag until your evening window.',
  },
  {
    pain: 'Saturday is your only free day',
    fix: 'Spend it on anything else. Your list goes out Friday and arrives Saturday morning.',
  },
  {
    pain: 'Traders see “oyinbo money” and double the price',
    fix: 'Our shoppers are Ibadan-born and haggle in Yoruba. You pay what the market pays.',
  },
  {
    pain: 'The office kitchen is always empty',
    fix: 'One standing weekly list, one invoice, delivered to reception before lunch.',
  },
]
