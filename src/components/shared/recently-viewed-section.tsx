"use client";

import { useEffect, useState } from "react";
import { useRecentlyViewed } from "@/context/recently-viewed-context";
import { useProducts } from "@/context/products-context";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { Product } from "@/lib/types";

export function RecentlyViewedSection() {
  const { productIds } = useRecentlyViewed();
  const { getById } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Wait for client-side hydration before rendering products
  useEffect(() => {
    setIsClient(true);
    const items = productIds
      .map((id) => getById(id))
      .filter((p): p is NonNullable<typeof p> => Boolean(p));
    setProducts(items);
  }, [productIds, getById]);

  // Don't render anything until client-side hydration is complete
  if (!isClient || products.length === 0) return null;

  return (
    <ProductCarousel
      title="Recently Viewed"
      subtitle="Pick up where you left off"
      products={products}
    />
  );
}
