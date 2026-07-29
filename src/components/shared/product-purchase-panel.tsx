"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUUpLeft, Heart, ShieldCheck, ShoppingBag, Truck } from "@phosphor-icons/react/ssr";
import { Product } from "@/lib/types";
import { Price, DiscountBadge } from "@/components/shared/price-badge";
import { RatingStars } from "@/components/shared/rating-stars";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { cn } from "@/lib/utils";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState(product.colors?.[0]);

  const wishlisted = isWishlisted(product.id);
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    router.push("/cart");
  };

  return (
    <div className="flex flex-col gap-5 lg:sticky lg:top-24">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
          {product.brand}
        </div>
        <h1 className="text-2xl font-bold leading-snug text-foreground md:text-3xl">
          {product.name}
        </h1>
        <p className="text-sm text-foreground-secondary">{product.subtitle}</p>
        <RatingStars rating={product.rating} showValue reviewCount={product.reviewCount} />
      </div>

      <div className="flex items-center gap-3 border-y border-border py-4">
        <Price price={product.price} originalPrice={product.originalPrice} size="lg" />
        <DiscountBadge price={product.price} originalPrice={product.originalPrice} />
      </div>

      <div className="flex items-center gap-2 text-sm font-medium">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            inStock ? (lowStock ? "bg-warning" : "bg-success") : "bg-error"
          )}
        />
        {inStock ? (lowStock ? `Only ${product.stock} left in stock` : "In stock") : "Out of stock"}
      </div>

      {product.colors && (
        <div className="flex flex-col gap-2.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            Color: <span className="text-foreground">{color}</span>
          </span>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={cn(
                  "rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  color === c
                    ? "border-primary bg-primary-light text-primary"
                    : "border-border text-foreground-secondary hover:border-foreground/30"
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2.5">
        <span className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          Quantity
        </span>
        <QuantityStepper quantity={quantity} onChange={setQuantity} max={product.stock} />
      </div>

      <div className="flex flex-col gap-2.5 sm:flex-row">
        <Button
          size="lg"
          variant="outline"
          className="flex-1"
          onClick={() => addToCart(product.id, quantity)}
          disabled={!inStock}
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </Button>
        <Button size="lg" className="flex-1" onClick={handleBuyNow} disabled={!inStock}>
          Buy Now
        </Button>
        <Button
          size="icon"
          variant="outline"
          className={cn("h-13 w-13 shrink-0", wishlisted && "border-accent text-accent")}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
        >
          <Heart className="h-4.5 w-4.5" weight={wishlisted ? "fill" : "regular"} />
        </Button>
      </div>

      <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background-secondary p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          Why shoppers love it
        </p>
        <div className="flex items-center gap-3 text-sm text-foreground-secondary">
          <Truck className="h-4 w-4 shrink-0 text-primary" />
          Free shipping on orders over $50
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground-secondary">
          <ArrowUUpLeft className="h-4 w-4 shrink-0 text-primary" />
          30-day hassle-free returns
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground-secondary">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          2-year warranty included
        </div>
      </div>
    </div>
  );
}
