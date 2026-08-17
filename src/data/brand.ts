/**
 * Single source of truth for brand + business config.
 * Rename the business, change the phone number, or add a delivery zone here
 * and it updates everywhere — nothing else hardcodes these values.
 */

export const BRAND = {
  name: 'Ojàmi',
  /** ASCII fallback for places diacritics are risky (emails, filenames, alt text). */
  nameAscii: 'Ojami',
  /** Yoruba: ọjà = market. "Ojàmi" = my market. */
  meaning: 'Yorùbá for “my market”',
  tagline: 'Your personal market shopper in Ibadan',
  /**
   * Canonical origin, no trailing slash. Used for canonical/og:url tags and the
   * sitemap. Change this and `public/sitemap.xml` together if the domain moves.
   */
  url: 'https://ojami.ng',
  city: 'Ibadan',
  state: 'Oyo State',
  country: 'Nigeria',
  phone: '+234 800 000 0000',
  phoneHref: 'tel:+2348000000000',
  whatsapp: '2348000000000',
  email: 'hello@ojami.ng',
  address: 'Bodija, Ibadan, Oyo State',
  hours: 'Mon – Sat, 6:00am – 8:00pm',
  social: {
    instagram: 'https://instagram.com/ojami.ng',
    twitter: 'https://x.com/ojami_ng',
    tiktok: 'https://tiktok.com/@ojami.ng',
    facebook: 'https://facebook.com/ojami.ng',
  },
} as const

export const NAV = [
  { label: 'How it works', to: '/how-it-works' },
  { label: 'Browse market', to: '/shop' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'For offices', to: '/for-offices' },
  { label: 'Become a shopper', to: '/become-a-shopper' },
] as const

/** Ibadan delivery zones with the flat fee we charge to ride there. */
export const ZONES = [
  { name: 'Bodija', fee: 1000, eta: '45 min' },
  { name: 'UI / Agbowo', fee: 1200, eta: '55 min' },
  { name: 'Samonda', fee: 1200, eta: '50 min' },
  { name: 'Mokola', fee: 1200, eta: '50 min' },
  { name: 'Jericho', fee: 1500, eta: '1 hr' },
  { name: 'Dugbe', fee: 1500, eta: '1 hr' },
  { name: 'Ring Road', fee: 1800, eta: '1 hr 10' },
  { name: 'Challenge', fee: 1800, eta: '1 hr 15' },
  { name: 'Oluyole', fee: 2000, eta: '1 hr 15' },
  { name: 'Apata', fee: 2200, eta: '1 hr 25' },
  { name: 'Akobo', fee: 2000, eta: '1 hr 15' },
  { name: 'Iwo Road', fee: 1800, eta: '1 hr 10' },
  { name: 'Ojoo', fee: 2200, eta: '1 hr 25' },
  { name: 'Moniya', fee: 2500, eta: '1 hr 40' },
  { name: 'Eleyele', fee: 1800, eta: '1 hr 10' },
  { name: 'Sango', fee: 1500, eta: '1 hr' },
  { name: 'Alakia', fee: 2200, eta: '1 hr 25' },
  { name: 'Egbeda', fee: 2000, eta: '1 hr 20' },
  { name: 'New Garage', fee: 2000, eta: '1 hr 20' },
  { name: 'Felele', fee: 2000, eta: '1 hr 20' },
] as const

export type Zone = (typeof ZONES)[number]

/** Delivery windows an office worker can actually receive a bag in. */
export const SLOTS = [
  { id: 'morning', label: 'Morning drop', window: '8:00am – 11:00am', note: 'Before your first meeting' },
  { id: 'lunch', label: 'Lunch drop', window: '12:00pm – 2:00pm', note: 'Most popular with offices' },
  { id: 'evening', label: 'Evening drop', window: '4:00pm – 7:00pm', note: 'Catch you on your way home' },
  { id: 'next-morning', label: 'Tomorrow morning', window: '7:00am – 9:00am', note: 'Freshest possible pick' },
] as const
