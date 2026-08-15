import { Product, Shade } from './types';

export const SHADES: Shade[] = [
  {
    id: "jujube",
    name: "Jujube",
    hex: "#A64B3E",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/07_JUJUBE_4.jpg",
  },
  {
    id: "cherry-bomb",
    name: "Cherry Bomb",
    hex: "#C4283C",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/12_CHERRY_BOMB_4.jpg",
  },
  {
    id: "plum-coke",
    name: "Plum Coke",
    hex: "#6B2737",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/17_PLUM_COKE_4.jpg",
  },
  {
    id: "mulled-peach",
    name: "Mulled Peach",
    hex: "#E08A5B",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/18_MULLED_PEACH_4.jpg",
  },
  {
    id: "almond-rose",
    name: "Almond Rose",
    hex: "#C98A82",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/19_ALMOND_ROSE_4.jpg",
  },
  {
    id: "bare-grape",
    name: "Bare Grape",
    hex: "#8B5A6B",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/25_BARE_GRAPE_4.jpg",
  },
];

export const HERO_PRODUCT: Product = {
  id: "juicy-lasting-tint",
  name: "Juicy Lasting Tint",
  category: "LIP TINT",
  price: 14,
  description: "Nature-inspired, fruit-toned tints with a glass-like shine that stains beautifully and lasts all day.",
  shades: SHADES,
};

export const OTHER_PRODUCTS: Product[] = [
  {
    id: "glasting-melting-balm",
    name: "Glasting Melting Balm",
    category: "BALM",
    price: 14,
    description: "Deep moisture with a melt-in gloss finish.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/1_5657be7d-f915-49f8-8d24-3d4d558087eb.jpg",
  },
  {
    id: "han-all-fix-mascara",
    name: "Han All Fix Mascara",
    category: "MASCARA",
    price: 16,
    description: "Smudge-proof volume and clean lash definition.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle_BareGrape.png",
  },
  {
    id: "idol-hack-trio",
    name: "Idol Hack Trio",
    category: "SET",
    price: 34,
    description: "Curated 3-piece set for effortless daily lip pairing.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/JuicyLastingTint_Lifestyle.png",
  },
  {
    id: "blur-fudge-tint",
    name: "Blur Fudge Tint",
    category: "MATTE TINT",
    price: 14,
    description: "Velvety gradient stain with zero weight.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/07_JUJUBE_4.jpg",
  },
  {
    id: "dewy-ful-water-tint",
    name: "Dewy·ful Water Tint",
    category: "WATER TINT",
    price: 14,
    description: "Lightweight moisture-packed water gloss effect.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/18_MULLED_PEACH_4.jpg",
  },
  {
    id: "juicy-lasting-tint-mini",
    name: "The Juicy Lasting Tint Mini",
    category: "MINI TINT",
    price: 8,
    description: "Pocket-sized gloss tint for touch-ups on the go.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/12_CHERRY_BOMB_4.jpg",
  },
  {
    id: "glasting-color-gloss",
    name: "Glasting Color Gloss",
    category: "GLOSS",
    price: 14,
    description: "High-refraction high shine with rich pigment.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/19_ALMOND_ROSE_4.jpg",
  },
  {
    id: "lip-mate-pencil",
    name: "Lip Mate Pencil",
    category: "PENCIL",
    price: 14,
    description: "Precision contouring for natural over-lined lips.",
    imageSrc: "https://romandbeauty.com/cdn/shop/files/25_BARE_GRAPE_4.jpg",
  },
];

export const TESTIMONIALS = [
  {
    id: "1",
    quote: "The glass-like shine is unmatched. It feels weightless on my lips and Bare Grape has become my go-to everyday MLBB shade.",
    author: "Minah K.",
    rating: 5,
  },
  {
    id: "2",
    quote: "Juicy Lasting Tint genuinely stains evenly without drying out. Jujube gives the perfect warm fruit tint that lasts through lunch.",
    author: "Elena R.",
    rating: 5,
  },
  {
    id: "3",
    quote: "I own 5 shades already. The formula is buildable, smooth, and never sticky. It’s an editorial classic in my makeup bag.",
    author: "Sophie T.",
    rating: 5,
  },
];

export const SPOTLIGHT_BULLETS = [
  {
    title: "Fruit-Inspired Pigments",
    description: "Extracted colors inspired by sun-drenched berries and peaches for a vibrant, translucent wash.",
  },
  {
    title: "Glass-Like Radiant Shine",
    description: "Creates an ultra-glossy protective oil film that locks in moisture without feeling heavy or sticky.",
  },
  {
    title: "Deepens Over Time",
    description: "The stain pigments settle gracefully onto your lips, deepening into a natural rich tint as hours pass.",
  },
  {
    title: "Hydrating & Comfortable Wear",
    description: "Infused with fruit extracts for all-day comfort, keeping lips plumped, soft, and nourished.",
  },
];
