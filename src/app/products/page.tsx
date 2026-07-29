import { Suspense } from "react";
import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { ProductExplorer } from "@/components/shared/product-explorer";

export const metadata: Metadata = {
  title: "All Products — NovaCart",
};

export default function ProductsPage() {
  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "All Products" }]} />
      <h1 className="mb-8 mt-3 text-2xl font-bold text-foreground md:text-3xl">All Products</h1>
      <Suspense fallback={null}>
        <ProductExplorer />
      </Suspense>
    </div>
  );
}
