import { Category, Subcategory } from "@/lib/types";

/** Builds a subcategory list, deriving `id`/`slug` from the name so callers only pass names. */
function subs(categoryId: string, names: string[]): Subcategory[] {
  return names.map((name) => {
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    return { id: `${categoryId}-${slug}`, name, slug };
  });
}

export const categories: Category[] = [
  {
    id: "electronics",
    name: "Electronics",
    slug: "electronics",
    icon: "DeviceMobile",
    image: "https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=600&h=400&fit=crop&q=80",
    productCount: 8,
    description: "Phones, audio, laptops and everyday tech",
    subcategories: subs("electronics", ["Phones", "Laptops", "Audio", "Wearables", "Accessories"]),
  },
  {
    id: "fashion",
    name: "Fashion",
    slug: "fashion",
    icon: "TShirt",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=400&fit=crop&q=80",
    productCount: 6,
    description: "Apparel, footwear and accessories",
    subcategories: subs("fashion", ["Men", "Women", "Kids", "Footwear", "Accessories"]),
  },
  {
    id: "home",
    name: "Home & Living",
    slug: "home",
    icon: "Armchair",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&h=400&fit=crop&q=80",
    productCount: 6,
    description: "Furniture, decor and kitchen essentials",
    subcategories: subs("home", ["Furniture", "Decor", "Kitchen", "Bedding", "Lighting"]),
  },
  {
    id: "beauty",
    name: "Beauty",
    slug: "beauty",
    icon: "Sparkle",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=400&fit=crop&q=80",
    productCount: 5,
    description: "Skincare, fragrance and grooming",
    subcategories: subs("beauty", ["Skincare", "Makeup", "Fragrance", "Haircare", "Grooming"]),
  },
  {
    id: "sports",
    name: "Sports & Outdoors",
    slug: "sports",
    icon: "Barbell",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop&q=80",
    productCount: 5,
    description: "Fitness gear and outdoor equipment",
    subcategories: subs("sports", ["Fitness", "Outdoor", "Cycling", "Team Sports", "Footwear"]),
  },
  {
    id: "books",
    name: "Books",
    slug: "books",
    icon: "BookOpen",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop&q=80",
    productCount: 4,
    description: "Fiction, non-fiction and journals",
    subcategories: subs("books", ["Fiction", "Non-Fiction", "Children", "Journals"]),
  },
  {
    id: "groceries",
    name: "Groceries",
    slug: "groceries",
    icon: "Basket",
    image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=400&fit=crop&q=80",
    productCount: 3,
    description: "Pantry staples and fresh goods",
    subcategories: subs("groceries", ["Pantry", "Beverages", "Snacks", "Fresh"]),
  },
  {
    id: "pets",
    name: "Pets",
    slug: "pets",
    icon: "PawPrint",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=400&fit=crop&q=80",
    productCount: 3,
    description: "Food, toys and accessories for pets",
    subcategories: subs("pets", ["Food", "Toys", "Accessories", "Grooming"]),
  },
];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryById(id: string) {
  return categories.find((c) => c.id === id);
}

export function getSubcategories(categoryId: string): Subcategory[] {
  return getCategoryById(categoryId)?.subcategories ?? [];
}

export function getSubcategoryById(categoryId: string, subcategoryId: string) {
  return getSubcategories(categoryId).find((s) => s.id === subcategoryId);
}
