"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag, ArrowRight } from "@phosphor-icons/react/ssr";
import { useCart } from "@/context/cart-context";
import { useProducts } from "@/context/products-context";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { CartLineItem } from "@/components/shared/cart-line-item";
import { OrderSummary } from "@/components/shared/order-summary";
import { ProductCarousel } from "@/components/shared/product-carousel";
import { EmptyState } from "@/components/shared/empty-state";
import { Button } from "@/components/ui/button";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, subtotal } = useCart();
  const { products, getById } = useProducts();

  const lines = items
    .map((item) => ({ item, product: getById(item.productId) }))
    .filter((l): l is { item: typeof l.item; product: NonNullable<typeof l.product> } => Boolean(l.product));

  const shipping = subtotal > 50 || subtotal === 0 ? 0 : 6;
  const discount = subtotal > 200 ? 20 : 0;
  const recommended = products.filter((p) => !items.some((i) => i.productId === p.id)).slice(0, 8);

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart" }]} />
      <h1 className="mb-8 mt-3 text-2xl font-bold text-foreground md:text-3xl">Your Cart</h1>

      {lines.length === 0 ? (
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Explore our catalog to find something you'll love."
          action={
            <Button asChild>
              <Link href="/products">Start Shopping</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-xl border border-border bg-card px-6">
            {lines.map(({ item, product }) => (
              <CartLineItem
                key={item.productId}
                product={product}
                quantity={item.quantity}
                onQuantityChange={(q) => updateQuantity(item.productId, q)}
                onRemove={() => removeFromCart(item.productId)}
              />
            ))}
          </div>

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            footer={
              <Button size="lg" className="mt-1 w-full" onClick={() => router.push("/checkout")}>
                Proceed to Checkout
                <ArrowRight className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      )}

      {recommended.length > 0 && (
        <div className="mt-6 border-t border-border">
          <ProductCarousel title="You might also like" products={recommended} />
        </div>
      )}
    </div>
  );
}
