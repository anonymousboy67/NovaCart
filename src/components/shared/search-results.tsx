"use client";

import { useSearchParams } from "next/navigation";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductExplorer } from "@/components/shared/product-explorer";

export function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Search Results" }]} />
      <h1 className="mb-1 mt-3 text-2xl font-bold text-foreground md:text-3xl">
        {query ? `Results for "${query}"` : "Search"}
      </h1>
      <p className="mb-8 text-sm text-foreground-secondary">
        {query
          ? `Showing the best matches for “${query}” across NovaCart.`
          : "Enter a search term above to get started."}
      </p>
      <ProductExplorer searchQuery={query} />
    </div>
  );
}
