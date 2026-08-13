import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { Package } from "@phosphor-icons/react/ssr";
import { orders } from "@/lib/data/orders";
import { getProductById } from "@/lib/data/products";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { EmptyState } from "@/components/shared/empty-state";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "Order History — PasalMandu" };

export default function OrderHistoryPage() {
  if (orders.length === 0) {
    return (
      <EmptyState icon={Package} title="No orders yet" description="Your past orders will show up here." />
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-bold text-foreground">Order History</h2>
      <div className="flex flex-col gap-4">
        {orders.map((order) => {
          const firstProduct = getProductById(order.items[0]?.productId);
          return (
            <Link
              key={order.id}
              href={`/profile/orders/${order.id}`}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/20 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-background-secondary text-xs font-semibold text-foreground-secondary">
                  {firstProduct && (
                    <Image src={firstProduct.images[0]} alt="" fill sizes="56px" className="object-cover" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{order.id}</p>
                  <p className="text-xs text-foreground-secondary">
                    Placed {formatDate(order.date)} · {order.items.length} item(s)
                  </p>
                  {order.eta && <p className="mt-0.5 text-xs font-medium text-primary">{order.eta}</p>}
                </div>
              </div>
              <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1.5">
                <OrderStatusBadge status={order.status} />
                <span className="text-sm font-bold text-foreground">{formatPrice(order.total)}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
