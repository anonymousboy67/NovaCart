"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SquaresFour, Package, MapPin, Heart, Gear, SignOut } from "@phosphor-icons/react/ssr";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { currentUser } from "@/lib/data/user";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/profile", icon: SquaresFour },
  { label: "Orders", href: "/profile/orders", icon: Package },
  { label: "Addresses", href: "/profile/addresses", icon: MapPin },
  { label: "Wishlist", href: "/wishlist", icon: Heart },
  { label: "Settings", href: "/profile/settings", icon: Gear },
];

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export function ProfileSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-64">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-5">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="text-base">{initials(currentUser.name)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-bold text-foreground">{currentUser.name}</p>
          <p className="truncate text-xs text-foreground-secondary">{currentUser.email}</p>
        </div>
      </div>

      <nav className="flex flex-row gap-1 overflow-x-auto rounded-xl border border-border bg-card p-2 lg:flex-col lg:overflow-visible">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-light text-primary"
                  : "text-foreground-secondary hover:bg-background-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
        <button className="flex shrink-0 items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium text-error/90 transition-colors hover:bg-error/5">
          <SignOut className="h-4.5 w-4.5" />
          Logout
        </button>
      </nav>
    </aside>
  );
}
