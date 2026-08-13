import Link from "next/link";
import { Metadata } from "next";
import { Package, MapPin, Heart, ArrowRight } from "@phosphor-icons/react/ssr";
import { currentUser, addresses } from "@/lib/data/user";
import { orders } from "@/lib/data/orders";
import { OrderStatusBadge } from "@/components/shared/order-status-badge";
import { formatDate, formatPrice } from "@/lib/utils";

export const metadata: Metadata = { title: "My Profile — PasalMandu" };

export default function ProfileOverviewPage() {
  const recentOrders = orders.slice(0, 3);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
            <Package className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xl font-bold text-foreground">{orders.length}</p>
            <p className="text-xs text-foreground-secondary">Total orders</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
            <MapPin className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xl font-bold text-foreground">{addresses.length}</p>
            <p className="text-xs text-foreground-secondary">Saved addresses</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
            <Heart className="h-5 w-5" />
          </span>
          <div>
            <p className="text-xl font-bold text-foreground">Member since {formatDate(currentUser.memberSince)}</p>
            <p className="text-xs text-foreground-secondary">{currentUser.email}</p>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border p-5">
          <h3 className="text-base font-bold text-foreground">Recent Orders</h3>
          <Link href="/profile/orders" className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recentOrders.map((order) => (
            <Link
              key={order.id}
              href={`/profile/orders/${order.id}`}
              className="flex items-center justify-between gap-4 p-5 transition-colors hover:bg-background-secondary"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{order.id}</p>
                <p className="text-xs text-foreground-secondary">{formatDate(order.date)} · {order.items.length} item(s)</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-foreground">{formatPrice(order.total)}</span>
                <OrderStatusBadge status={order.status} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
