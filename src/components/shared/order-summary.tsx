import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  discount: number;
  className?: string;
  footer?: React.ReactNode;
}

export function OrderSummary({ subtotal, shipping, discount, className, footer }: OrderSummaryProps) {
  const total = subtotal + shipping - discount;

  return (
    <div className={cn("flex flex-col gap-4 rounded-xl border border-border bg-card p-6", className)}>
      <h3 className="text-base font-bold text-foreground">Order Summary</h3>

      <div className="flex flex-col gap-2.5 text-sm">
        <div className="flex justify-between">
          <span className="text-foreground-secondary">Subtotal</span>
          <span className="font-medium text-foreground">{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground-secondary">Shipping</span>
          <span className="font-medium text-foreground">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between">
            <span className="text-foreground-secondary">Discount</span>
            <span className="font-medium text-success">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="flex justify-between border-t border-border pt-4">
        <span className="text-sm font-bold text-foreground">Total</span>
        <span className="text-lg font-bold text-foreground">{formatPrice(total)}</span>
      </div>

      {footer}
    </div>
  );
}
