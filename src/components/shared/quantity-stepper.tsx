"use client";

import { Minus, Plus } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  className?: string;
}

export function QuantityStepper({
  quantity,
  onChange,
  min = 1,
  max = 99,
  size = "md",
  className,
}: QuantityStepperProps) {
  const height = size === "sm" ? "h-9" : "h-11";
  const width = size === "sm" ? "w-9" : "w-11";

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg border border-border bg-background",
        height,
        className
      )}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
        className={cn(
          "flex items-center justify-center text-foreground-secondary transition-colors hover:text-foreground disabled:opacity-30 focus-ring",
          height,
          width
        )}
        aria-label="Decrease quantity"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-9 flex-1 select-none text-center text-sm font-semibold tabular-nums">
        {quantity}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
        className={cn(
          "flex items-center justify-center text-foreground-secondary transition-colors hover:text-foreground disabled:opacity-30 focus-ring",
          height,
          width
        )}
        aria-label="Increase quantity"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
