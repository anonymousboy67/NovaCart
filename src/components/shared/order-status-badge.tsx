import { OrderStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statusConfig: Record<OrderStatus, { label: string; variant: "success" | "primary" | "warning" | "error" | "neutral" }> = {
  processing: { label: "Processing", variant: "neutral" },
  shipped: { label: "Shipped", variant: "primary" },
  "out-for-delivery": { label: "Out for delivery", variant: "warning" },
  delivered: { label: "Delivered", variant: "success" },
  cancelled: { label: "Cancelled", variant: "error" },
};

export function OrderStatusBadge({ status, className }: { status: OrderStatus; className?: string }) {
  const config = statusConfig[status];
  return (
    <Badge variant={config.variant} className={cn(className)}>
      {config.label}
    </Badge>
  );
}
