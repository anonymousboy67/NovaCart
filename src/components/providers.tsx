"use client";

import { Product } from "@/lib/types";
import { ProductsProvider } from "@/context/products-context";
import { CartProvider } from "@/context/cart-context";
import { WishlistProvider } from "@/context/wishlist-context";
import { RecentlyViewedProvider } from "@/context/recently-viewed-context";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({
  products,
  children,
}: {
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <ProductsProvider products={products}>
      <CartProvider>
        <WishlistProvider>
          <RecentlyViewedProvider>
            <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
          </RecentlyViewedProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductsProvider>
  );
}
