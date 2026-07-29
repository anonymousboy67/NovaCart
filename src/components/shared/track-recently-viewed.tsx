"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/context/recently-viewed-context";

export function TrackRecentlyViewed({ productId }: { productId: string }) {
  const { addProduct } = useRecentlyViewed();

  useEffect(() => {
    addProduct(productId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  return null;
}
