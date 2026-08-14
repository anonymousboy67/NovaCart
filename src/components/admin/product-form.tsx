"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Plus, Trash, X, UploadSimple } from "@phosphor-icons/react/ssr";
import { toast } from "sonner";
import { Product, ProductSpec } from "@/lib/types";
import { categories } from "@/lib/data/categories";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ProductFormValues = Omit<Product, "id" | "slug" | "rating" | "reviewCount">;

const EMPTY: ProductFormValues = {
  name: "",
  subtitle: "",
  brand: "",
  categoryId: categories[0]?.id ?? "",
  price: 0,
  originalPrice: undefined,
  stock: 0,
  description: "",
  images: [],
  specs: [],
  tags: [],
  isNew: false,
  isBestSeller: false,
  isTrending: false,
  colors: [],
};

export function ProductForm({ product }: { product?: Product }) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isEditing = Boolean(product);

  const [values, setValues] = useState<ProductFormValues>(
    product ? { ...EMPTY, ...product } : EMPTY
  );
  const [tagsInput, setTagsInput] = useState(product?.tags.join(", ") ?? "");
  const [colorsInput, setColorsInput] = useState(product?.colors?.join(", ") ?? "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const set = <K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const form = new FormData();
        form.append("file", file);
        const res = await fetch("/api/upload", { method: "POST", body: form });
        if (!res.ok) {
          const { error } = await res.json();
          toast.error(error ?? "Upload failed");
          continue;
        }
        const { url } = await res.json();
        setValues((prev) => ({ ...prev, images: [...prev.images, url] }));
      }
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index: number) =>
    setValues((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }));

  const updateSpec = (index: number, key: keyof ProductSpec, value: string) =>
    setValues((prev) => ({
      ...prev,
      specs: prev.specs.map((s, i) => (i === index ? { ...s, [key]: value } : s)),
    }));

  const addSpec = () => setValues((prev) => ({ ...prev, specs: [...prev.specs, { label: "", value: "" }] }));
  const removeSpec = (index: number) =>
    setValues((prev) => ({ ...prev, specs: prev.specs.filter((_, i) => i !== index) }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.images.length === 0) {
      toast.error("Add at least one product photo");
      return;
    }

    setSaving(true);
    const payload = {
      ...values,
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean),
      colors: colorsInput.split(",").map((c) => c.trim()).filter(Boolean),
      originalPrice: values.originalPrice || undefined,
      specs: values.specs.filter((s) => s.label.trim() && s.value.trim()),
    };

    const res = await fetch(isEditing ? `/api/products/${product!.id}` : "/api/products", {
      method: isEditing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSaving(false);

    if (res.ok) {
      toast.success(isEditing ? "Product updated" : "Product created");
      router.push("/admin");
      router.refresh();
    } else {
      const { error } = await res.json();
      toast.error(error ?? "Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Photos */}
      <section className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold text-foreground">Photos</h2>
        <div className="flex flex-wrap gap-3">
          {values.images.map((src, i) => (
            <div key={src + i} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-border">
              <Image src={src} alt="" fill sizes="96px" className="object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove image"
              >
                <X className="h-3 w-3" />
              </button>
              {i === 0 && (
                <span className="absolute bottom-0 left-0 right-0 bg-black/60 py-0.5 text-center text-[10px] font-semibold text-white">
                  Primary
                </span>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-border text-foreground-secondary transition-colors hover:border-primary hover:text-primary disabled:opacity-50"
          >
            {uploading ? <Spinner /> : <UploadSimple className="h-5 w-5" />}
            <span className="text-[11px] font-medium">{uploading ? "Uploading" : "Add photo"}</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            hidden
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
        <p className="text-xs text-foreground-secondary">
          First photo is used as the primary image across the store. JPEG, PNG, WebP or AVIF, up to 5MB each.
        </p>
      </section>

      {/* Basic info */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold text-foreground">Basic Info</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Product name" className="sm:col-span-2">
            <Input value={values.name} onChange={(e) => set("name", e.target.value)} required />
          </Field>
          <Field label="Subtitle" className="sm:col-span-2">
            <Input value={values.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
          </Field>
          <Field label="Brand">
            <Input value={values.brand} onChange={(e) => set("brand", e.target.value)} />
          </Field>
          <Field label="Category">
            <Select value={values.categoryId} onValueChange={(v) => set("categoryId", v)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
        <Field label="Description">
          <textarea
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
            rows={5}
            className="flex w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-foreground-secondary/70 transition-colors duration-150 focus-visible:outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary-light"
          />
        </Field>
      </section>

      {/* Pricing & stock */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold text-foreground">Pricing & Stock</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Price (USD)">
            <Input
              type="number"
              min={0}
              step="0.01"
              value={values.price}
              onChange={(e) => set("price", Number(e.target.value))}
              required
            />
          </Field>
          <Field label="Original price (for discount)">
            <Input
              type="number"
              min={0}
              step="0.01"
              value={values.originalPrice ?? ""}
              onChange={(e) => set("originalPrice", e.target.value ? Number(e.target.value) : undefined)}
              placeholder="Optional"
            />
          </Field>
          <Field label="Stock quantity">
            <Input
              type="number"
              min={0}
              value={values.stock}
              onChange={(e) => set("stock", Number(e.target.value))}
              required
            />
          </Field>
        </div>
      </section>

      {/* Specs */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">Specifications</h2>
          <Button type="button" variant="outline" size="sm" onClick={addSpec}>
            <Plus className="h-3.5 w-3.5" />
            Add spec
          </Button>
        </div>
        {values.specs.length === 0 && (
          <p className="text-sm text-foreground-secondary">No specs added yet.</p>
        )}
        {values.specs.map((spec, i) => (
          <div key={i} className="flex items-center gap-2">
            <Input
              placeholder="Label (e.g. Battery Life)"
              value={spec.label}
              onChange={(e) => updateSpec(i, "label", e.target.value)}
            />
            <Input
              placeholder="Value (e.g. Up to 40 hours)"
              value={spec.value}
              onChange={(e) => updateSpec(i, "value", e.target.value)}
            />
            <Button type="button" variant="ghost" size="icon" onClick={() => removeSpec(i)}>
              <Trash className="h-4 w-4 text-error" />
            </Button>
          </div>
        ))}
      </section>

      {/* Tags, colors, flags */}
      <section className="flex flex-col gap-4 rounded-xl border border-border bg-card p-6">
        <h2 className="text-sm font-bold text-foreground">Tags & Variants</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tags (comma-separated)">
            <Input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="audio, wireless, travel" />
          </Field>
          <Field label="Colors (comma-separated, optional)">
            <Input value={colorsInput} onChange={(e) => setColorsInput(e.target.value)} placeholder="Black, White" />
          </Field>
        </div>
        <div className="flex flex-wrap gap-6">
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox checked={values.isNew} onCheckedChange={(v) => set("isNew", !!v)} />
            <span className="text-sm text-foreground">Mark as New</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox checked={values.isBestSeller} onCheckedChange={(v) => set("isBestSeller", !!v)} />
            <span className="text-sm text-foreground">Best Seller</span>
          </label>
          <label className="flex cursor-pointer items-center gap-2.5">
            <Checkbox checked={values.isTrending} onCheckedChange={(v) => set("isTrending", !!v)} />
            <span className="text-sm text-foreground">Trending</span>
          </label>
        </div>
      </section>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
          Cancel
        </Button>
        <Button type="submit" disabled={saving || uploading}>
          {saving ? "Saving..." : isEditing ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  className,
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <span className="text-xs font-semibold text-foreground-secondary">{label}</span>
      {children}
    </label>
  );
}
