import { formatPrice, discountPercent } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface PriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Price({ price, originalPrice, size = "md", className }: PriceProps) {
  const sizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-2xl",
  };
  const originalSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      <span className={cn("font-bold text-foreground", sizes[size])}>{formatPrice(price)}</span>
      {originalPrice && originalPrice > price && (
        <span className={cn("text-foreground-secondary line-through", originalSizes[size])}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}

export function DiscountBadge({
  price,
  originalPrice,
  className,
}: {
  price: number;
  originalPrice?: number;
  className?: string;
}) {
  const percent = discountPercent(price, originalPrice);
  if (percent <= 0) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md bg-error/10 px-2 py-0.5 text-xs font-bold text-error",
        className
      )}
    >
      -{percent}%
    </span>
  );
}
