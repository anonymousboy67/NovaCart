"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";

/** Storefront chrome (nav + footer) everywhere except the admin panel, which has its own shell. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const isAdmin = usePathname()?.startsWith("/admin");

  if (isAdmin) return <main className="flex-1">{children}</main>;

  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
