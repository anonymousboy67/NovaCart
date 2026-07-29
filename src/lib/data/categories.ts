import { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    icon: "DeviceMobile",
    productCount: 8,
    description: "Phones, audio, laptops and everyday tech",
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    icon: "TShirt",
    productCount: 6,
    description: "Apparel, footwear and accessories",
  },
  {
    id: "home",
    name: "Home & Living",
    slug: "home",
    icon: "Armchair",
    productCount: 6,
    description: "Furniture, decor and kitchen essentials",
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    icon: "Sparkle",
    productCount: 5,
    description: "Skincare, fragrance and grooming",
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    slug: "sports",
    icon: "Barbell",
    productCount: 5,
    description: "Fitness gear and outdoor equipment",
  },
  {
    id: "books",
    name: "Books",
    slug: "books",
    icon: "BookOpen",
    productCount: 4,
    description: "Fiction, non-fiction and journals",
  },
  {
    id: "groceries",
    name: "Groceries",
    slug: "groceries",
    icon: "Basket",
    productCount: 3,
    description: "Pantry staples and fresh goods",
  },
  {
    id: "pets",
    name: "Pets",
    slug: "pets",
    icon: "PawPrint",
    productCount: 3,
    description: "Food, toys and accessories for pets",
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}
