"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash } from "@phosphor-icons/react/ssr";
import { Product } from "@/lib/types";
import { QuantityStepper } from "@/components/shared/quantity-stepper";
import { formatPrice } from "@/lib/utils";

export function CartLineItem({
  product,
  quantity,
  onQuantityChange,
  onRemove,
}: {
  product: Product;
  quantity: number;
  onQuantityChange: (q: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex gap-4 border-b border-border py-5 last:border-none">
      <Link href={`/products/${product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-background-secondary sm:h-28 sm:w-28">
        <Image src={product.images[0]} alt={product.name} fill sizes="112px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col justify-between gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-foreground hover:text-primary">
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-foreground-secondary">{product.subtitle}</p>
          </div>
          <span className="shrink-0 text-sm font-bold text-foreground">
            {formatPrice(product.price * quantity)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <QuantityStepper quantity={quantity} onChange={onQuantityChange} size="sm" max={product.stock} />
          <button
            onClick={onRemove}
            className="flex items-center gap-1.5 text-xs font-medium text-foreground-secondary transition-colors hover:text-error"
          >
            <Trash className="h-3.5 w-3.5" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
