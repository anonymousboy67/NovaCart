"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingBag } from "@phosphor-icons/react/ssr";
import { Product } from "@/lib/types";
import { RatingStars } from "@/components/shared/rating-stars";
import { Price, DiscountBadge } from "@/components/shared/price-badge";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";

export function ProductCard({ product, className }: { product: Product; className?: string }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <Link href={`/products/${product.slug}`} className="block focus-ring rounded-t-xl">
        <div className="relative aspect-square overflow-hidden rounded-t-xl bg-background-secondary">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />

          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.isNew && (
              <span className="rounded-md bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                New
              </span>
            )}
            <DiscountBadge price={product.price} originalPrice={product.originalPrice} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product.id);
            }}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className={cn(
              "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow-xs backdrop-blur transition-colors focus-ring",
              wishlisted ? "text-accent" : "text-foreground-secondary hover:text-foreground"
            )}
          >
            <Heart className="h-4 w-4" weight={wishlisted ? "fill" : "regular"} />
          </button>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex flex-col gap-0.5">
          <Link href={`/products/${product.slug}`} className="focus-ring rounded-sm">
            <h3 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">{product.name}</h3>
          </Link>
          <p className="line-clamp-1 text-xs text-foreground-secondary">{product.subtitle}</p>
        </div>

        <RatingStars rating={product.rating} reviewCount={product.reviewCount} />

        <div className="mt-auto flex items-center justify-between pt-1">
          <Price price={product.price} originalPrice={product.originalPrice} />
        </div>

        <button
          type="button"
          onClick={() => addToCart(product.id)}
          className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-accent-foreground transition-all duration-200 ease-out hover:bg-accent-hover focus-ring md:opacity-0 md:group-hover:opacity-100"
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
