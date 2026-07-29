"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { recentlyViewedProductIds } from "@/lib/data/mock-state";
import { readStorage, writeStorage } from "@/lib/utils";

interface RecentlyViewedContextValue {
  productIds: string[];
  addProduct: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | undefined>(undefined);

const MAX_ITEMS = 10;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(() => readStorage<string[]>("novacart-recently-viewed", recentlyViewedProductIds));

  useEffect(() => {
    writeStorage("novacart-recently-viewed", productIds);
  }, [productIds]);

  const addProduct = useCallback((productId: string) => {
    setProductIds((prev) => [productId, ...prev.filter((id) => id !== productId)].slice(0, MAX_ITEMS));
  }, []);

  const value = useMemo(() => ({ productIds, addProduct }), [productIds, addProduct]);

  return (
    <RecentlyViewedContext.Provider value={value}>{children}</RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}
