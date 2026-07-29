import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { ArrowLeft, FileText } from "@phosphor-icons/react/ssr";
import { orders, getOrderById } from "@/lib/data/orders";
import { getProductById } from "@/lib/data/products";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { OrderSummary } from "@/components/shared/order-summary";
import { Button } from "@/components/ui/button";
import { formatDate, formatPrice } from "@/lib/utils";

export function generateStaticParams() {
  return orders.map((o) => ({ id: o.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  return { title: `Order ${id} — NovaCart` };
}

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = getOrderById(id);
  if (!order) notFound();

  return (
    <div className="flex flex-col gap-6">
      <Link href="/profile/orders" className="flex w-fit items-center gap-1.5 text-sm font-medium text-foreground-secondary hover:text-foreground">
        <ArrowLeft className="h-4 w-4" />
        Back to orders
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-foreground">Order {order.id}</h2>
          <p className="text-sm text-foreground-secondary">Placed on {formatDate(order.date)}</p>
        </div>
        <div className="flex items-center gap-3">
          <OrderStatusBadge status={order.status} />
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4" />
            Invoice
          </Button>
        </div>
      </div>

      {order.eta && (
        <div className="rounded-lg bg-primary-light px-4 py-3 text-sm font-medium text-primary">
          {order.eta}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="rounded-xl border border-border bg-card px-6">
          {order.items.map((item) => {
            const product = getProductById(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="flex gap-4 border-b border-border py-5 last:border-none">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-background-secondary">
                  <Image src={product.images[0]} alt={product.name} fill sizes="80px" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-center gap-1">
                  <Link href={`/products/${product.slug}`} className="text-sm font-semibold text-foreground hover:text-primary">
                    {product.name}
                  </Link>
                  <p className="text-xs text-foreground-secondary">Qty {item.quantity}</p>
                </div>
                <span className="self-center text-sm font-bold text-foreground">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-6">
          <OrderSummary subtotal={order.subtotal} shipping={order.shipping} discount={order.discount} />

          <div className="rounded-xl border border-border bg-card p-5">
            <h4 className="mb-3 text-sm font-bold text-foreground">Shipping Address</h4>
            <p className="text-sm text-foreground-secondary">{order.address.fullName}</p>
            <p className="text-sm text-foreground-secondary">
              {order.address.line1}
              {order.address.line2 ? `, ${order.address.line2}` : ""}
            </p>
            <p className="text-sm text-foreground-secondary">
              {order.address.city}, {order.address.state} {order.address.zip}
            </p>
            <p className="text-sm text-foreground-secondary">{order.address.country}</p>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <h4 className="mb-2 text-sm font-bold text-foreground">Payment Method</h4>
            <p className="text-sm text-foreground-secondary">{order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
