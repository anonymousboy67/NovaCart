"use client";

import Link from "next/link";
import { Heart } from "@phosphor-icons/react/ssr";
import { useWishlist } from "@/context/wishlist-context";
import { getProductById } from "@/lib/data/products";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductCard } from "@/components/shared/product-card";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { productIds } = useWishlist();
  const products = productIds
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Wishlist" }]} />
      <h1 className="mb-8 mt-3 text-2xl font-bold text-foreground md:text-3xl">
        Your Wishlist{" "}
        <span className="text-lg font-medium text-foreground-secondary">({products.length})</span>
      </h1>

      {products.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Save products you love by tapping the heart icon — they'll show up here."
          action={
            <Button asChild>
              <Link href="/products">Explore Products</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
