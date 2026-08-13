"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowUUpLeft,
  Heart,
  ShieldCheck,
  ShoppingBag,
  Truck,
  MapPin,
  ShareNetwork,
  Check,
  Info,
} from "@phosphor-icons/react/ssr";
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
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState<{
    available: boolean;
    eta: string;
  } | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showReturnPolicy, setShowReturnPolicy] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  const handleBuyNow = () => {
    addToCart(product.id, quantity);
    router.push("/cart");
  };

  const checkDelivery = () => {
    if (pincode.length === 5 || pincode.length === 6) {
      // Simulate delivery check
      const daysToDeliver = Math.floor(Math.random() * 3) + 2; // 2-4 days
      const deliveryDate = new Date();
      deliveryDate.setDate(deliveryDate.getDate() + daysToDeliver);
      setDeliveryInfo({
        available: true,
        eta: deliveryDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out ${product.name} on NovaCart`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:sticky lg:top-24">
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-primary">
            {product.brand}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleShare}
            className="h-8 w-8 p-0"
            aria-label="Share product"
          >
            {shareSuccess ? (
              <Check className="h-4 w-4 text-success" />
            ) : (
              <ShareNetwork className="h-4 w-4" />
            )}
          </Button>
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

      {/* Delivery check */}
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-background-secondary p-4">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold">Check delivery availability</span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <Button size="sm" variant="outline" onClick={checkDelivery} disabled={pincode.length < 5}>
            Check
          </Button>
        </div>
        {deliveryInfo && (
          <div className="flex items-center gap-2 text-sm text-success animate-fade-in">
            <Check className="h-4 w-4" weight="bold" />
            <span>
              Delivery by <span className="font-semibold">{deliveryInfo.eta}</span>
            </span>
          </div>
        )}
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

      {/* Trust box with expandable return policy */}
      <div className="flex flex-col gap-3 rounded-xl border border-border/70 bg-background-secondary p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          Why shoppers love it
        </p>
        <div className="flex items-center gap-3 text-sm text-foreground-secondary">
          <Truck className="h-4 w-4 shrink-0 text-primary" />
          Free shipping on orders over Rs. 6,650
        </div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => setShowReturnPolicy(!showReturnPolicy)}
            className="flex items-center gap-3 text-sm text-foreground-secondary hover:text-foreground transition-colors group"
          >
            <ArrowUUpLeft className="h-4 w-4 shrink-0 text-primary" />
            <span className="flex-1 text-left">30-day hassle-free returns</span>
            <Info className="h-3.5 w-3.5 opacity-50 group-hover:opacity-100 transition-opacity" />
          </button>
          {showReturnPolicy && (
            <div className="ml-7 pl-4 border-l-2 border-border text-xs text-foreground-secondary space-y-1 animate-fade-in">
              <p>• Return within 30 days of delivery</p>
              <p>• Product must be unused and in original packaging</p>
              <p>• Free return pickup available</p>
              <p>• Refund processed within 5-7 business days</p>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm text-foreground-secondary">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
          2-year warranty included
        </div>
      </div>
    </div>
  );
}
