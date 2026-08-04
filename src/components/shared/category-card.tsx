import Link from "next/link";
import Image from "next/image";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-ring",
        className
      )}
    >
      {/* Category Image */}
      {category.image && (
        <div className="relative aspect-[3/2] overflow-hidden bg-background-secondary">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          />
          {/* Gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* Product count badge */}
          <div className="absolute top-3 right-3 rounded-full bg-card/90 backdrop-blur-sm px-3 py-1 text-xs font-semibold border border-border">
            {category.productCount} items
          </div>
        </div>
      )}

      {/* Category Info */}
      <div className="flex flex-col gap-1 p-4">
        <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
          {category.name}
        </span>
        <span className="text-xs text-foreground-secondary line-clamp-1">
          {category.description}
        </span>
      </div>
    </Link>
  );
}
