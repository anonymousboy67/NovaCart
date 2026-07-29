import { Star } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  size?: "sm" | "md";
  showValue?: boolean;
  reviewCount?: number;
  className?: string;
}

export function RatingStars({
  rating,
  size = "sm",
  showValue = false,
  reviewCount,
  className,
}: RatingStarsProps) {
  const starSize = size === "sm" ? "h-3.5 w-3.5" : "h-4.5 w-4.5";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = clampFill(rating - i);
          return (
            <span key={i} className="relative inline-block">
              <Star className={cn(starSize, "text-border")} />
              {fill > 0 && (
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fill * 100}%` }}
                >
                  <Star className={cn(starSize, "text-accent")} weight="fill" />
                </span>
              )}
            </span>
          );
        })}
      </div>
      {showValue && (
        <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
      )}
      {typeof reviewCount === "number" && (
        <span className="text-sm text-foreground-secondary">({reviewCount.toLocaleString()})</span>
      )}
    </div>
  );
}

function clampFill(value: number) {
  return Math.max(0, Math.min(1, value));
}
