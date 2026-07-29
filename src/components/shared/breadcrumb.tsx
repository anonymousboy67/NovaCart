import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/ssr";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className="flex items-center gap-1.5">
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="text-foreground-secondary transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? "font-medium text-foreground" : "text-foreground-secondary"}>
                {item.label}
              </span>
            )}
            {!isLast && <CaretRight className="h-3.5 w-3.5 text-foreground-secondary/60" />}
          </span>
        );
      })}
    </nav>
  );
}
