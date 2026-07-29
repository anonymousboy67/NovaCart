"use client";

import { CaretLeft, CaretRight } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1
  );

  const items: (number | "ellipsis")[] = [];
  let last = 0;
  for (const p of pages) {
    if (p - last > 1) items.push("ellipsis");
    items.push(p);
    last = p;
  }

  return (
    <nav className="flex items-center justify-center gap-1.5" aria-label="Pagination">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-secondary transition-colors hover:bg-background-secondary disabled:opacity-40 disabled:hover:bg-transparent focus-ring"
        aria-label="Previous page"
      >
        <CaretLeft className="h-4 w-4" />
      </button>

      {items.map((item, idx) =>
        item === "ellipsis" ? (
          <span key={`e-${idx}`} className="px-1.5 text-sm text-foreground-secondary">
            …
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-colors focus-ring",
              item === page
                ? "bg-primary text-primary-foreground"
                : "text-foreground-secondary hover:bg-background-secondary"
            )}
            aria-current={item === page ? "page" : undefined}
          >
            {item}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground-secondary transition-colors hover:bg-background-secondary disabled:opacity-40 disabled:hover:bg-transparent focus-ring"
        aria-label="Next page"
      >
        <CaretRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
