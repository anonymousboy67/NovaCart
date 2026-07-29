import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/ssr";

export function PromoBanner() {
  return (
    <section className="container-page py-10 md:py-14">
      <div className="flex flex-col items-start gap-6 rounded-2xl bg-accent px-8 py-12 text-accent-foreground md:flex-row md:items-center md:justify-between md:px-14">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-white">Limited Time</span>
          <h3 className="font-display text-2xl font-semibold md:text-3xl">Up to 30% off select electronics</h3>
          <p className="max-w-md text-sm text-white/80">
            Ends August 5 — free shipping included on every order, no minimum.
          </p>
        </div>
        <Link
          href="/products?category=electronics"
          className="flex shrink-0 items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-accent transition-colors hover:bg-accent-light"
        >
          Shop the Sale
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
