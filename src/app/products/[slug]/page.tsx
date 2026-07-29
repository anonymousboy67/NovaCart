import { notFound } from "next/navigation";
import { Metadata } from "next";
import { products, getProductBySlug, getRelatedProducts } from "@/lib/data/products";
import { getReviewsForProduct } from "@/lib/data/reviews";
import { categories } from "@/lib/data/categories";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductGallery } from "@/components/shared/product-gallery";
import { ProductPurchasePanel } from "@/components/shared/product-purchase-panel";
import { ProductTabs } from "@/components/shared/product-tabs";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { TrackRecentlyViewed } from "@/components/shared/track-recently-viewed";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found — NovaCart" };
  return { title: `${product.name} — NovaCart` };
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const reviews = getReviewsForProduct(product.id);
  const related = getRelatedProducts(product);
  const category = categories.find((c) => c.id === product.categoryId);

  return (
    <div className="container-page py-8 md:py-10">
      <TrackRecentlyViewed productId={product.id} />
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: category?.name ?? "Products", href: `/products?category=${category?.slug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <ProductGallery images={product.images} alt={product.name} />
        <ProductPurchasePanel product={product} />
      </div>

      <ProductTabs product={product} reviews={reviews} />

      {related.length > 0 && (
        <div className="mt-6 border-t border-border">
          <ProductCarousel title="You may also like" products={related} />
        </div>
      )}
    </div>
  );
}
