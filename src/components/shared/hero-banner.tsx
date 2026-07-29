"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  return (
    <section className="border-b border-border bg-background-secondary">
      <div className="container-page grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <span className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary">
            New Season Arrivals
          </span>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Everyday essentials,
            <br />
            thoughtfully curated.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-foreground-secondary">
            Discover electronics, fashion, home and beauty picks chosen for quality — not
            just quantity. Free shipping on orders over $50.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative aspect-[4/3] overflow-hidden rounded-2xl"
        >
          <Image
            src="https://picsum.photos/seed/novacart-hero/1200/900"
            alt="Featured NovaCart products"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
