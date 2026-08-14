import { notFound } from "next/navigation";
import { getProductById } from "@/lib/data/products";
import { ProductForm } from "@/components/admin/product-form";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) notFound();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-foreground">Edit Product</h1>
      <ProductForm product={product} />
    </div>
  );
}
