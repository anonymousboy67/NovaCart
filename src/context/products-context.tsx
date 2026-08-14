"use client";

import { createContext, useContext, useMemo } from "react";
import { Product } from "@/lib/types";

interface ProductsContextValue {
  products: Product[];
  getById: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

/**
 * Hands the product catalog (fetched once, server-side, in the root layout) to
 * client components that need synchronous lookups — cart totals, filters, wishlist.
 * Server components fetch fresh data per-request directly from `@/lib/data/products`
 * instead, so admin edits always show up there immediately.
 */
export function ProductsProvider({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  const value = useMemo<ProductsContextValue>(() => {
    const byId = new Map(products.map((p) => [p.id, p]));
    return { products, getById: (id) => byId.get(id) };
  }, [products]);

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
