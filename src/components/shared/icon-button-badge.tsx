"use client";

import Link from "next/link";
import { type Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface IconButtonBadgeProps {
  href: string;
  icon: Icon;
  count?: number;
  label: string;
  className?: string;
}

export function IconButtonBadge({ href, icon: IconCmp, count = 0, label, className }: IconButtonBadgeProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors duration-150 hover:bg-background-secondary hover:text-foreground focus-ring",
        className
      )}
    >
      <IconCmp className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold leading-none text-accent-foreground">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
