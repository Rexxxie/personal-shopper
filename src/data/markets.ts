import type { PhotoKey } from './images'

export interface Market {
  id: string
  name: string
  area: string
  known: string
  blurb: string
  photo: PhotoKey
  runsPerWeek: number
  /** Categories this market is the best source for. */
  best: string[]
}

/** The real Ibadan markets our shoppers run. */
export const MARKETS: Market[] = [
  {
    id: 'bodija',
    name: 'Bodija Market',
    area: 'Ibadan North',
    known: 'The foodstuff capital',
    blurb:
      'If it is grain, tuber or bulk foodstuff, Bodija sets the price for the whole of Ibadan. Our biggest team runs here every single morning.',
    photo: 'marketStallProduce',
    runsPerWeek: 210,
    best: ['Foodstuff & Grains', 'Tubers & Plantain', 'Vegetables'],
  },
  {
    id: 'oje',
    name: 'Oje Market',
    area: 'Ibadan North East',
    known: 'Over a century old',
    blurb:
      'A kilometre from the Olubadan palace and older than most of the city. Unbeatable for local vegetables, traditional spices and herbs.',
    photo: 'catSpices2',
    runsPerWeek: 96,
    best: ['Vegetables', 'Spices & Seasoning', 'Traditional items'],
  },
  {
    id: 'aleshinloye',
    name: 'Aleshinloye Market',
    area: 'Ibadan South West',
    known: 'Household & homeware',
    blurb:
      'Where Ibadan buys the things that fill a house — cookware, cleaning, storage, homeware. Pricier, but the quality holds.',
    photo: 'goodsShop',
    runsPerWeek: 74,
    best: ['Household & Cleaning', 'Homeware', 'Toiletries'],
  },
  {
    id: 'agbeni',
    name: 'Agbeni Market',
    area: 'Ibadan Central',
    known: 'Provisions in bulk',
    blurb:
      'The wholesale heart of the city. Cartons, sacks and cases at prices retail shops quietly buy from.',
    photo: 'catProvisions',
    runsPerWeek: 88,
    best: ['Provisions & Pantry', 'Drinks', 'Bulk buying'],
  },
  {
    id: 'sango',
    name: 'Sango Market',
    area: 'Ibadan North West',
    known: 'Fast & fresh',
    blurb:
      'Compact, quick to move through, and close to the university corridor. Our go-to when a list needs to be in a car within the hour.',
    photo: 'greenStall',
    runsPerWeek: 118,
    best: ['Vegetables', 'Fruits', 'Quick runs'],
  },
  {
    id: 'ojaba',
    name: "Oja'ba & Beere",
    area: 'Ibadan South East',
    known: 'The original market',
    blurb:
      'The oldest trading ground in Ibadan, sitting right by the Olubadan palace. Best prices in the city for pepper, palm oil and dried fish.',
    photo: 'stallOrangeAwning',
    runsPerWeek: 64,
    best: ['Pepper & Tomatoes', 'Palm oil', 'Dried fish'],
  },
  {
    id: 'molete',
    name: 'Molete Market',
    area: 'Ibadan South West',
    known: 'Meat & fish',
    blurb:
      'Where our shoppers go when your list says fresh beef, goat meat, ponmo or hard-to-find cuts. Early runs only — it sells out.',
    photo: 'catMeat',
    runsPerWeek: 52,
    best: ['Meat & Poultry', 'Fish & Seafood'],
  },
  {
    id: 'apata',
    name: 'Apata Market',
    area: 'Ido / Apata',
    known: 'Farm-direct',
    blurb:
      'Closest to the farms on the Abeokuta road, so produce arrives the same day it was harvested. Worth the extra distance.',
    photo: 'catFarmVeg',
    runsPerWeek: 41,
    best: ['Vegetables', 'Fruits', 'Farm produce'],
  },
]
