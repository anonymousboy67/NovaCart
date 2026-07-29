"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { Heart, List, ShoppingBag, User, CaretDown, Package } from "@phosphor-icons/react/ssr";
import * as Icons from "@phosphor-icons/react/ssr";
import type { Icon } from "@phosphor-icons/react";
import { categories } from "@/lib/data/categories";
import { useCart } from "@/context/cart-context";
import { useWishlist } from "@/context/wishlist-context";
import { SearchBar } from "@/components/shared/search-bar";
import { IconButtonBadge } from "@/components/shared/icon-button-badge";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background/95 backdrop-blur transition-shadow duration-200",
        scrolled ? "shadow-sm" : "border-b border-border"
      )}
    >
      <div className="container-page flex h-16 items-center gap-4 md:gap-6">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-background-secondary md:hidden"
          onClick={() => setMobileOpen(true)}
          aria-label="Open menu"
        >
          <List className="h-5 w-5" />
        </button>

        <Link href="/" className="flex shrink-0 items-center gap-2 focus-ring rounded-md">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            N
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-foreground">NovaCart</span>
        </Link>

        <nav className="group relative hidden shrink-0 lg:block">
          <button className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-background-secondary">
            Categories
            <CaretDown className="h-3.5 w-3.5 text-foreground-secondary transition-transform duration-150 group-hover:rotate-180" />
          </button>
          <div className="invisible absolute left-0 top-full grid w-[560px] grid-cols-2 gap-1 rounded-xl border border-border bg-card p-3 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:opacity-100">
            {categories.map((category) => {
              const IconCmp = (Icons as unknown as Record<string, Icon>)[category.icon] ?? Package;
              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-background-secondary"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
                    <IconCmp className="h-4.5 w-4.5" weight="duotone" />
                  </span>
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{category.name}</span>
                    <span className="text-xs text-foreground-secondary">{category.productCount} items</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="hidden flex-1 md:block">
          <Suspense fallback={<div className="h-11 max-w-xl rounded-lg bg-background-secondary" />}>
            <SearchBar className="max-w-xl" />
          </Suspense>
        </div>

        <div className="ml-auto flex items-center gap-0.5">
          <IconButtonBadge href="/wishlist" icon={Heart} count={wishlistCount} label="Wishlist" />
          <IconButtonBadge href="/cart" icon={ShoppingBag} count={cartCount} label="Cart" />
          <Link
            href="/profile"
            aria-label="Profile"
            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-foreground-secondary transition-colors hover:bg-background-secondary hover:text-foreground focus-ring"
          >
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="border-t border-border px-4 py-2.5 md:hidden">
        <Suspense fallback={<div className="h-11 rounded-lg bg-background-secondary" />}>
          <SearchBar />
        </Suspense>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="max-w-[300px]">
          <SheetTitle className="mb-2">Menu</SheetTitle>
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-background-secondary"
            >
              Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-background-secondary"
            >
              All Products
            </Link>
            <Link
              href="/categories"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-background-secondary"
            >
              Categories
            </Link>
            <div className="my-2 border-t border-border" />
            <span className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
              Shop by category
            </span>
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
              >
                {category.name}
              </Link>
            ))}
            <div className="my-2 border-t border-border" />
            <Link
              href="/profile"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-background-secondary"
            >
              My Profile
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
