import Link from "next/link";
import { InstagramLogo, TwitterLogo, YoutubeLogo, FacebookLogo } from "@phosphor-icons/react/ssr";
import { categories } from "@/lib/data/categories";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
      { label: "Best Sellers", href: "/products?sort=best-selling" },
      { label: "New Arrivals", href: "/products?sort=newest" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Track Order", href: "/profile/orders" },
      { label: "Shipping & Returns", href: "/" },
      { label: "FAQs", href: "/" },
      { label: "Contact Us", href: "/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About PasalMandu", href: "/" },
      { label: "Careers", href: "/" },
      { label: "Sustainability", href: "/" },
      { label: "Press", href: "/" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="container-page grid grid-cols-2 gap-10 py-14 md:grid-cols-6">
        <div className="col-span-2 flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-display text-lg font-semibold tracking-tight text-foreground">
              Pasal<span className="text-accent">Mandu</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-foreground-secondary">
            Thoughtfully curated products, delivered with care. PasalMandu is a premium marketplace
            built around quality, simplicity and trust.
          </p>
          <div className="flex items-center gap-2">
            {[InstagramLogo, TwitterLogo, YoutubeLogo, FacebookLogo].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground-secondary transition-colors hover:border-primary hover:text-primary"
                aria-label="Social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title} className="flex flex-col gap-3">
            <h4 className="text-sm font-bold text-foreground">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="col-span-2 flex flex-col gap-3 md:col-span-1">
          <h4 className="text-sm font-bold text-foreground">Categories</h4>
          <ul className="flex flex-col gap-2.5">
            {categories.slice(0, 5).map((category) => (
              <li key={category.id}>
                <Link
                  href={`/products?category=${category.slug}`}
                  className="text-sm text-foreground-secondary transition-colors hover:text-foreground"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-foreground-secondary md:flex-row">
          <span>© {new Date().getFullYear()} PasalMandu. All rights reserved.</span>
          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
