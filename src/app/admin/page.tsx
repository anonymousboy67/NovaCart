"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, MagnifyingGlass, PencilSimple, Trash } from "@phosphor-icons/react/ssr";
import { Product } from "@/lib/types";
import { categories } from "@/lib/data/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { formatPrice, discountPercent } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }, [products, query]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This can't be undone.`)) return;
    setDeletingId(id);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    setDeletingId(null);
    if (res.ok) {
      toast.success("Product deleted");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } else {
      toast.error("Failed to delete product");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-sm text-foreground-secondary">
            {products.length} product{products.length === 1 ? "" : "s"} in catalog
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="relative max-w-sm">
        <MagnifyingGlass className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-secondary" />
        <Input
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-card">
        {loading ? (
          <div className="flex justify-center py-16">
            <Spinner />
          </div>
        ) : filtered.length === 0 ? (
          <p className="py-16 text-center text-sm text-foreground-secondary">No products found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs font-semibold uppercase tracking-wide text-foreground-secondary">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const category = categories.find((c) => c.id === product.categoryId);
                const discount = discountPercent(product.price, product.originalPrice);
                return (
                  <tr key={product.id} className="border-b border-border last:border-none">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
                          {product.images[0] && (
                            <Image src={product.images[0]} alt="" fill sizes="44px" className="object-cover" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-foreground">{product.name}</p>
                          <p className="truncate text-xs text-foreground-secondary">{product.brand}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-foreground-secondary">{category?.name ?? product.categoryId}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-foreground">{formatPrice(product.price)}</span>
                        {discount > 0 && <Badge variant="success">-{discount}%</Badge>}
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <span className={product.stock === 0 ? "text-error" : "text-foreground-secondary"}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/admin/products/${product.id}`} aria-label="Edit">
                            <PencilSimple className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id, product.name)}
                          disabled={deletingId === product.id}
                          aria-label="Delete"
                        >
                          <Trash className="h-4 w-4 text-error" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
