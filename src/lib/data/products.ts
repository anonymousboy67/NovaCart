import { Product, ProductSpec } from "@/lib/types";
import { slugify } from "@/lib/utils";

interface RawProduct {
  id: string;
  name: string;
  subtitle: string;
  brand: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  specs: ProductSpec[];
  tags: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  colors?: string[];
}

function productImages(id: string, count: number = 4): string[] {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/novacart-${id}-${i}/900/900`);
}

const raw: RawProduct[] = [
  // Electronics (8)
  {
    id: "p-electronics-01",
    name: "Aurawave Pro Wireless Headphones",
    subtitle: "Active noise cancelling, 40h battery",
    brand: "Aurawave",
    categoryId: "electronics",
    price: 179,
    originalPrice: 229,
    rating: 4.6,
    reviewCount: 482,
    stock: 34,
    description:
      "Aurawave Pro delivers studio-grade sound with adaptive noise cancellation that adjusts to your surroundings. A featherlight aluminum frame and memory-foam ear cushions make all-day listening effortless, while a 40-hour battery keeps you covered through the longest trips.",
    specs: [
      { label: "Battery Life", value: "Up to 40 hours" },
      { label: "Connectivity", value: "Bluetooth 5.3, USB-C" },
      { label: "Noise Cancelling", value: "Adaptive ANC" },
      { label: "Weight", value: "238g" },
    ],
    tags: ["audio", "wireless", "travel"],
    isBestSeller: true,
    colors: ["Midnight Black", "Pearl White", "Sandstone"],
  },
  {
    id: "p-electronics-02",
    name: "Nimbus 14 Ultralight Laptop",
    subtitle: "14-inch, 16GB RAM, all-day battery",
    brand: "Nimbus",
    categoryId: "electronics",
    price: 1299,
    originalPrice: 1449,
    rating: 4.8,
    reviewCount: 267,
    stock: 12,
    description:
      "The Nimbus 14 packs serious performance into a chassis that weighs less than a kilogram. A brilliant 2.8K display, whisper-quiet fanless cooling, and up to 18 hours of battery life make it the ideal companion for people who work from anywhere.",
    specs: [
      { label: "Display", value: "14\" 2.8K, 120Hz" },
      { label: "Memory", value: "16GB unified" },
      { label: "Storage", value: "512GB SSD" },
      { label: "Battery", value: "Up to 18 hours" },
    ],
    tags: ["laptop", "productivity", "portable"],
    isTrending: true,
  },
  {
    id: "p-electronics-03",
    name: "Halo Fit Smartwatch Series 4",
    subtitle: "Health tracking with 10-day battery",
    brand: "Halo",
    categoryId: "electronics",
    price: 219,
    rating: 4.4,
    reviewCount: 903,
    stock: 58,
    description:
      "Track heart rate, sleep, and workouts with clinical-grade sensors wrapped in a design that looks equally at home in the boardroom or the gym. Halo Fit syncs seamlessly and lasts up to 10 days on a single charge.",
    specs: [
      { label: "Display", value: "1.4\" AMOLED, always-on" },
      { label: "Water Resistance", value: "5 ATM" },
      { label: "Battery", value: "Up to 10 days" },
      { label: "Sensors", value: "HR, SpO2, GPS" },
    ],
    tags: ["wearable", "fitness", "health"],
    isBestSeller: true,
    colors: ["Graphite", "Silver", "Rose Gold"],
  },
  {
    id: "p-electronics-04",
    name: "Pixelbeam 55\" 4K QLED TV",
    subtitle: "Cinematic color, quantum dot display",
    brand: "Pixelbeam",
    categoryId: "electronics",
    price: 799,
    originalPrice: 999,
    rating: 4.5,
    reviewCount: 341,
    stock: 21,
    description:
      "Pixelbeam's quantum dot panel produces over a billion shades of color with true blacks and dazzling highlights. Built-in streaming, voice control, and a nearly bezel-less design make it the centerpiece any room deserves.",
    specs: [
      { label: "Screen Size", value: "55 inches" },
      { label: "Resolution", value: "4K UHD, HDR10+" },
      { label: "Refresh Rate", value: "120Hz" },
      { label: "Smart Platform", value: "NovaOS built-in" },
    ],
    tags: ["tv", "home-entertainment"],
  },
  {
    id: "p-electronics-05",
    name: "Fluxcharge 65W GaN Charger",
    subtitle: "Triple-port fast charging",
    brand: "Fluxcharge",
    categoryId: "electronics",
    price: 39,
    originalPrice: 49,
    rating: 4.7,
    reviewCount: 1204,
    stock: 140,
    description:
      "Charge a laptop, phone, and earbuds simultaneously with a charger small enough to disappear in your bag. Gallium nitride construction keeps things cool and efficient even under full load.",
    specs: [
      { label: "Output", value: "65W total, 3 ports" },
      { label: "Input", value: "100-240V" },
      { label: "Material", value: "GaN semiconductor" },
      { label: "Weight", value: "112g" },
    ],
    tags: ["charger", "accessory", "travel"],
    isNew: true,
  },
  {
    id: "p-electronics-06",
    name: "Sonique Mini Smart Speaker",
    subtitle: "Room-filling sound, voice assistant",
    brand: "Sonique",
    categoryId: "electronics",
    price: 89,
    rating: 4.3,
    reviewCount: 512,
    stock: 76,
    description:
      "Don't let the compact shape fool you — Sonique Mini fills any room with rich, balanced sound. Pair two for stereo, or group across rooms for a whole-home listening experience.",
    specs: [
      { label: "Audio", value: "360° full-range driver" },
      { label: "Connectivity", value: "Wi-Fi, Bluetooth 5.2" },
      { label: "Voice Assistant", value: "Built-in" },
      { label: "Dimensions", value: "9.8 x 9.8 x 8.9 cm" },
    ],
    tags: ["speaker", "smart-home", "audio"],
  },
  {
    id: "p-electronics-07",
    name: "Verve X2 Mirrorless Camera",
    subtitle: "24MP APS-C, 4K60 video",
    brand: "Verve",
    categoryId: "electronics",
    price: 1099,
    originalPrice: 1249,
    rating: 4.7,
    reviewCount: 188,
    stock: 9,
    description:
      "A photographer's tool built for speed: rapid autofocus, in-body stabilization, and stunning low-light performance in a body small enough for everyday carry.",
    specs: [
      { label: "Sensor", value: "24.2MP APS-C CMOS" },
      { label: "Video", value: "4K up to 60fps" },
      { label: "Stabilization", value: "5-axis in-body" },
      { label: "Mount", value: "NovaMount" },
    ],
    tags: ["camera", "photography"],
    isTrending: true,
  },
  {
    id: "p-electronics-08",
    name: "Keystroke Mechanical Keyboard",
    subtitle: "Hot-swappable, low-profile switches",
    brand: "Keystroke",
    categoryId: "electronics",
    price: 149,
    rating: 4.6,
    reviewCount: 396,
    stock: 47,
    description:
      "A tactile, quiet-clicking keyboard designed for long writing sessions and late-night builds alike. Hot-swappable switches let you tune the feel exactly to your liking.",
    specs: [
      { label: "Switches", value: "Hot-swap, low-profile tactile" },
      { label: "Connectivity", value: "USB-C, Bluetooth 5.1" },
      { label: "Backlight", value: "Per-key RGB" },
      { label: "Battery", value: "Up to 200 hours" },
    ],
    tags: ["keyboard", "desk", "productivity"],
  },

  // Fashion (6)
  {
    id: "p-fashion-01",
    name: "Merid Wool Overcoat",
    subtitle: "Tailored fit, water-resistant finish",
    brand: "Merid",
    categoryId: "fashion",
    price: 249,
    originalPrice: 320,
    rating: 4.7,
    reviewCount: 156,
    stock: 24,
    description:
      "Cut from a brushed wool blend, this overcoat balances structure with movement. A water-resistant finish and quiet hardware make it as practical as it is polished.",
    specs: [
      { label: "Material", value: "80% wool, 20% nylon blend" },
      { label: "Fit", value: "Tailored, true to size" },
      { label: "Care", value: "Dry clean only" },
    ],
    tags: ["outerwear", "menswear"],
    colors: ["Charcoal", "Camel", "Navy"],
    isNew: true,
  },
  {
    id: "p-fashion-02",
    name: "Linden Everyday Sneaker",
    subtitle: "Knit upper, cushioned sole",
    brand: "Linden",
    categoryId: "fashion",
    price: 98,
    originalPrice: 130,
    rating: 4.5,
    reviewCount: 674,
    stock: 88,
    description:
      "A minimalist sneaker built for the in-between moments — commuting, errands, weekend walks. Breathable knit and a responsive foam sole keep every step easy.",
    specs: [
      { label: "Upper", value: "Recycled knit textile" },
      { label: "Sole", value: "Molded foam, non-slip" },
      { label: "Fit", value: "True to size" },
    ],
    tags: ["footwear", "casual"],
    colors: ["White", "Stone", "Black"],
    isBestSeller: true,
  },
  {
    id: "p-fashion-03",
    name: "Aisling Silk Blouse",
    subtitle: "Relaxed fit, mother-of-pearl buttons",
    brand: "Aisling",
    categoryId: "fashion",
    price: 118,
    rating: 4.4,
    reviewCount: 92,
    stock: 41,
    description:
      "Fluid silk drapes beautifully in a relaxed silhouette suited to both the office and evenings out. Finished with mother-of-pearl buttons for a subtle, considered detail.",
    specs: [
      { label: "Material", value: "100% mulberry silk" },
      { label: "Fit", value: "Relaxed" },
      { label: "Care", value: "Hand wash cold" },
    ],
    tags: ["womenswear", "workwear"],
    colors: ["Ivory", "Blush", "Black"],
  },
  {
    id: "p-fashion-04",
    name: "Fernweh Canvas Weekender",
    subtitle: "Water-resistant, leather trim",
    brand: "Fernweh",
    categoryId: "fashion",
    price: 165,
    originalPrice: 195,
    rating: 4.8,
    reviewCount: 210,
    stock: 33,
    description:
      "Built from waxed canvas with full-grain leather trim, this weekender ages beautifully with every trip. A padded interior sleeve keeps a laptop or tablet protected on the go.",
    specs: [
      { label: "Material", value: "Waxed canvas, leather trim" },
      { label: "Capacity", value: "42L" },
      { label: "Dimensions", value: "54 x 28 x 26 cm" },
    ],
    tags: ["bags", "travel"],
    isTrending: true,
  },
  {
    id: "p-fashion-05",
    name: "Otterloop Merino Sweater",
    subtitle: "Lightweight, temperature-regulating",
    brand: "Otterloop",
    categoryId: "fashion",
    price: 89,
    rating: 4.6,
    reviewCount: 318,
    stock: 65,
    description:
      "Fine-gauge merino knit that regulates temperature without adding bulk. A wardrobe staple that layers effortlessly through every season.",
    specs: [
      { label: "Material", value: "100% merino wool" },
      { label: "Fit", value: "Regular" },
      { label: "Care", value: "Machine wash cold, gentle" },
    ],
    tags: ["knitwear", "essentials"],
    colors: ["Oatmeal", "Forest", "Slate"],
  },
  {
    id: "p-fashion-06",
    name: "Solstice Polarized Sunglasses",
    subtitle: "Acetate frame, UV400 protection",
    brand: "Solstice",
    categoryId: "fashion",
    price: 129,
    originalPrice: 159,
    rating: 4.5,
    reviewCount: 145,
    stock: 52,
    description:
      "Hand-polished acetate frames paired with polarized lenses that cut glare without distorting color. A timeless shape that suits nearly every face.",
    specs: [
      { label: "Lens", value: "Polarized, UV400" },
      { label: "Frame", value: "Italian acetate" },
      { label: "Includes", value: "Hard case, cleaning cloth" },
    ],
    tags: ["accessories", "eyewear"],
  },

  // Home & Living (6)
  {
    id: "p-home-01",
    name: "Camden Boucle Armchair",
    subtitle: "Solid oak legs, deep seat",
    brand: "Camden",
    categoryId: "home",
    price: 449,
    originalPrice: 549,
    rating: 4.7,
    reviewCount: 87,
    stock: 14,
    description:
      "A deep, cloud-like seat wrapped in textured boucle, set on solid oak legs. Designed to be the chair everyone fights over.",
    specs: [
      { label: "Material", value: "Boucle upholstery, oak frame" },
      { label: "Dimensions", value: "82 x 88 x 84 cm" },
      { label: "Assembly", value: "Legs attach in minutes" },
    ],
    tags: ["furniture", "living-room"],
    colors: ["Oatmeal", "Dove Grey"],
    isNew: true,
  },
  {
    id: "p-home-02",
    name: "Hearthstone Ceramic Dinnerware Set",
    subtitle: "16-piece, service for 4",
    brand: "Hearthstone",
    categoryId: "home",
    price: 129,
    rating: 4.6,
    reviewCount: 231,
    stock: 44,
    description:
      "Hand-finished stoneware with a soft matte glaze. Dishwasher and microwave safe, built to feel as good every day as it does the first time you unbox it.",
    specs: [
      { label: "Pieces", value: "16-piece set" },
      { label: "Material", value: "Glazed stoneware" },
      { label: "Care", value: "Dishwasher & microwave safe" },
    ],
    tags: ["kitchen", "dining"],
    isBestSeller: true,
  },
  {
    id: "p-home-03",
    name: "Driftlight Ceramic Table Lamp",
    subtitle: "Warm dimmable glow, linen shade",
    brand: "Driftlight",
    categoryId: "home",
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviewCount: 164,
    stock: 58,
    description:
      "A softly textured ceramic base topped with a hand-sewn linen shade. Pairs a dimmable warm-white bulb with an in-line switch for effortless ambience.",
    specs: [
      { label: "Material", value: "Ceramic base, linen shade" },
      { label: "Bulb", value: "E26, dimmable (included)" },
      { label: "Height", value: "48 cm" },
    ],
    tags: ["lighting", "decor"],
  },
  {
    id: "p-home-04",
    name: "Moss & Fern Weighted Throw",
    subtitle: "Breathable cotton, 7kg fill",
    brand: "Moss & Fern",
    categoryId: "home",
    price: 69,
    rating: 4.4,
    reviewCount: 289,
    stock: 71,
    description:
      "Evenly distributed glass beads inside a breathable cotton shell for gentle, calming pressure — without overheating.",
    specs: [
      { label: "Weight", value: "7 kg" },
      { label: "Material", value: "100% cotton shell" },
      { label: "Care", value: "Machine washable cover" },
    ],
    tags: ["bedding", "wellness"],
  },
  {
    id: "p-home-05",
    name: "Kettlewell Pour-Over Coffee Set",
    subtitle: "Borosilicate glass, walnut collar",
    brand: "Kettlewell",
    categoryId: "home",
    price: 54,
    originalPrice: 68,
    rating: 4.8,
    reviewCount: 402,
    stock: 63,
    description:
      "A precision pour-over dripper and carafe in heat-resistant glass, wrapped with a hand-finished walnut collar. Includes 50 reusable filters.",
    specs: [
      { label: "Capacity", value: "600ml carafe" },
      { label: "Material", value: "Borosilicate glass, walnut" },
      { label: "Includes", value: "50 filters" },
    ],
    tags: ["kitchen", "coffee"],
    isTrending: true,
  },
  {
    id: "p-home-06",
    name: "Loam Ceramic Planter Trio",
    subtitle: "Set of 3, drainage included",
    brand: "Loam",
    categoryId: "home",
    price: 44,
    rating: 4.6,
    reviewCount: 178,
    stock: 96,
    description:
      "Three nesting planters in a matte, speckled glaze — each with a drainage hole and matching saucer. Sized for herbs, succulents, and small houseplants.",
    specs: [
      { label: "Set", value: "3 planters + saucers" },
      { label: "Material", value: "Glazed ceramic" },
      { label: "Sizes", value: "10cm, 13cm, 16cm" },
    ],
    tags: ["decor", "garden"],
  },

  // Beauty (5)
  {
    id: "p-beauty-01",
    name: "Lumen Vitamin C Serum",
    subtitle: "15% L-ascorbic acid, brightening",
    brand: "Lumen",
    categoryId: "beauty",
    price: 42,
    originalPrice: 52,
    rating: 4.6,
    reviewCount: 812,
    stock: 120,
    description:
      "A stabilized 15% vitamin C formula that brightens, evens tone, and supports collagen production — without the sting of older formulations.",
    specs: [
      { label: "Size", value: "30ml" },
      { label: "Key Ingredient", value: "15% L-ascorbic acid" },
      { label: "Skin Type", value: "All, including sensitive" },
    ],
    tags: ["skincare", "serum"],
    isBestSeller: true,
  },
  {
    id: "p-beauty-02",
    name: "Quietude Restorative Night Cream",
    subtitle: "Peptides + ceramides",
    brand: "Quietude",
    categoryId: "beauty",
    price: 58,
    rating: 4.5,
    reviewCount: 267,
    stock: 84,
    description:
      "A rich, fast-absorbing night cream formulated with peptides and ceramides to support the skin barrier while you sleep.",
    specs: [
      { label: "Size", value: "50ml" },
      { label: "Key Ingredients", value: "Peptides, ceramides, squalane" },
      { label: "Fragrance", value: "Free" },
    ],
    tags: ["skincare", "moisturizer"],
    isNew: true,
  },
  {
    id: "p-beauty-03",
    name: "Solene Eau de Parfum",
    subtitle: "Warm amber, sandalwood, citrus",
    brand: "Solene",
    categoryId: "beauty",
    price: 95,
    originalPrice: 115,
    rating: 4.7,
    reviewCount: 198,
    stock: 39,
    description:
      "An oriental-woody fragrance opening with bright citrus and settling into warm amber and sandalwood. Long-lasting and unmistakably distinct.",
    specs: [
      { label: "Size", value: "50ml" },
      { label: "Concentration", value: "Eau de parfum, 18%" },
      { label: "Notes", value: "Citrus, amber, sandalwood" },
    ],
    tags: ["fragrance"],
  },
  {
    id: "p-beauty-04",
    name: "Bristleworks Boar Bristle Brush Set",
    subtitle: "3-piece, natural bristle",
    brand: "Bristleworks",
    categoryId: "beauty",
    price: 34,
    rating: 4.4,
    reviewCount: 143,
    stock: 102,
    description:
      "A trio of natural boar-bristle brushes sized for detangling, smoothing, and finishing — designed to reduce breakage and add shine.",
    specs: [
      { label: "Set", value: "3 brushes" },
      { label: "Bristle", value: "100% natural boar" },
      { label: "Handle", value: "Beechwood" },
    ],
    tags: ["haircare", "tools"],
  },
  {
    id: "p-beauty-05",
    name: "Cirrus Mineral Sunscreen SPF50",
    subtitle: "Zinc oxide, no white cast",
    brand: "Cirrus",
    categoryId: "beauty",
    price: 28,
    originalPrice: 34,
    rating: 4.6,
    reviewCount: 356,
    stock: 145,
    description:
      "A weightless mineral sunscreen that blends in clear on every skin tone, with broad-spectrum SPF50 protection for daily wear.",
    specs: [
      { label: "SPF", value: "50, broad spectrum" },
      { label: "Size", value: "50ml" },
      { label: "Formula", value: "Mineral, non-nano zinc oxide" },
    ],
    tags: ["skincare", "sunscreen"],
    isTrending: true,
  },

  // Sports & Outdoors (5)
  {
    id: "p-sports-01",
    name: "Ridgeline Trail Running Shoe",
    subtitle: "Grippy lugs, responsive foam",
    brand: "Ridgeline",
    categoryId: "sports",
    price: 138,
    originalPrice: 165,
    rating: 4.6,
    reviewCount: 289,
    stock: 47,
    description:
      "Built for uneven terrain with an aggressive lug pattern and a responsive midsole that keeps you steady from the first mile to the last.",
    specs: [
      { label: "Drop", value: "6mm" },
      { label: "Outsole", value: "Sticky rubber lugs" },
      { label: "Weight", value: "268g (US 9)" },
    ],
    tags: ["footwear", "running"],
    isBestSeller: true,
  },
  {
    id: "p-sports-02",
    name: "Basecamp 2-Person Tent",
    subtitle: "3-season, quick-pitch design",
    brand: "Basecamp",
    categoryId: "sports",
    price: 189,
    rating: 4.5,
    reviewCount: 112,
    stock: 26,
    description:
      "A freestanding 3-season tent that pitches in under five minutes, with a full-coverage rainfly and two vestibules for gear storage.",
    specs: [
      { label: "Capacity", value: "2 person" },
      { label: "Packed Weight", value: "2.3kg" },
      { label: "Season Rating", value: "3-season" },
    ],
    tags: ["camping", "outdoor"],
  },
  {
    id: "p-sports-03",
    name: "Formcore Adjustable Dumbbell Set",
    subtitle: "5-25kg per hand, compact",
    brand: "Formcore",
    categoryId: "sports",
    price: 349,
    originalPrice: 399,
    rating: 4.7,
    reviewCount: 176,
    stock: 18,
    description:
      "Replace an entire rack with one pair of dumbbells that adjust from 5 to 25kg in seconds via a simple turn-dial mechanism.",
    specs: [
      { label: "Weight Range", value: "5-25kg per dumbbell" },
      { label: "Adjustment", value: "Turn-dial, 2.5kg increments" },
      { label: "Footprint", value: "42 x 20 cm each" },
    ],
    tags: ["fitness", "strength"],
    isTrending: true,
  },
  {
    id: "p-sports-04",
    name: "Aeroloft Insulated Puffer Vest",
    subtitle: "Packable, wind-resistant shell",
    brand: "Aeroloft",
    categoryId: "sports",
    price: 79,
    rating: 4.4,
    reviewCount: 201,
    stock: 55,
    description:
      "Lightweight synthetic insulation in a wind-resistant shell that packs into its own pocket — an easy layer for cool-weather activity.",
    specs: [
      { label: "Insulation", value: "Recycled synthetic fill" },
      { label: "Shell", value: "Wind-resistant ripstop" },
      { label: "Packed Size", value: "Fits in chest pocket" },
    ],
    tags: ["apparel", "outdoor"],
  },
  {
    id: "p-sports-05",
    name: "Tidewater Insulated Water Bottle",
    subtitle: "24h cold, 12h hot retention",
    brand: "Tidewater",
    categoryId: "sports",
    price: 32,
    originalPrice: 39,
    rating: 4.8,
    reviewCount: 524,
    stock: 210,
    description:
      "Double-wall vacuum insulation keeps drinks ice cold for 24 hours or steaming hot for 12. A wide mouth fits ice cubes and makes cleaning simple.",
    specs: [
      { label: "Capacity", value: "750ml" },
      { label: "Material", value: "18/8 stainless steel" },
      { label: "Insulation", value: "Double-wall vacuum" },
    ],
    tags: ["hydration", "outdoor"],
    isBestSeller: true,
  },

  // Books (4)
  {
    id: "p-books-01",
    name: "The Quiet Algorithm",
    subtitle: "A novel — hardcover first edition",
    brand: "Northfield Press",
    categoryId: "books",
    price: 24,
    rating: 4.5,
    reviewCount: 89,
    stock: 66,
    description:
      "A quietly gripping story about a data scientist who discovers a pattern that shouldn't exist. Longlisted for the National Fiction Prize.",
    specs: [
      { label: "Format", value: "Hardcover" },
      { label: "Pages", value: "342" },
      { label: "Language", value: "English" },
    ],
    tags: ["fiction", "bestseller"],
    isNew: true,
  },
  {
    id: "p-books-02",
    name: "Atlas of Small Kitchens",
    subtitle: "120 recipes for compact spaces",
    brand: "Harborline Books",
    categoryId: "books",
    price: 29,
    originalPrice: 36,
    rating: 4.7,
    reviewCount: 214,
    stock: 48,
    description:
      "A beautifully photographed cookbook built entirely around small kitchens, minimal equipment, and maximum flavor.",
    specs: [
      { label: "Format", value: "Hardcover" },
      { label: "Pages", value: "256" },
      { label: "Recipes", value: "120" },
    ],
    tags: ["cookbook", "lifestyle"],
  },
  {
    id: "p-books-03",
    name: "Deep Focus",
    subtitle: "A practical guide to sustained attention",
    brand: "Meridian Press",
    categoryId: "books",
    price: 19,
    rating: 4.4,
    reviewCount: 431,
    stock: 92,
    description:
      "Grounded in research and refreshingly free of hype, Deep Focus offers a practical framework for doing meaningful work in a distracted world.",
    specs: [
      { label: "Format", value: "Paperback" },
      { label: "Pages", value: "288" },
      { label: "Language", value: "English" },
    ],
    tags: ["non-fiction", "productivity"],
    isBestSeller: true,
  },
  {
    id: "p-books-04",
    name: "The Cartographer's Daughter",
    subtitle: "A novel in translation",
    brand: "Lantern & Co.",
    categoryId: "books",
    price: 22,
    originalPrice: 27,
    rating: 4.6,
    reviewCount: 133,
    stock: 37,
    description:
      "A sweeping, lyrical story following three generations of mapmakers across a changing coastline. Translated from the original with a new foreword.",
    specs: [
      { label: "Format", value: "Paperback" },
      { label: "Pages", value: "412" },
      { label: "Translated", value: "Yes" },
    ],
    tags: ["fiction", "translated"],
  },

  // Groceries (3)
  {
    id: "p-groceries-01",
    name: "Highland Single-Origin Coffee Beans",
    subtitle: "Medium roast, 500g bag",
    brand: "Highland Roasters",
    categoryId: "groceries",
    price: 16,
    rating: 4.7,
    reviewCount: 302,
    stock: 180,
    description:
      "Grown at altitude and roasted in small batches, this medium roast offers notes of caramel, citrus, and toasted almond.",
    specs: [
      { label: "Weight", value: "500g" },
      { label: "Roast", value: "Medium" },
      { label: "Origin", value: "Single-origin, high altitude" },
    ],
    tags: ["coffee", "pantry"],
    isBestSeller: true,
  },
  {
    id: "p-groceries-02",
    name: "Golden Harvest Extra Virgin Olive Oil",
    subtitle: "Cold-pressed, 750ml",
    brand: "Golden Harvest",
    categoryId: "groceries",
    price: 14,
    originalPrice: 18,
    rating: 4.6,
    reviewCount: 187,
    stock: 154,
    description:
      "First cold-press olive oil with a peppery finish, bottled within hours of harvest to preserve flavor and nutrients.",
    specs: [
      { label: "Volume", value: "750ml" },
      { label: "Process", value: "Cold-pressed" },
      { label: "Acidity", value: "Under 0.3%" },
    ],
    tags: ["pantry", "cooking"],
  },
  {
    id: "p-groceries-03",
    name: "Meadowbrook Raw Wildflower Honey",
    subtitle: "Unfiltered, 400g jar",
    brand: "Meadowbrook",
    categoryId: "groceries",
    price: 11,
    rating: 4.8,
    reviewCount: 245,
    stock: 132,
    description:
      "Raw and unfiltered wildflower honey harvested from small local apiaries, with all its natural pollen and enzymes intact.",
    specs: [
      { label: "Weight", value: "400g" },
      { label: "Processing", value: "Raw, unfiltered" },
      { label: "Source", value: "Wildflower, small-batch" },
    ],
    tags: ["pantry", "natural"],
    isNew: true,
  },

  // Pets (3)
  {
    id: "p-pets-01",
    name: "Burrow Orthopedic Dog Bed",
    subtitle: "Memory foam, machine-washable cover",
    brand: "Burrow",
    categoryId: "pets",
    price: 68,
    originalPrice: 85,
    rating: 4.7,
    reviewCount: 298,
    stock: 41,
    description:
      "Supportive memory foam eases pressure on joints for senior or active dogs alike, wrapped in a durable, machine-washable cover.",
    specs: [
      { label: "Size", value: "Large, 91 x 71 cm" },
      { label: "Fill", value: "3-layer memory foam" },
      { label: "Cover", value: "Removable, machine washable" },
    ],
    tags: ["dog", "bedding"],
    isBestSeller: true,
  },
  {
    id: "p-pets-02",
    name: "Whisker Loft Cat Tree",
    subtitle: "Modern design, sisal posts",
    brand: "Whisker",
    categoryId: "pets",
    price: 119,
    rating: 4.5,
    reviewCount: 156,
    stock: 22,
    description:
      "A cat tree designed to look intentional in a modern home, with multiple perches, a cozy hideaway, and natural sisal scratching posts.",
    specs: [
      { label: "Height", value: "142 cm" },
      { label: "Material", value: "Engineered wood, sisal" },
      { label: "Perches", value: "3, plus enclosed hideaway" },
    ],
    tags: ["cat", "furniture"],
    isNew: true,
  },
  {
    id: "p-pets-03",
    name: "Trailmate No-Pull Dog Harness",
    subtitle: "Padded, adjustable, reflective",
    brand: "Trailmate",
    categoryId: "pets",
    price: 34,
    originalPrice: 42,
    rating: 4.6,
    reviewCount: 412,
    stock: 88,
    description:
      "A front-clip harness that discourages pulling without restricting movement, with breathable padding and reflective trim for evening walks.",
    specs: [
      { label: "Sizes", value: "XS to XL" },
      { label: "Material", value: "Breathable mesh, padded" },
      { label: "Visibility", value: "Reflective stitching" },
    ],
    tags: ["dog", "walking"],
  },
];

export const products: Product[] = raw.map((p) => ({
  ...p,
  slug: slugify(`${p.name}-${p.id.split("-").pop()}`),
  images: productImages(p.id),
}));

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string) {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, count: number = 4) {
  return products
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, count);
}

export const featuredProducts = products.filter((p) => p.isBestSeller || p.isTrending).slice(0, 8);
export const trendingProducts = products.filter((p) => p.isTrending);
export const bestSellerProducts = products.filter((p) => p.isBestSeller);
export const newProducts = products.filter((p) => p.isNew);
