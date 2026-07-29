"use client";

import { useRef } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/ssr";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/shared/product-card";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  viewAllHref?: string;
}

export function ProductCarousel({ title, subtitle, products, viewAllHref }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const node = scrollRef.current;
    if (!node) return;
    const amount = node.clientWidth * 0.8;
    node.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="container-page py-10 md:py-14">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground md:text-2xl">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-foreground-secondary">{subtitle}</p>}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={() => scroll("left")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:bg-background-secondary focus-ring"
            aria-label="Scroll left"
          >
            <CaretLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:bg-background-secondary focus-ring"
            aria-label="Scroll right"
          >
            <CaretRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} className="w-[220px] shrink-0 sm:w-[240px]" />
        ))}
      </div>

      {viewAllHref && (
        <div className="mt-6 text-center">
          <a
            href={viewAllHref}
            className="text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
          >
            View all →
          </a>
        </div>
      )}
    </section>
  );
}
