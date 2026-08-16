"use client";

import { X } from "@phosphor-icons/react/ssr";
import { categories, getSubcategories } from "@/lib/data/categories";
import { Filters, DEFAULT_MAX_PRICE } from "@/components/shared/product-filters";
import { formatPrice } from "@/lib/utils";

interface ActiveFiltersProps {
  filters: Filters;
  onRemoveCategory: (categoryId: string) => void;
  onRemoveSubcategory: (subcategoryId: string) => void;
  onRemoveBrand: (brand: string) => void;
  onResetMaxPrice: () => void;
  onResetMinRating: () => void;
  onResetInStock: () => void;
  onClearAll: () => void;
}

export function ActiveFilters({
  filters,
  onRemoveCategory,
  onRemoveSubcategory,
  onRemoveBrand,
  onResetMaxPrice,
  onResetMinRating,
  onResetInStock,
  onClearAll,
}: ActiveFiltersProps) {
  const hasActiveFilters =
    filters.categoryIds.length > 0 ||
    filters.subcategoryIds.length > 0 ||
    filters.brands.length > 0 ||
    filters.maxPrice < DEFAULT_MAX_PRICE ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  if (!hasActiveFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background-secondary p-3">
      <span className="text-xs font-semibold text-foreground-secondary">Active filters:</span>

      {/* Category chips */}
      {filters.categoryIds.map((categoryId) => {
        const category = categories.find((c) => c.id === categoryId);
        if (!category) return null;
        return (
          <button
            key={categoryId}
            onClick={() => onRemoveCategory(categoryId)}
            className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-ring"
          >
            {category.name}
            <X className="h-3 w-3" weight="bold" />
          </button>
        );
      })}

      {/* Subcategory chips */}
      {filters.subcategoryIds.map((subcategoryId) => {
        const subcategory = filters.categoryIds
          .flatMap((c) => getSubcategories(c))
          .find((s) => s.id === subcategoryId);
        if (!subcategory) return null;
        return (
          <button
            key={subcategoryId}
            onClick={() => onRemoveSubcategory(subcategoryId)}
            className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-ring"
          >
            {subcategory.name}
            <X className="h-3 w-3" weight="bold" />
          </button>
        );
      })}

      {/* Brand chips */}
      {filters.brands.map((brand) => (
        <button
          key={brand}
          onClick={() => onRemoveBrand(brand)}
          className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-ring"
        >
          {brand}
          <X className="h-3 w-3" weight="bold" />
        </button>
      ))}

      {/* Max price chip */}
      {filters.maxPrice < DEFAULT_MAX_PRICE && (
        <button
          onClick={onResetMaxPrice}
          className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-ring"
        >
          Max {formatPrice(filters.maxPrice)}
          <X className="h-3 w-3" weight="bold" />
        </button>
      )}

      {/* Min rating chip */}
      {filters.minRating > 0 && (
        <button
          onClick={onResetMinRating}
          className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-ring"
        >
          {filters.minRating}+ stars
          <X className="h-3 w-3" weight="bold" />
        </button>
      )}

      {/* In stock chip */}
      {filters.inStockOnly && (
        <button
          onClick={onResetInStock}
          className="flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 focus-ring"
        >
          In stock only
          <X className="h-3 w-3" weight="bold" />
        </button>
      )}

      {/* Clear all button */}
      <button
        onClick={onClearAll}
        className="ml-auto text-xs font-semibold text-foreground-secondary hover:text-foreground transition-colors"
      >
        Clear all
      </button>
    </div>
  );
}
