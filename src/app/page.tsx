import { HeroBanner } from "@/components/shared/hero-banner";
import { CategoryCard } from "@/components/shared/category-card";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { PromoBanner } from "@/components/shared/promo-banner";
import { RecentlyViewedSection } from "@/components/shared/recently-viewed-section";
import { ShieldCheck, Truck, Sparkle } from "@phosphor-icons/react/ssr";
import { categories } from "@/lib/data/categories";
import {
  featuredProducts,
  trendingProducts,
  bestSellerProducts,
} from "@/lib/data/products";

export default function HomePage() {
  return (
    <>
      <HeroBanner />

      <section className="container-page py-10 md:py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-xl font-bold text-foreground md:text-2xl">Shop by Category</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <div className="border-t border-border">
        <ProductCarousel
          title="Featured Products"
          subtitle="Hand-picked favorites this week"
          products={featuredProducts}
          viewAllHref="/products"
        />
      </div>

      <div className="border-t border-border bg-background-secondary">
        <ProductCarousel
          title="Trending Now"
          subtitle="What everyone's adding to cart"
          products={trendingProducts}
          viewAllHref="/products?sort=trending"
        />
      </div>

      <div className="border-t border-border">
        <ProductCarousel
          title="Best Sellers"
          subtitle="Loved again and again"
          products={bestSellerProducts}
          viewAllHref="/products?sort=best-selling"
        />
      </div>

      <div className="border-t border-border bg-background-secondary">
        <RecentlyViewedSection />
      </div>

      <section className="border-t border-border bg-background-secondary/60">
        <div className="container-page py-8 md:py-10">
          <div className="grid gap-4 rounded-2xl border border-border bg-card p-6 md:grid-cols-3">
            {[
              {
                icon: ShieldCheck,
                title: "Trusted checkout",
                description: "Protected payments and transparent delivery estimates.",
              },
              {
                icon: Truck,
                title: "Fast dispatch",
                description: "Most orders ship within 24 hours from our fulfillment hubs.",
              },
              {
                icon: Sparkle,
                title: "Curated picks",
                description: "Every recommendation is hand-picked for style, value, and quality.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-start gap-3 rounded-xl bg-background-secondary/80 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-light/60">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-1 text-sm text-foreground-secondary">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="border-t border-border">
        <PromoBanner />
      </div>
    </>
  );
}
