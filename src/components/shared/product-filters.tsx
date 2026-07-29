"use client";

import { categories } from "@/lib/data/categories";
import { Checkbox } from "@/components/ui/checkbox";
import { RatingStars } from "@/components/shared/rating-stars";
import { cn } from "@/lib/utils";

export interface Filters {
  categoryIds: string[];
  maxPrice: number;
  minRating: number;
}

export const DEFAULT_MAX_PRICE = 1500;

export function ProductFilters({
  filters,
  onChange,
  className,
}: {
  filters: Filters;
  onChange: (filters: Filters) => void;
  className?: string;
}) {
  const toggleCategory = (id: string) => {
    const next = filters.categoryIds.includes(id)
      ? filters.categoryIds.filter((c) => c !== id)
      : [...filters.categoryIds, id];
    onChange({ ...filters, categoryIds: next });
  };

  const hasActiveFilters =
    filters.categoryIds.length > 0 || filters.maxPrice < DEFAULT_MAX_PRICE || filters.minRating > 0;

  return (
    <div className={cn("flex flex-col gap-7", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ categoryIds: [], maxPrice: DEFAULT_MAX_PRICE, minRating: 0 })}
            className="text-xs font-semibold text-primary hover:text-primary-hover"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          Category
        </h4>
        <div className="flex flex-col gap-2.5">
          {categories.map((category) => (
            <label key={category.id} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox
                checked={filters.categoryIds.includes(category.id)}
                onCheckedChange={() => toggleCategory(category.id)}
              />
              <span className="text-sm text-foreground">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            Max Price
          </h4>
          <span className="text-sm font-semibold text-foreground">${filters.maxPrice}</span>
        </div>
        <input
          type="range"
          min={20}
          max={DEFAULT_MAX_PRICE}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-border accent-primary"
        />
      </div>

      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          Minimum Rating
        </h4>
        <div className="flex flex-col gap-2">
          {[4, 3, 2].map((rating) => (
            <button
              key={rating}
              onClick={() => onChange({ ...filters, minRating: filters.minRating === rating ? 0 : rating })}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-colors",
                filters.minRating === rating
                  ? "border-primary bg-primary-light/50"
                  : "border-border hover:bg-background-secondary"
              )}
            >
              <RatingStars rating={rating} />
              <span className="text-xs text-foreground-secondary">& up</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
