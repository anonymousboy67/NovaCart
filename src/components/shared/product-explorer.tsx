"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FadersHorizontal, MagnifyingGlass, SquaresFour, List } from "@phosphor-icons/react/ssr";
import { Product } from "@/lib/types";
import { getSubcategories } from "@/lib/data/categories";
import { useProducts } from "@/context/products-context";
import { ProductCard } from "@/components/shared/product-card";
import { ProductFilters, DEFAULT_MAX_PRICE, type Filters } from "@/components/shared/product-filters";
import { ActiveFilters } from "@/components/shared/active-filters";
import { SortDropdown, type SortOption } from "@/components/shared/sort-dropdown";
import { Pagination } from "@/components/shared/pagination";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 12;

function sortProducts(items: Product[], sort: SortOption): Product[] {
  const copy = [...items];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => a.price - b.price);
    case "price-desc":
      return copy.sort((a, b) => b.price - a.price);
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating);
    case "newest":
      return copy.sort((a, b) => Number(b.isNew) - Number(a.isNew));
    case "best-selling":
      return copy.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller));
    default:
      return copy;
  }
}

type ViewMode = "grid" | "list";

/**
 * Renders the results grid and its own pagination state. Keyed by the parent
 * on the active filters/sort/query so that changing any of them remounts
 * this component and naturally resets to page 1 — no effects required.
 */
function ResultsGrid({
  products,
  loading,
  viewMode,
  onClearFilters,
}: {
  products: Product[];
  loading: boolean;
  viewMode: ViewMode;
  onClearFilters: () => void;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const paginated = products.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (loading) {
    return (
      <div className={cn(
        viewMode === "grid"
          ? "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
          : "flex flex-col gap-4"
      )}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-3">
            <Skeleton className="aspect-square w-full rounded-xl" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (paginated.length === 0) {
    return (
      <EmptyState
        icon={MagnifyingGlass}
        title="No products found"
        description="Try adjusting your filters or search terms to find what you're looking for."
        action={
          <Button variant="outline" onClick={onClearFilters}>
            Clear filters
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div
        className={cn(
          viewMode === "grid"
            ? "grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4"
            : "flex flex-col gap-4"
        )}
      >
        {paginated.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            className={viewMode === "list" ? "flex-row" : ""}
          />
        ))}
      </div>
      <div className="mt-10">
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </>
  );
}

export function ProductExplorer({ searchQuery }: { searchQuery?: string }) {
  const { products: allProducts } = useProducts();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [filters, setFilters] = useState<Filters>({
    categoryIds: searchParams.get("category")
      ? [searchParams.get("category") as string]
      : [],
    subcategoryIds: searchParams.get("subcategory")
      ? [searchParams.get("subcategory") as string]
      : [],
    brands: searchParams.get("brand") ? [searchParams.get("brand") as string] : [],
    maxPrice: DEFAULT_MAX_PRICE,
    minRating: 0,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortOption>(
    (searchParams.get("sort") as SortOption) ?? "relevance"
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 350);
    return () => clearTimeout(timer);
  }, []);

  const filtered = useMemo(() => {
    let items = allProducts;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q)) ||
          p.subtitle.toLowerCase().includes(q)
      );
    }

    if (filters.categoryIds.length > 0) {
      items = items.filter((p) => filters.categoryIds.includes(p.categoryId));
    }
    if (filters.subcategoryIds.length > 0) {
      items = items.filter((p) => filters.subcategoryIds.includes(p.subcategoryId ?? ""));
    }
    if (filters.brands.length > 0) {
      items = items.filter((p) => filters.brands.includes(p.brand));
    }
    items = items.filter((p) => p.price <= filters.maxPrice);
    if (filters.minRating > 0) {
      items = items.filter((p) => p.rating >= filters.minRating);
    }
    if (filters.inStockOnly) {
      items = items.filter((p) => p.stock > 0);
    }

    return sortProducts(items, sort);
  }, [allProducts, filters, sort, searchQuery]);

  const resetKey = `${JSON.stringify(filters)}|${sort}|${searchQuery ?? ""}`;

  const updateFilters = (next: Filters) => {
    setFilters(next);
    const params = new URLSearchParams(searchParams.toString());
    if (next.categoryIds.length === 1) {
      params.set("category", next.categoryIds[0]);
    } else {
      params.delete("category");
    }
    if (next.subcategoryIds.length === 1) {
      params.set("subcategory", next.subcategoryIds[0]);
    } else {
      params.delete("subcategory");
    }
    if (next.brands.length === 1) {
      params.set("brand", next.brands[0]);
    } else {
      params.delete("brand");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () =>
    updateFilters({
      categoryIds: [],
      subcategoryIds: [],
      brands: [],
      maxPrice: DEFAULT_MAX_PRICE,
      minRating: 0,
      inStockOnly: false,
    });

  const removeCategory = (categoryId: string) => {
    const nextCategoryIds = filters.categoryIds.filter((id) => id !== categoryId);
    const validSubIds = nextCategoryIds.flatMap((c) => getSubcategories(c).map((s) => s.id));
    updateFilters({
      ...filters,
      categoryIds: nextCategoryIds,
      subcategoryIds: filters.subcategoryIds.filter((id) => validSubIds.includes(id)),
    });
  };

  const removeSubcategory = (subcategoryId: string) => {
    updateFilters({
      ...filters,
      subcategoryIds: filters.subcategoryIds.filter((id) => id !== subcategoryId),
    });
  };

  const removeBrand = (brand: string) => {
    updateFilters({ ...filters, brands: filters.brands.filter((b) => b !== brand) });
  };

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
      <aside className="hidden w-[240px] shrink-0 lg:block">
        <ProductFilters filters={filters} onChange={updateFilters} />
      </aside>

      <div className="flex-1">
        <div className="mb-6 flex items-center justify-between gap-3">
          <p className="text-sm text-foreground-secondary">
            {filtered.length} {filtered.length === 1 ? "product" : "products"}
          </p>
          <div className="flex items-center gap-2">
            {/* View mode toggle */}
            <div className="hidden sm:flex items-center gap-1 rounded-lg border border-border p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded transition-colors focus-ring",
                  viewMode === "grid"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-secondary hover:bg-background-secondary"
                )}
                aria-label="Grid view"
              >
                <SquaresFour className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded transition-colors focus-ring",
                  viewMode === "list"
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground-secondary hover:bg-background-secondary"
                )}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </button>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <FadersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetTitle className="mb-2">Filters</SheetTitle>
                <ProductFilters filters={filters} onChange={updateFilters} />
              </SheetContent>
            </Sheet>
            <SortDropdown value={sort} onChange={setSort} />
          </div>
        </div>

        {/* Active filters chips */}
        <div className="mb-6">
          <ActiveFilters
            filters={filters}
            onRemoveCategory={removeCategory}
            onRemoveSubcategory={removeSubcategory}
            onRemoveBrand={removeBrand}
            onResetMaxPrice={() => updateFilters({ ...filters, maxPrice: DEFAULT_MAX_PRICE })}
            onResetMinRating={() => updateFilters({ ...filters, minRating: 0 })}
            onResetInStock={() => updateFilters({ ...filters, inStockOnly: false })}
            onClearAll={clearFilters}
          />
        </div>

        <ResultsGrid
          key={resetKey}
          products={filtered}
          loading={loading}
          viewMode={viewMode}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
}
