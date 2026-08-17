# Ojàmi

**Your personal market shopper in Ibadan.**

A React web app for a personal-shopping service: a customer sends a market list,
a verified human shopper walks Bodija / Oje / Aleshinloye (or any of eight Ibadan
markets), buys at the real market price, photographs every item at the stall, and
delivers to the customer's door or office desk the same day.

Modelled on the errand-marketplace idea behind [taskeeu.com](https://taskeeu.com),
but deliberately **narrower**: market and grocery runs only, one city, no general
logistics, no tasker bidding. The pitch is a trusted person who knows the market —
not a delivery network.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:5173.

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Dev server with hot reload       |
| `npm run build`     | Typecheck + production build     |
| `npm run preview`   | Serve the production build       |
| `npm run typecheck` | Types only, no build             |
| `npm run lint`      | oxlint                           |

---

## The stack

- **React 19** + **TypeScript** + **Vite** — fast dev, small output
- **Tailwind CSS v4** — design tokens live in `src/index.css` under `@theme`
- **Motion** (Framer Motion v13) — every animation on the site
- **Lenis** — momentum smooth-scroll; all scroll-linked effects inherit its easing
- **React Router** — client-side routing with animated page transitions
- **lucide-react** — icons

No backend — **WhatsApp is the backend.** Every form (checkout, contact, office
enquiry, shopper application) validates what you typed, composes a plain-text
message, and hands you off to the business WhatsApp number with it pre-filled.
So an order actually lands somewhere a human reads it, today, with no server.

That is the real flow rather than a stopgap: the site's own copy promises "you'll
get a WhatsApp message with the fully costed list", and this is that. When order
storage exists it goes *alongside* the hand-off, not instead of it.

- `src/lib/whatsapp.ts` — link building, the `wa.me` hand-off, phone/email checks
- `src/lib/orderMessage.ts` — turns a list into the message a shopper receives
- `src/lib/form.ts` — `useFields` state + validation rules
- `src/components/ui/Form.tsx` — `<Field>`, `<TextArea>`, `<ChoiceRow>`, `<MultiChoiceRow>`

Long lists are handled: past ~1,800 characters the message drops per-item price
estimates (the shopper re-prices at the stall anyway) so the `wa.me` pre-fill
doesn't get silently truncated, and the confirmation screen always offers a
**Copy my list** button as a fallback.

---

## Pages

| Route                | What's there                                                          |
| -------------------- | --------------------------------------------------------------------- |
| `/`                  | Landing page — hero, categories, process, bundles, markets, pricing, FAQ |
| `/shop`              | Browse 97 market items, search, filter, build a list                  |
| `/how-it-works`      | The four-step process plus service guarantees                         |
| `/pricing`           | Three plans, feature comparison, worked cost examples, delivery zones  |
| `/for-offices`       | B2B pitch and enquiry form (the office-worker audience)               |
| `/become-a-shopper`  | Recruitment page and application form                                 |
| `/about`             | Story, values, timeline                                               |
| `/contact`           | Contact channels and form                                             |
| `/checkout`          | Check list → delivery → confirm → hands off to WhatsApp               |
| `/track`             | Labelled **preview** of the tracking screen, advancing on a timer     |
| `/terms`, `/privacy` | Plain-language legal placeholders                                     |

---

## Making it yours

Almost everything you'll want to change lives in `src/data/`.

### Brand name, phone, address, delivery zones

`src/data/brand.ts`

```ts
export const BRAND = {
  name: 'Ojàmi',
  tagline: 'Your personal market shopper in Ibadan',
  phone: '+234 800 000 0000',
  whatsapp: '2348000000000',   // every wa.me link AND every order hand-off
  email: 'hello@ojami.ng',
  url: 'https://ojami.ng',     // canonical origin, no trailing slash
  ...
}
```

Change `BRAND.name` and the new name appears in the nav, footer, page titles,
the giant footer wordmark, and the preloader. **The placeholder phone number,
email and social links are fake — replace them before you go live.**

`ZONES` in the same file drives the delivery-fee list on the pricing page, the
checkout zone picker, and the footer coverage list.

### Products and prices

`src/data/catalog.ts` — 10 categories, 97 products, and 4 ready-made bundles.

```ts
{ id: 'yam-big', name: 'Puna yam', unit: 'Big tuber', price: 7500,
  category: 'tubers', photo: 'catTubers', market: 'Bodija', popular: true }
```

Prices are **indicative Ibadan market rates**, and the UI says so everywhere —
they're framed as a guide, with the real price confirmed by the shopper before
the customer pays. Update them as the market moves; nothing else needs to change.

### Plans, testimonials, FAQs, stats

`src/data/content.ts`. The three plans (`PLANS`) feed the pricing page, the home
teaser and the checkout picker from one definition.

### Markets

`src/data/markets.ts` — the eight Ibadan markets shown in the horizontal rail.

### Photography

`src/data/images.ts` is the **only** file with image URLs in it. Every ID was
fetched and verified against the Unsplash CDN. When you have your own photos of
real Ibadan markets and real shoppers, swap them in here and the whole site
updates — that will do more for conversion than anything else on this list.

---

## How the animation is built

The point was a site that feels designed rather than decorated, so the motion
comes from a small shared vocabulary instead of ad-hoc transitions.

- `src/lib/motion.ts` — the house easing (`easeOutExpo`), spring presets, and
  every reveal variant. Change `EASE` here and the whole site's character changes.
- `src/components/ui/Reveal.tsx` — `<Reveal>`, `<RevealGroup>`, `<RevealItem>`
  for scroll-triggered entrances and stagger.
- `src/components/ui/TextReveal.tsx` — headlines that reveal word-by-word from
  behind a mask. Wrap words in `*asterisks*` for the brand gradient, `\n` for a
  hard line break: `'Skip the market.\nNot the\n*market price*.'`
- `src/components/ui/Img.tsx` — every photo blur-ups, scale-reveals, and can
  parallax. One component so imagery always arrives the same way.
- `src/components/ui/Button.tsx` — magnetic buttons that drift toward the cursor.
- `src/components/layout/Chrome.tsx` — preloader, scroll progress, custom cursor,
  WhatsApp FAB.

Everything respects `prefers-reduced-motion`: Lenis doesn't initialise, the
custom cursor doesn't mount, the preloader never shows, counters jump straight to
their value, and CSS animations are reduced to nothing.

The preloader waits on `document.fonts.ready` between a 500ms floor and a 1.1s
ceiling, rather than sitting on a flat timeout — it covers real work instead of
adding a fixed delay to an already slow first paint on mobile data.

---

## Built for the app you're planning

Since a mobile app is coming, the code is arranged so the port isn't a rewrite:

- **All business logic is in `src/store/list.tsx`** — a plain reducer with no DOM
  dependencies. Swap `localStorage` for `AsyncStorage` and it runs in React Native
  unchanged.
- **All content is in `src/data/`** — plain typed objects, no JSX. These files
  move over as-is and can later be served from an API without touching components.
- **Components are presentational** — they read from the store and the data layer
  rather than owning state.
- A **PWA manifest** is already wired up (`public/manifest.webmanifest`), so the
  site is installable to a home screen today.

---

## What's not built yet

Deliberate gaps, in rough priority order:

1. **Your real contact details.** `BRAND.phone`, `BRAND.whatsapp`, `BRAND.email`,
   `BRAND.url` and the four social links in `src/data/brand.ts` are still
   placeholders — and the WhatsApp hand-off now sends every order to
   `BRAND.whatsapp`, so **nothing works until that number is yours.** Change it
   in `brand.ts`, and in the `telephone`/`email`/`url` fields of the JSON-LD block
   in `index.html`.
2. **Order storage.** WhatsApp gets an order to a human, but nothing is recorded,
   searchable or reportable. You need order storage, auth, and a shopper-side app.
3. **Payments.** Naira collection via Paystack or Flutterwave, plus the held-balance
   and same-day-change-return logic the copy promises.
4. **Real tracking.** `/track` is a timer-driven preview, labelled as one on the
   page. Real tracking needs the shopper app publishing status and photos.
5. **Legal review.** `/terms` and `/privacy` are plain-language starting points,
   not legal advice. Get a Nigerian lawyer to look at them — especially the parts
   about holding customer funds — before you take real money.
6. **Analytics.** No tracking of any kind is installed.
7. **Your own photography and share card.** `og:image` in `index.html` is still a
   hotlinked stock photo; replace it with a self-hosted 1200×630 card. Self-hosting
   the two web fonts would also drop the last third-party request from the
   critical path — they load off it now, but still from Google.
8. **Editable prices.** `src/data/catalog.ts` is a deploy away from every price
   change, and "we buy at the real market price" is the whole positioning. This
   will rot faster than anything else here.

---

## Deploying

The app is a client-side SPA, so the host has to serve `index.html` for every
path or a refresh on `/pricing` is a hard 404. Both configs are committed:
`public/_redirects` (Netlify, Cloudflare Pages) and `vercel.json` (Vercel). On
any other host, add the equivalent rewrite yourself.

`public/robots.txt` and `public/sitemap.xml` hardcode the domain — update both,
plus `BRAND.url` and the canonical/`og:url` tags in `index.html`, if it changes.

---

## Notes on decisions worth knowing about

- **The pricing model is the positioning.** A flat fee per run (₦1,500 / ₦2,500 /
  ₦14,000 a month) with the trader's receipt attached is the whole trust argument,
  and the pricing page shows our cut as a percentage of two real baskets (12.4%
  and 2.8%). If you ever switch to a margin on goods, that page has to change and
  so does most of the copy.
- **Office workers are the wedge, not the ceiling.** `/for-offices` and the
  "Built for people with jobs" section target them explicitly, but nothing in the
  data model is office-specific — adding a new audience is a content change.
- **The Yorùbá naming is load-bearing.** Ojàmi ("my market"), and the plan names
  Kékeré / Ojà Kíkún / Ọ̀sẹ̀, are what make this feel local rather than like a
  Lagos startup with an Ibadan branch. Worth keeping.
