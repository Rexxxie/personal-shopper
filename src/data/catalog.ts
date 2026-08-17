import type { PhotoKey } from './images'

/* ============================================================================
   CATALOG
   Prices are indicative Ibadan market rates. They are deliberately labelled
   "market price today" throughout the UI — the shopper buys at whatever the
   trader is actually selling for and the receipt reflects it.
   ========================================================================== */

export interface Category {
  id: string
  name: string
  short: string
  blurb: string
  photo: PhotoKey
  accent: string
  emoji: string
}

export const CATEGORIES: Category[] = [
  {
    id: 'foodstuff',
    name: 'Foodstuff & Grains',
    short: 'Foodstuff',
    blurb: 'Rice, beans, garri, elubo, semo — bought by the paint or the bag.',
    photo: 'catGrains',
    accent: '#C9853B',
    emoji: '🌾',
  },
  {
    id: 'vegetables',
    name: 'Fresh Vegetables',
    short: 'Vegetables',
    blurb: 'Tomatoes, rodo, tatashe, ugu, ewedu — picked the morning we deliver.',
    photo: 'catVegetables',
    accent: '#2BC16C',
    emoji: '🥬',
  },
  {
    id: 'tubers',
    name: 'Tubers & Plantain',
    short: 'Tubers',
    blurb: 'Puna yam, sweet potato, cocoyam and plantain by the bunch.',
    photo: 'catTubers',
    accent: '#8B6B3D',
    emoji: '🍠',
  },
  {
    id: 'meat-fish',
    name: 'Meat, Fish & Poultry',
    short: 'Meat & Fish',
    blurb: 'Beef, goat, ponmo, titus, panla, live chicken — early runs only.',
    photo: 'catMeat',
    accent: '#C0392B',
    emoji: '🐟',
  },
  {
    id: 'fruits',
    name: 'Fresh Fruits',
    short: 'Fruits',
    blurb: 'Watermelon, pineapple, orange, banana — ripe, not almost-ripe.',
    photo: 'catFruits',
    accent: '#FF6B18',
    emoji: '🍉',
  },
  {
    id: 'provisions',
    name: 'Provisions & Pantry',
    short: 'Provisions',
    blurb: 'Oil, milk, Milo, Indomie, seasoning — the everyday restock.',
    photo: 'catProvisions',
    accent: '#0F8049',
    emoji: '🥫',
  },
  {
    id: 'household',
    name: 'Household & Cleaning',
    short: 'Household',
    blurb: 'Detergent, bleach, tissue, brooms — everything the house runs on.',
    photo: 'catCleaning',
    accent: '#3B82C9',
    emoji: '🧼',
  },
  {
    id: 'toiletries',
    name: 'Toiletries & Care',
    short: 'Toiletries',
    blurb: 'Soap, toothpaste, lotion, pads — added quietly to any list.',
    photo: 'catToiletries',
    accent: '#9B59B6',
    emoji: '🧴',
  },
  {
    id: 'drinks',
    name: 'Drinks & Beverages',
    short: 'Drinks',
    blurb: 'Water, minerals, malt, juice, yoghurt — crates and packs.',
    photo: 'catDrinks',
    accent: '#E67E22',
    emoji: '🥤',
  },
  {
    id: 'baby',
    name: 'Baby & Kids',
    short: 'Baby',
    blurb: 'Pampers, wipes, Cerelac, baby care — no extra trip needed.',
    photo: 'catBaby',
    accent: '#EC7FA9',
    emoji: '🍼',
  },
]

export interface Product {
  id: string
  name: string
  /** How Ibadan actually sells it — paint bucket, derica, bunch, tuber. */
  unit: string
  price: number
  category: string
  photo: PhotoKey
  market: string
  popular?: boolean
  note?: string
}

