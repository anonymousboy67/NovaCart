"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, MapPin, Truck, CreditCard, Plus } from "@phosphor-icons/react/ssr";
import { useCart } from "@/context/cart-context";
import { getProductById } from "@/lib/data/products";
import { addresses } from "@/lib/data/user";
import { Breadcrumb } from "@/components/shared/breadcrumb";
import { OrderSummary } from "@/components/shared/order-summary";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const deliveryMethods = [
  { id: "standard", label: "Standard Shipping", detail: "5-7 business days", price: 0 },
  { id: "express", label: "Express Shipping", detail: "2-3 business days", price: 12 },
  { id: "overnight", label: "Overnight Shipping", detail: "Next business day", price: 28 },
];

const paymentMethods = [
  { id: "visa", label: "Visa •••• 4821" },
  { id: "mastercard", label: "Mastercard •••• 1190" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [addressId, setAddressId] = useState(addresses.find((a) => a.isDefault)?.id ?? addresses[0]?.id);
  const [delivery, setDelivery] = useState(deliveryMethods[0].id);
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [placed, setPlaced] = useState(false);

  const deliveryOption = deliveryMethods.find((d) => d.id === delivery)!;
  const shipping = subtotal > 50 && delivery === "standard" ? 0 : deliveryOption.price;
  const discount = subtotal > 200 ? 20 : 0;

  const lines = items
    .map((item) => ({ item, product: getProductById(item.productId) }))
    .filter((l): l is { item: typeof l.item; product: NonNullable<typeof l.product> } => Boolean(l.product));

  const handlePlaceOrder = () => {
    setPlaced(true);
  };

  const handleCloseSuccess = () => {
    setPlaced(false);
    clearCart();
    router.push("/profile/orders");
  };

  return (
    <div className="container-page py-8 md:py-10">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Cart", href: "/cart" }, { label: "Checkout" }]} />
      <h1 className="mb-8 mt-3 text-2xl font-bold text-foreground md:text-3xl">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-6">
          <section className="rounded-xl border border-border bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-base font-bold text-foreground">
                <MapPin className="h-4.5 w-4.5 text-primary" />
                Shipping Address
              </h2>
              <Button variant="ghost" size="sm">
                <Plus className="h-3.5 w-3.5" />
                Add New
              </Button>
            </div>
            <RadioGroup value={addressId} onValueChange={setAddressId} className="grid gap-3 sm:grid-cols-2">
              {addresses.map((address) => (
                <label
                  key={address.id}
                  className={cn(
                    "flex cursor-pointer flex-col gap-2 rounded-lg border p-4 transition-colors",
                    addressId === address.id ? "border-primary bg-primary-light/40" : "border-border hover:bg-background-secondary"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">{address.label}</span>
                    <RadioGroupItem value={address.id} />
                  </div>
                  <p className="text-xs leading-relaxed text-foreground-secondary">
                    {address.fullName}
                    <br />
                    {address.line1}
                    {address.line2 ? `, ${address.line2}` : ""}
                    <br />
                    {address.city}, {address.state} {address.zip}
                  </p>
                </label>
              ))}
            </RadioGroup>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-foreground">
              <Truck className="h-4.5 w-4.5 text-primary" />
              Delivery Method
            </h2>
            <RadioGroup value={delivery} onValueChange={setDelivery} className="gap-3">
              {deliveryMethods.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors",
                    delivery === method.id ? "border-primary bg-primary-light/40" : "border-border hover:bg-background-secondary"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={method.id} />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{method.label}</p>
                      <p className="text-xs text-foreground-secondary">{method.detail}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {method.price === 0 ? "Free" : formatPrice(method.price)}
                  </span>
                </label>
              ))}
            </RadioGroup>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-5 flex items-center gap-2 text-base font-bold text-foreground">
              <CreditCard className="h-4.5 w-4.5 text-primary" />
              Payment Method
            </h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="gap-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors",
                    payment === method.id ? "border-primary bg-primary-light/40" : "border-border hover:bg-background-secondary"
                  )}
                >
                  <RadioGroupItem value={method.id} />
                  <span className="text-sm font-semibold text-foreground">{method.label}</span>
                </label>
              ))}
            </RadioGroup>

            {payment !== "cod" && (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-foreground-secondary">Card Number</label>
                  <Input placeholder="•••• •••• •••• 4821" disabled />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">Expiry</label>
                  <Input placeholder="MM / YY" disabled />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-foreground-secondary">CVC</label>
                  <Input placeholder="•••" disabled />
                </div>
              </div>
            )}
          </section>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 text-sm font-bold text-foreground">
              {lines.length} item{lines.length !== 1 ? "s" : ""}
            </h3>
            <div className="flex flex-col gap-3">
              {lines.map(({ item, product }) => (
                <div key={item.productId} className="flex items-center justify-between gap-3">
                  <span className="line-clamp-1 text-xs text-foreground-secondary">
                    {product.name} × {item.quantity}
                  </span>
                  <span className="shrink-0 text-xs font-semibold text-foreground">
                    {formatPrice(product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            discount={discount}
            footer={
              <Button size="lg" className="mt-1 w-full" onClick={handlePlaceOrder} disabled={lines.length === 0}>
                Place Order
              </Button>
            }
          />
        </div>
      </div>

      <Dialog open={placed} onOpenChange={(open) => !open && handleCloseSuccess()}>
        <DialogContent className="text-center">
          <DialogHeader className="items-center">
            <div className="mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-success/10">
              <CheckCircle className="h-7 w-7 text-success" weight="fill" />
            </div>
            <DialogTitle>Order placed successfully</DialogTitle>
            <DialogDescription>
              Thanks for shopping with NovaCart. A confirmation has been sent to your email, and you can
              track delivery from your order history.
            </DialogDescription>
          </DialogHeader>
          <Button className="w-full" onClick={handleCloseSuccess}>
            View Orders
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
