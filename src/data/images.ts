/**
 * Curated image manifest.
 * Every ID below was fetched and verified to return 200 from the Unsplash CDN.
 * Keeping them in one file means swapping in your own brand photography later
 * is a single-file change — nothing else in the app hardcodes a URL.
 */

const CDN = 'https://images.unsplash.com'

type Fit = 'crop' | 'cover'

/**
 * Requested widths snap to this ladder.
 *
 * Two components asking for the same photo at 540px and 560px used to produce
 * two different URLs and therefore two downloads. Snapping collapses them onto
 * one cache entry — measured at 32 distinct photos fetched 47 times before this.
 */
const WIDTHS = [64, 96, 160, 240, 320, 400, 480, 560, 640, 800, 960, 1200, 1600] as const

const snapWidth = (w: number) => WIDTHS.find((x) => x >= w) ?? WIDTHS[WIDTHS.length - 1]

/**
 * Default quality.
 *
 * 62 rather than the CDN's 75+ because `auto=format` serves AVIF/WebP to
 * everything modern, and at these display sizes the difference is invisible
 * on a photograph while the file is roughly a third smaller. Data costs real
 * money on the networks this audience is using.
 */
const QUALITY = 62

/** Build a sized, auto-formatted CDN URL (serves AVIF/WebP where supported). */
export function img(id: string, w: number, h: number, q = QUALITY, fit: Fit = 'crop') {
  const W = snapWidth(w)
  // Keep the requested aspect ratio, but derive height from the snapped width
  // so the same photo at the same shape always resolves to one URL.
  const H = Math.round((h / w) * W)
  return `${CDN}/${id}?auto=format&fit=${fit}&w=${W}&h=${H}&q=${q}`
}

/**
 * Candidates for a responsive `srcset`.
 *
 * Call sites size images in *device* pixels (a 560px request for a 280px slot
 * at 2× DPR). Pairing this with `sizes="{w/2}px"` lets a 1× or 1.5× screen —
 * which is most cheap Android hardware — take the smaller file. A screen that
 * cannot resolve the extra pixels loses nothing by not downloading them.
 */
export function srcSet(id: string, w: number, h: number, q = QUALITY, fit: Fit = 'crop') {
  const ratio = h / w
  return [...new Set([snapWidth(Math.round(w * 0.5)), snapWidth(Math.round(w * 0.75)), snapWidth(w)])]
    .map((W) => `${img(id, W, Math.round(ratio * W), q, fit)} ${W}w`)
    .join(', ')
}

/**
 * Background washes, gradients-behind-text and other purely decorative art.
 *
 * These sit at 5–20% opacity under a scrim, so resolution and quality are
 * wasted on them entirely — a 250kB hero backdrop at 5.5% opacity looks
 * identical at a fraction of the size.
 */
export function decorative(id: string, w = 320, h = 200) {
  return `${CDN}/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=45`
}

/** Tiny blurred placeholder used behind images while they stream in. */
export function blur(id: string) {
  return `${CDN}/${id}?auto=format&fit=crop&w=24&q=20&blur=100`
}

