"use client";

import { useRecentlyViewed } from "@/context/recently-viewed-context";
import { getProductById } from "@/lib/data/products";
import { ProductCarousel } from "@/components/shared/product-carousel";

export function RecentlyViewedSection() {
  const { productIds } = useRecentlyViewed();
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (products.length === 0) return null;

  return (
    <ProductCarousel
      title="Recently Viewed"
      subtitle="Pick up where you left off"
      products={products}
    />
  );
}