export const PRODUCTS: Product[] = [
  /* ---------------- Foodstuff & Grains ---------------- */
  { id: 'rice-50kg', name: 'Foreign parboiled rice', unit: '50kg bag', price: 95000, category: 'foodstuff', photo: 'catGrains', market: 'Bodija', popular: true, note: 'We open and check the bag before paying' },
  { id: 'rice-paint', name: 'Parboiled rice', unit: 'Paint bucket (≈4kg)', price: 8500, category: 'foodstuff', photo: 'catGrains', market: 'Bodija', popular: true },
  { id: 'ofada', name: 'Ofada rice (local)', unit: 'Paint bucket', price: 9500, category: 'foodstuff', photo: 'catGrains', market: 'Bodija' },
  { id: 'beans-oloyin', name: 'Oloyin beans (honey beans)', unit: 'Paint bucket', price: 11000, category: 'foodstuff', photo: 'catStew', market: 'Bodija', popular: true },
  { id: 'beans-white', name: 'White beans (drum)', unit: 'Paint bucket', price: 9500, category: 'foodstuff', photo: 'catStew', market: 'Bodija' },
  { id: 'garri-ijebu', name: 'Ijebu garri', unit: 'Paint bucket', price: 4500, category: 'foodstuff', photo: 'catGarri', market: 'Oje', popular: true },
  { id: 'garri-yellow', name: 'Yellow garri', unit: 'Paint bucket', price: 4800, category: 'foodstuff', photo: 'catGarri', market: 'Oje' },
  { id: 'elubo', name: 'Elubo (yam flour)', unit: 'Paint bucket', price: 8500, category: 'foodstuff', photo: 'catGarri', market: 'Bodija' },
  { id: 'semo', name: 'Semovita', unit: '2kg pack', price: 5200, category: 'foodstuff', photo: 'catProvisions2', market: 'Agbeni' },
  { id: 'poundo', name: 'Poundo yam flour', unit: '2kg pack', price: 6800, category: 'foodstuff', photo: 'catProvisions2', market: 'Agbeni' },
  { id: 'maize', name: 'Maize / corn', unit: 'Paint bucket', price: 5500, category: 'foodstuff', photo: 'catGrains', market: 'Bodija' },
  { id: 'flour', name: 'Wheat flour', unit: '2kg pack', price: 4200, category: 'foodstuff', photo: 'catProvisions2', market: 'Agbeni' },

  /* ---------------- Fresh Vegetables ---------------- */
  { id: 'tomato-basket', name: 'Fresh tomatoes', unit: 'Small basket', price: 12000, category: 'vegetables', photo: 'catTomatoes', market: "Oja'ba", popular: true },
  { id: 'tomato-paint', name: 'Fresh tomatoes', unit: 'Paint bucket', price: 6500, category: 'vegetables', photo: 'catTomatoes', market: "Oja'ba", popular: true },
  { id: 'rodo', name: 'Rodo (scotch bonnet)', unit: 'Paint bucket', price: 7500, category: 'vegetables', photo: 'catChilli', market: "Oja'ba", popular: true },
  { id: 'tatashe', name: 'Tatashe (red bell pepper)', unit: 'Paint bucket', price: 6000, category: 'vegetables', photo: 'catBellPeppers', market: "Oja'ba" },
  { id: 'onions', name: 'Onions', unit: 'Paint bucket', price: 6500, category: 'vegetables', photo: 'catOnions', market: 'Bodija', popular: true },
  { id: 'ugu', name: 'Ugu (pumpkin leaf)', unit: 'Big bunch', price: 1500, category: 'vegetables', photo: 'catLeafyGreens', market: 'Oje', popular: true },
  { id: 'ewedu', name: 'Ewedu', unit: 'Bunch', price: 800, category: 'vegetables', photo: 'catLeafyGreens', market: 'Oje' },
  { id: 'tete', name: 'Tete (green spinach)', unit: 'Bunch', price: 800, category: 'vegetables', photo: 'catLeafyGreens', market: 'Oje' },
  { id: 'okra', name: 'Okra', unit: 'Paint bucket', price: 4500, category: 'vegetables', photo: 'catFreshVeg', market: 'Sango' },
  { id: 'carrot', name: 'Carrots', unit: '1kg', price: 2500, category: 'vegetables', photo: 'catCarrots', market: 'Sango' },
  { id: 'cabbage', name: 'Cabbage', unit: 'Per head', price: 2000, category: 'vegetables', photo: 'catFreshVeg', market: 'Sango' },
  { id: 'cucumber', name: 'Cucumber', unit: '5 pieces', price: 2000, category: 'vegetables', photo: 'catMixedVeg', market: 'Apata' },
  { id: 'greenpepper', name: 'Green bell pepper', unit: '5 pieces', price: 2500, category: 'vegetables', photo: 'catBellPeppers', market: 'Sango' },
  { id: 'greenbeans', name: 'Green beans', unit: 'Bunch', price: 2000, category: 'vegetables', photo: 'catFreshVeg', market: 'Apata' },

  /* ---------------- Tubers & Plantain ---------------- */
  { id: 'yam-big', name: 'Puna yam', unit: 'Big tuber', price: 7500, category: 'tubers', photo: 'catTubers', market: 'Bodija', popular: true },
  { id: 'yam-med', name: 'Yam', unit: 'Medium tuber', price: 5000, category: 'tubers', photo: 'catTubers', market: 'Bodija', popular: true },
  { id: 'sweet-potato', name: 'Sweet potato', unit: 'Paint bucket', price: 4500, category: 'tubers', photo: 'catSweetPotato', market: 'Bodija' },
  { id: 'irish', name: 'Irish potato', unit: 'Paint bucket', price: 8500, category: 'tubers', photo: 'catRootVeg', market: 'Bodija' },
  { id: 'cocoyam', name: 'Cocoyam', unit: 'Paint bucket', price: 5500, category: 'tubers', photo: 'catRootVeg', market: 'Oje' },
  { id: 'plantain-ripe', name: 'Ripe plantain', unit: 'Bunch', price: 5500, category: 'tubers', photo: 'catPlantain', market: 'Sango', popular: true },
  { id: 'plantain-unripe', name: 'Unripe plantain', unit: 'Bunch', price: 5000, category: 'tubers', photo: 'catPlantain', market: 'Sango' },

  /* ---------------- Meat, Fish & Poultry ---------------- */
  { id: 'beef', name: 'Fresh beef', unit: 'Per kg', price: 8500, category: 'meat-fish', photo: 'catMeat', market: 'Molete', popular: true, note: 'Cut to your instruction at the stall' },
  { id: 'goat', name: 'Goat meat', unit: 'Per kg', price: 11000, category: 'meat-fish', photo: 'catMeat', market: 'Molete' },
  { id: 'ponmo', name: 'Ponmo', unit: 'Per kg', price: 5000, category: 'meat-fish', photo: 'catMeat', market: 'Molete' },
  { id: 'chicken-live', name: 'Live broiler chicken', unit: 'Per bird', price: 12000, category: 'meat-fish', photo: 'catSuya', market: 'Molete', popular: true, note: 'Killed & dressed before delivery on request' },
  { id: 'chicken-frozen', name: 'Frozen chicken', unit: 'Per kg', price: 7500, category: 'meat-fish', photo: 'catSuya', market: 'Bodija' },
  { id: 'turkey', name: 'Turkey', unit: 'Per kg', price: 9500, category: 'meat-fish', photo: 'catSuya', market: 'Bodija' },
  { id: 'titus', name: 'Titus (mackerel)', unit: 'Per kg', price: 8000, category: 'meat-fish', photo: 'catFish', market: 'Bodija', popular: true },
  { id: 'panla', name: 'Panla (dried hake)', unit: 'Per kg', price: 12000, category: 'meat-fish', photo: 'catDriedFish', market: "Oja'ba" },
  { id: 'dried-fish', name: 'Dried fish (eja kika)', unit: 'Medium size', price: 4500, category: 'meat-fish', photo: 'catDriedFish', market: "Oja'ba" },
  { id: 'crayfish', name: 'Crayfish', unit: 'Cup (derica)', price: 3500, category: 'meat-fish', photo: 'catSpices', market: 'Oje', popular: true },
  { id: 'stockfish', name: 'Stockfish head', unit: 'Per piece', price: 6500, category: 'meat-fish', photo: 'catDriedFish', market: "Oja'ba" },
  { id: 'catfish', name: 'Fresh catfish', unit: 'Per kg', price: 7000, category: 'meat-fish', photo: 'catFish', market: 'Molete' },
  { id: 'eggs', name: 'Eggs', unit: 'Crate of 30', price: 7500, category: 'meat-fish', photo: 'catEggs', market: 'Bodija', popular: true },

  /* ---------------- Fruits ---------------- */
  { id: 'watermelon', name: 'Watermelon', unit: 'Big size', price: 4500, category: 'fruits', photo: 'catFruits', market: 'Sango', popular: true },
  { id: 'pineapple', name: 'Pineapple', unit: 'Per piece', price: 2500, category: 'fruits', photo: 'catFruits', market: 'Sango' },
  { id: 'banana', name: 'Banana', unit: 'Bunch', price: 3000, category: 'fruits', photo: 'catFruits', market: 'Sango', popular: true },
  { id: 'orange', name: 'Sweet orange', unit: '20 pieces', price: 3500, category: 'fruits', photo: 'citrusPile', market: 'Apata', popular: true },
  { id: 'pawpaw', name: 'Pawpaw', unit: 'Big size', price: 3000, category: 'fruits', photo: 'catFruits', market: 'Apata' },
  { id: 'apple', name: 'Apple', unit: '6 pieces', price: 5000, category: 'fruits', photo: 'catFruits', market: 'Bodija' },
  { id: 'mango', name: 'Mango', unit: '10 pieces', price: 3500, category: 'fruits', photo: 'catFruits', market: 'Apata' },
  { id: 'avocado', name: 'Avocado pear', unit: '5 pieces', price: 3000, category: 'fruits', photo: 'catFruits', market: 'Apata' },

  /* ---------------- Provisions & Pantry ---------------- */
  { id: 'palm-oil', name: 'Palm oil', unit: '5 litres', price: 11000, category: 'provisions', photo: 'catStew', market: "Oja'ba", popular: true, note: 'Tested for adulteration before we pay' },
  { id: 'groundnut-oil', name: 'Groundnut oil', unit: '5 litres', price: 16500, category: 'provisions', photo: 'catStew', market: 'Agbeni', popular: true },
  { id: 'veg-oil', name: 'Vegetable oil', unit: '5 litres', price: 15000, category: 'provisions', photo: 'catProvisions', market: 'Agbeni' },
  { id: 'sugar', name: 'Sugar', unit: '1kg', price: 2500, category: 'provisions', photo: 'catProvisions2', market: 'Agbeni' },
  { id: 'salt', name: 'Salt', unit: '1kg', price: 900, category: 'provisions', photo: 'catProvisions2', market: 'Agbeni' },
  { id: 'milo', name: 'Milo refill', unit: '500g', price: 5200, category: 'provisions', photo: 'catProvisions', market: 'Agbeni', popular: true },
  { id: 'peak', name: 'Peak milk sachet', unit: 'Pack of 10', price: 3200, category: 'provisions', photo: 'catProvisions', market: 'Agbeni', popular: true },
  { id: 'bournvita', name: 'Bournvita tin', unit: '500g', price: 6800, category: 'provisions', photo: 'catProvisions', market: 'Agbeni' },
  { id: 'indomie', name: 'Indomie noodles', unit: 'Carton of 40', price: 11500, category: 'provisions', photo: 'catProvisions2', market: 'Agbeni', popular: true },
  { id: 'spaghetti', name: 'Golden Penny spaghetti', unit: '5 packs', price: 4500, category: 'provisions', photo: 'catProvisions2', market: 'Agbeni' },
  { id: 'maggi', name: 'Maggi cubes', unit: 'Roll of 50', price: 2200, category: 'provisions', photo: 'catSpices', market: 'Agbeni', popular: true },
  { id: 'spices', name: 'Curry, thyme & seasoning set', unit: 'Set', price: 1500, category: 'provisions', photo: 'catSpices', market: 'Oje' },
  { id: 'tin-tomato', name: 'Tin tomato paste', unit: '6 tins', price: 4800, category: 'provisions', photo: 'catTomatoes', market: 'Agbeni' },
  { id: 'bread', name: 'Family loaf bread', unit: 'Per loaf', price: 2200, category: 'provisions', photo: 'catPuffPuff', market: 'Bodija' },

  /* ---------------- Household & Cleaning ---------------- */
  { id: 'detergent', name: 'Ariel detergent', unit: '900g', price: 6500, category: 'household', photo: 'catCleaning', market: 'Aleshinloye', popular: true },
  { id: 'bar-soap', name: 'Bar soap', unit: '4 bars', price: 3200, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },
  { id: 'bleach', name: 'Hypo bleach', unit: '1 litre', price: 2000, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },
  { id: 'dishwash', name: 'Dishwashing liquid', unit: '750ml', price: 2500, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },
  { id: 'tissue', name: 'Toilet roll', unit: 'Pack of 12', price: 5500, category: 'household', photo: 'catCleaning', market: 'Aleshinloye', popular: true },
  { id: 'broom', name: 'Yoruba broom (owo)', unit: 'Per bundle', price: 1500, category: 'household', photo: 'goodsShop', market: 'Aleshinloye' },
  { id: 'mop', name: 'Mop & bucket set', unit: 'Set', price: 6500, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },
  { id: 'airfresh', name: 'Air freshener', unit: 'Per can', price: 3500, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },
  { id: 'insecticide', name: 'Insecticide spray', unit: 'Per can', price: 4800, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },
  { id: 'kitchentowel', name: 'Kitchen towel', unit: '6 rolls', price: 3800, category: 'household', photo: 'catCleaning', market: 'Aleshinloye' },

  /* ---------------- Toiletries ---------------- */
  { id: 'bathsoap', name: 'Bath soap', unit: '4 bars', price: 4500, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye', popular: true },
  { id: 'toothpaste', name: 'Toothpaste', unit: '140g', price: 2800, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye' },
  { id: 'lotion', name: 'Body lotion', unit: '400ml', price: 5500, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye' },
  { id: 'rollon', name: 'Roll-on deodorant', unit: 'Per piece', price: 3200, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye' },
  { id: 'shampoo', name: 'Shampoo', unit: '400ml', price: 5500, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye' },
  { id: 'pads', name: 'Sanitary pads', unit: '3 packs', price: 4500, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye', popular: true, note: 'Delivered discreetly, always' },
  { id: 'shaving', name: 'Shaving sticks', unit: '5 pieces', price: 2500, category: 'toiletries', photo: 'catToiletries', market: 'Aleshinloye' },

  /* ---------------- Drinks ---------------- */
  { id: 'water-bottle', name: 'Bottled water', unit: 'Pack of 12', price: 2500, category: 'drinks', photo: 'catDrinks2', market: 'Agbeni', popular: true },
  { id: 'water-sachet', name: 'Sachet water (pure water)', unit: 'Bag of 20', price: 600, category: 'drinks', photo: 'catDrinks2', market: 'Agbeni' },
  { id: 'minerals', name: 'Coke / Fanta', unit: 'Crate of 12', price: 6500, category: 'drinks', photo: 'catDrinks', market: 'Agbeni', popular: true },
  { id: 'malt', name: 'Maltina', unit: '6 bottles', price: 4500, category: 'drinks', photo: 'catDrinks', market: 'Agbeni' },
  { id: 'juice', name: 'Fruit juice', unit: '2 × 1 litre', price: 4000, category: 'drinks', photo: 'catDrinks', market: 'Agbeni' },
  { id: 'yoghurt', name: 'Yoghurt', unit: '1 litre', price: 3500, category: 'drinks', photo: 'catDrinks2', market: 'Bodija' },
  { id: 'zobo', name: 'Zobo / Kunu', unit: '1 litre', price: 1500, category: 'drinks', photo: 'catDrinks', market: 'Oje' },

  /* ---------------- Baby ---------------- */
  { id: 'pampers', name: 'Pampers (medium)', unit: 'Pack of 48', price: 12500, category: 'baby', photo: 'catBaby', market: 'Agbeni', popular: true },
  { id: 'wipes', name: 'Baby wipes', unit: '3 packs', price: 4500, category: 'baby', photo: 'catBaby', market: 'Agbeni' },
  { id: 'cerelac', name: 'Cerelac', unit: '400g', price: 8500, category: 'baby', photo: 'catBaby', market: 'Agbeni' },
  { id: 'babycare', name: 'Baby soap & lotion set', unit: 'Set', price: 6500, category: 'baby', photo: 'catBaby', market: 'Aleshinloye' },
  { id: 'nan', name: 'NAN infant formula', unit: '400g', price: 15000, category: 'baby', photo: 'catBaby', market: 'Agbeni' },
]

export const POPULAR = PRODUCTS.filter((p) => p.popular)

export function byCategory(id: string) {
  return PRODUCTS.filter((p) => p.category === id)
}

export function findCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id)
}

/** Pre-built lists — the fastest possible path from landing to checkout. */
export interface Bundle {
  id: string
  name: string
  tagline: string
  photo: PhotoKey
  items: string[]
  serves: string
}

export const BUNDLES: Bundle[] = [
  {
    id: 'weekly-soup',
    name: 'Weekly Soup Pot',
    tagline: 'One pot of stew that lasts the week',
    photo: 'catStew',
    serves: 'A family of 4',
    items: ['tomato-paint', 'rodo', 'tatashe', 'onions', 'beef', 'crayfish', 'palm-oil', 'maggi'],
  },
  {
    id: 'office-restock',
    name: 'Office Restock',
    tagline: 'The kitchen your team keeps raiding',
    photo: 'catProvisions',
    serves: 'An office of 10–15',
    items: ['indomie', 'milo', 'peak', 'sugar', 'water-bottle', 'minerals', 'tissue', 'bread'],
  },
  {
    id: 'starter-home',
    name: 'New Place Starter',
    tagline: 'Just moved in? Start here',
    photo: 'catCleaning',
    serves: 'A 1–2 bedroom flat',
    items: ['rice-paint', 'beans-oloyin', 'garri-ijebu', 'palm-oil', 'detergent', 'tissue', 'bathsoap', 'broom'],
  },
  {
    id: 'fresh-week',
    name: 'Fresh Week',
    tagline: 'Vegetables and fruit, nothing tinned',
    photo: 'catFreshVeg',
    serves: '2 people, 7 days',
    items: ['ugu', 'tete', 'okra', 'carrot', 'cucumber', 'watermelon', 'banana', 'orange'],
  },
]