export const PHOTO = {
  /* ---- Hero & market atmosphere ---- */
  heroVendorTomatoes: 'photo-1585540083814-ea6ee8af9e4f',
  heroVendorGreens: 'photo-1575303093127-18b3c4ef8c41',
  marketStreetBusy: 'photo-1680713660046-67b7350ed679',
  marketAerial: 'photo-1552710307-8d1c604d6319',
  marketHall: 'photo-1558907530-83566904e778',
  marketStallProduce: 'photo-1734255026082-82fdc81991f0',
  womenWithBaskets: 'photo-1509099955921-f0b4ed0c175c',
  carryingOnHead: 'photo-1625989744655-9bff7a23dac4',
  womenInWraps: 'photo-1509099896299-af46ad97ff57',
  tomatoBaskets: 'photo-1687422809617-a7d97879b3b0',
  tomatoBasketClose: 'photo-1552710218-bd32b0c98626',
  vendorSmiling: 'photo-1687422808311-a776f467a468',
  vendorPortrait: 'photo-1687422808565-929533931584',
  vendorWeighing: 'photo-1687422808277-2334638f09fb',
  shopInterior: 'photo-1734866660928-f7cd6e1b90f9',
  goodsShop: 'photo-1580746738099-1cb74f972feb',
  greensMarket: 'photo-1605319760321-91c129fd463a',
  citrusPile: 'photo-1630960411440-10f7b59717ba',
  streetMotorbikes: 'photo-1518219051733-d8d4fbbf9797',
  greenStall: 'photo-1655682597128-2b10c079cf83',
  produceSpread: 'photo-1488459716781-31db52582fe9',
  marketAisle: 'photo-1570135460237-510ca82c6781',
  marketProduceWide: 'photo-1629212093570-ff59255e89e0',
  stallRedAwning: 'photo-1599033183537-54ff77f58f75',
  stallOrangeAwning: 'photo-1662714212039-061a2c146f65',
  vegDisplay: 'photo-1552825896-8059df63a1fb',
  vegDisplay2: 'photo-1552825898-09a497ef3aff',

  /* ---- Category tiles ---- */
  catGrains: 'photo-1579871295656-28249508ee6a',
  catVegetables: 'photo-1566385101042-1a0aa0c1268c',
  catVegetables2: 'photo-1557844352-761f2565b576',
  catFruits: 'photo-1567131349667-933eb56baec0',
  catFish: 'photo-1572420054337-2cf7054ddd42',
  catDriedFish: 'photo-1548959590-3ab4e3433ea3',
  catMeat: 'photo-1602470520998-f4a52199a3d6',
  /** Raw tubers — the grilled-yam shots read as a cooked meal, not produce. */
  catTubers: 'photo-1669754839348-4fb1df8a0a0e',
  catPlantain: 'photo-1705088294633-f3894ac8edb1',
  catYamDish: 'photo-1705088293220-c1a22b5d214a',
  catProvisions: 'photo-1707049846876-44e39a6342bf',
  catProvisions2: 'photo-1646533683254-5b7e62444dfd',
  catCleaning: 'photo-1563453392212-326f5e854473',
  catToiletries: 'photo-1656214296523-2de8d388c115',
  catDrinks: 'photo-1473425990767-8324e48b48b5',
  catDrinks2: 'photo-1632852521784-d85d5b62dd62',
  catBaby: 'photo-1622290291165-d341f1938b8a',
  catSpices: 'photo-1525289722380-f5bf1653d504',
  catSpices2: 'photo-1629649407271-2dac934c1f1b',
  catPepper: 'photo-1607546900609-7efd29a4a2dd',
  catTomatoes: 'photo-1583670406087-4967a6e073e7',
  catOnions: 'photo-1578907814239-d2654ba61616',
  catEggs: 'photo-1506976785307-8732e854ad03',
  catEggs2: 'photo-1639194335563-d56b83f0060c',
  catFreshVeg: 'photo-1591586116988-62fe65164f8d',
  catLeafyGreens: 'photo-1550989460-0adf9ea622e2',
  catBellPeppers: 'photo-1592801062201-04fd6cf3d5ed',
  catChilli: 'photo-1540841866493-3bd79187b94e',
  catCarrots: 'photo-1598965675045-45c5e72c7d05',
  catRootVeg: 'photo-1471193945509-9ad0617afabf',
  catFarmVeg: 'photo-1604200657090-ae45994b2451',
  catMixedVeg: 'photo-1572402123736-c79526db405a',
  catStew: 'photo-1665400808116-f0e6339b7e9a',
  catJollof: 'photo-1604329760661-e71dc83f8f26',
  catSoup: 'photo-1665332195309-9d75071138f0',
  catSuya: 'photo-1661588669110-81142a5b9e57',
  catNigerianPlate: 'photo-1603496987674-79600a000f55',
  catPuffPuff: 'photo-1664993101841-036f189719b6',
  catYamFries: 'photo-1705088295364-6e98d62a3146',
  catSweetPotato: 'photo-1669754839348-4fb1df8a0a0e',
  /** Granular/powdered staples — reads as garri, elubo, semo. */
  catGarri: 'photo-1525289722380-f5bf1653d504',
  catRoots: 'photo-1606757389929-2045c644233b',

  /* ---- People ---- */
  personWomanSmiling: 'photo-1697383904938-cb0872376768',
  personWomanWrap: 'photo-1684860078704-5b07ac577c2e',
  personManBlue: 'photo-1739463981518-f6ad86692105',
  personManBW: 'photo-1697383904932-94304530a3dd',
  personElder: 'photo-1633539656332-d0861676473a',
  personManPortrait: 'photo-1532437698276-c2ac365e7147',
  personCarryLoad: 'photo-1615884764168-3b5d41db1f9f',
  personHeadCarry: 'photo-1562173512-e4ff9501a9af',
  scooterDelivery: 'photo-1601979107535-46367552bc25',
  officeManSuit: 'photo-1666866854783-8943590e37c8',
  officeManSuit2: 'photo-1666866850021-a843a45479af',
  officeManSuit3: 'photo-1666866868698-67ee989fba70',
  officeWomanWindow: 'photo-1573164573938-c9a3db2e84ff',
  officeWomanWrap: 'photo-1602699121555-2640db5a4639',

  /* ---- Shopping bags / delivery ---- */
  groceryBagPaper: 'photo-1584473457406-6240486418e9',
  groceryBagVeg: 'photo-1588964895597-cfccd6e2dbf9',
  groceryBagGreen: 'photo-1617500603321-bcd6286973b7',
  groceryToteBrown: 'photo-1544816155-12df9643f363',
  groceryBagHolding: 'photo-1616429368325-d5d7542b0ec3',
  groceryFlatlay: 'photo-1582803824122-f25becf36ad8',
  groceryCart: 'photo-1571340910399-354d2ce7f1dd',
  groceryToteGreen: 'photo-1618150663726-c166f0487fbe',
} as const

export type PhotoKey = keyof typeof PHOTO

/** Convenience: sized URL straight from a semantic key. */
export const P = (key: PhotoKey, w: number, h: number, q = QUALITY) => img(PHOTO[key], w, h, q)
export const PBlur = (key: PhotoKey) => blur(PHOTO[key])

/** `srcset` + `sizes` for a plain <img>, from a semantic key. */
export function PSet(key: PhotoKey, w: number, h: number, q = QUALITY) {
  return {
    srcSet: srcSet(PHOTO[key], w, h, q),
    // Call sites size in device pixels, so the CSS slot is half the request.
    sizes: `${Math.round(w / 2)}px`,
  }
}

/** Decorative background wash from a semantic key. */
export const PDecor = (key: PhotoKey, w?: number, h?: number) => decorative(PHOTO[key], w, h)
