import { Metadata } from "next";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { CategoryCard } from "@/components/shared/category-card";
import { categories } from "@/lib/data/categories";

export const metadata: Metadata = {
  title: "Categories — NovaCart",
};

export default function CategoriesPage() {
  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Categories" }]} />
      <div className="mb-8 mt-3">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Shop by Category</h1>
        <p className="mt-2 max-w-xl text-sm text-foreground-secondary">
          Browse our full range, organized around how you actually shop.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} className="p-8" />
        ))}
      </div>
    </div>
  );
}
