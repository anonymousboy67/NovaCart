"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { products } from "@/lib/data/products";
import { initialWishlistProductIds } from "@/lib/data/mock-state";
import { toast } from "sonner";

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

  const isWishlisted = useCallback(
    (productId: string) => productIds.includes(productId),
    [productIds]
  );

  const toggleWishlist = useCallback((productId: string) => {
    const product = products.find((p) => p.id === productId);
    setProductIds((prev) => {
      if (prev.includes(productId)) {
        toast(`Removed ${product?.name ?? "item"} from wishlist`);
        return prev.filter((id) => id !== productId);
      }
      toast.success(`Added ${product?.name ?? "item"} to wishlist`);
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
