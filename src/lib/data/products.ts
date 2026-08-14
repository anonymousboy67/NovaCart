import "server-only";
import { connectDB } from "@/lib/db";
import { ProductModel } from "@/lib/models/product";
import { Product } from "@/lib/types";

// Mongoose's lean() types are too strict to be worth fighting (optional/nullable
// fields that our schema defaults always fill in) — map through this loose shape at the boundary.
interface ProductRecord {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  brand?: string;
  categoryId: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  description?: string;
  images?: string[];
  specs?: Product["specs"];
  tags?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
  colors?: string[];
}

function toProduct(doc: ProductRecord): Product {
  return {
    id: doc.id,
    slug: doc.slug,
    name: doc.name,
    subtitle: doc.subtitle ?? "",
    brand: doc.brand ?? "",
    categoryId: doc.categoryId,
    price: doc.price,
    originalPrice: doc.originalPrice ?? undefined,
    rating: doc.rating ?? 0,
    reviewCount: doc.reviewCount ?? 0,
    stock: doc.stock ?? 0,
    description: doc.description ?? "",
    images: doc.images ?? [],
    specs: doc.specs ?? [],
    tags: doc.tags ?? [],
    isNew: doc.isNew,
    isBestSeller: doc.isBestSeller,
    isTrending: doc.isTrending,
    colors: doc.colors,
  };
}

export async function getAllProducts(): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find().sort({ createdAt: -1 }).lean();
  return docs.map(toProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  await connectDB();
  const doc = await ProductModel.findOne({ slug }).lean();
  return doc ? toProduct(doc) : null;
}

export async function getProductById(id: string): Promise<Product | null> {
  await connectDB();
  const doc = await ProductModel.findOne({ id }).lean();
  return doc ? toProduct(doc) : null;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  await connectDB();
  const docs = await ProductModel.find({ categoryId }).lean();
  return docs.map(toProduct);
}

/** Scores every other product against `product` and returns the most relevant matches. */
export async function getRelatedProducts(product: Product, count: number = 4): Promise<Product[]> {
  const all = await getAllProducts();

  const scored = all
    .filter((p) => p.id !== product.id)
    .map((p) => {
      let score = 0;
      if (p.categoryId === product.categoryId) score += 3;

      const sharedTags = p.tags.filter((tag) => product.tags.includes(tag));
      score += sharedTags.length * 5;

      if (p.brand === product.brand) score += 2;

      const priceRatio = Math.max(p.price, product.price) / Math.min(p.price, product.price);
      if (priceRatio <= 1.3) score += 2;

      if (p.isTrending || p.isBestSeller) score += 1;
      if (p.stock === 0) score = 0;

      return { product: p, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, count)
    .map((item) => item.product);

  if (scored.length < count) {
    const fallback = all.filter(
      (p) =>
        p.categoryId === product.categoryId &&
        p.id !== product.id &&
        !scored.find((s) => s.id === p.id) &&
        p.stock > 0
    ).slice(0, count - scored.length);
    return [...scored, ...fallback];
  }

  return scored;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isBestSeller || p.isTrending).slice(0, 8);
}

export async function getTrendingProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isTrending);
}

export async function getBestSellerProducts(): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter((p) => p.isBestSeller);
}
