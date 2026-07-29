import Link from "next/link";
import * as Icons from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { Category } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryCard({ category, className }: { category: Category; className?: string }) {
  const IconCmp = (Icons as unknown as Record<string, Icon>)[category.icon] ?? Icons.Package;

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className={cn(
        "group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-5 text-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-ring",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary transition-transform duration-200 group-hover:scale-105">
        <IconCmp className="h-6 w-6" weight="duotone" />
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-foreground">{category.name}</span>
        <span className="text-xs text-foreground-secondary">{category.productCount} items</span>
      </div>
    </Link>
  );
}
