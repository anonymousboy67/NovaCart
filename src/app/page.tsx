import { HeroBanner } from "@/components/shared/hero-banner";
import { CategoryCard } from "@/components/shared/category-card";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { PromoBanner } from "@/components/shared/promo-banner";
import { RecentlyViewedSection } from "@/components/shared/recently-viewed-section";
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

      <div className="border-t border-border">
        <PromoBanner />
      </div>
    </>
  );
}
