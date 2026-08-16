"use client";

import { categories, getSubcategories } from "@/lib/data/categories";
import { useProducts } from "@/context/products-context";
import { Checkbox } from "@/components/ui/checkbox";
import { RatingStars } from "@/components/shared/rating-stars";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface Filters {
  categoryIds: string[];
  subcategoryIds: string[];
  brands: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

// Max price in USD before conversion
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
  const { products } = useProducts();

  const toggleCategory = (id: string) => {
    const next = filters.categoryIds.includes(id)
      ? filters.categoryIds.filter((c) => c !== id)
      : [...filters.categoryIds, id];
    // Drop subcategory selections that no longer belong to a checked category.
    const validSubIds = next.flatMap((c) => getSubcategories(c).map((s) => s.id));
    onChange({
      ...filters,
      categoryIds: next,
      subcategoryIds: filters.subcategoryIds.filter((s) => validSubIds.includes(s)),
    });
  };

  const toggleSubcategory = (id: string) => {
    const next = filters.subcategoryIds.includes(id)
      ? filters.subcategoryIds.filter((s) => s !== id)
      : [...filters.subcategoryIds, id];
    onChange({ ...filters, subcategoryIds: next });
  };

  const toggleBrand = (brand: string) => {
    const next = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onChange({ ...filters, brands: next });
  };

  // Count products per category
  const getCategoryCount = (categoryId: string) => {
    return products.filter((p) => p.categoryId === categoryId).length;
  };

  // Subcategories only make sense once at least one category is picked.
  const availableSubcategories = filters.categoryIds.flatMap((c) => getSubcategories(c));
  const getSubcategoryCount = (subcategoryId: string) =>
    products.filter((p) => p.subcategoryId === subcategoryId).length;

  // Brands are scoped to whatever category/subcategory filters are active.
  const brandScopedProducts = products.filter((p) => {
    if (filters.categoryIds.length > 0 && !filters.categoryIds.includes(p.categoryId)) return false;
    if (filters.subcategoryIds.length > 0 && !filters.subcategoryIds.includes(p.subcategoryId ?? "")) return false;
    return true;
  });
  const availableBrands = Array.from(
    new Set(brandScopedProducts.map((p) => p.brand).filter(Boolean))
  ).sort();
  const getBrandCount = (brand: string) => brandScopedProducts.filter((p) => p.brand === brand).length;

  const hasActiveFilters =
    filters.categoryIds.length > 0 ||
    filters.subcategoryIds.length > 0 ||
    filters.brands.length > 0 ||
    filters.maxPrice < DEFAULT_MAX_PRICE ||
    filters.minRating > 0 ||
    filters.inStockOnly;

  return (
    <div className={cn("flex flex-col gap-7", className)}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={() =>
              onChange({
                categoryIds: [],
                subcategoryIds: [],
                brands: [],
                maxPrice: DEFAULT_MAX_PRICE,
                minRating: 0,
                inStockOnly: false,
              })
            }
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
          {categories.map((category) => {
            const count = getCategoryCount(category.id);
            return (
              <label key={category.id} className="flex cursor-pointer items-center gap-2.5">
                <Checkbox
                  checked={filters.categoryIds.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <span className="flex-1 text-sm text-foreground">{category.name}</span>
                <span className="text-xs text-foreground-secondary">({count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {availableSubcategories.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            Subcategory
          </h4>
          <div className="flex flex-col gap-2.5">
            {availableSubcategories.map((subcategory) => {
              const count = getSubcategoryCount(subcategory.id);
              return (
                <label key={subcategory.id} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.subcategoryIds.includes(subcategory.id)}
                    onCheckedChange={() => toggleSubcategory(subcategory.id)}
                  />
                  <span className="flex-1 text-sm text-foreground">{subcategory.name}</span>
                  <span className="text-xs text-foreground-secondary">({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {availableBrands.length > 0 && (
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            Brand
          </h4>
          <div className="flex flex-col gap-2.5">
            {availableBrands.map((brand) => {
              const count = getBrandCount(brand);
              return (
                <label key={brand} className="flex cursor-pointer items-center gap-2.5">
                  <Checkbox
                    checked={filters.brands.includes(brand)}
                    onCheckedChange={() => toggleBrand(brand)}
                  />
                  <span className="flex-1 text-sm text-foreground">{brand}</span>
                  <span className="text-xs text-foreground-secondary">({count})</span>
                </label>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
            Max Price
          </h4>
          <span className="text-sm font-semibold text-foreground">{formatPrice(filters.maxPrice)}</span>
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

      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
          Availability
        </h4>
        <label className="flex cursor-pointer items-center gap-2.5">
          <Checkbox
            checked={filters.inStockOnly}
            onCheckedChange={(checked) => onChange({ ...filters, inStockOnly: !!checked })}
          />
          <span className="text-sm text-foreground">In stock only</span>
        </label>
      </div>
    </div>
  );
}
