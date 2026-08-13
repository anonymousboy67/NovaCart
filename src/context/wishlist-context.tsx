"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { initialWishlistProductIds } from "@/lib/data/mock-state";
import { readStorage, writeStorage } from "@/lib/utils";

interface WishlistContextValue {
  productIds: string[];
  isWishlisted: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [productIds, setProductIds] = useState<string[]>(initialWishlistProductIds);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load wishlist from localStorage after hydration
  useEffect(() => {
    const storedWishlist = readStorage<string[]>("novacart-wishlist", initialWishlistProductIds);
    setProductIds(storedWishlist);
    setIsHydrated(true);
  }, []);

  // Persist wishlist to localStorage when it changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      writeStorage("novacart-wishlist", productIds);
    }
  }, [productIds, isHydrated]);

  const isWishlisted = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const toggleWishlist = useCallback((productId: string) => {
    setProductIds((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setProductIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const value = useMemo(
    () => ({
      productIds,
      isWishlisted,
      toggleWishlist,
      removeFromWishlist,
      wishlistCount: productIds.length,
    }),
    [productIds, isWishlisted, toggleWishlist, removeFromWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
