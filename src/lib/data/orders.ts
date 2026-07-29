import { Order } from "@/lib/types";
import { addresses } from "@/lib/data/user";

export const orders: Order[] = [
  {
    id: "NC-100482",
    date: "2026-07-18",
    status: "delivered",
    items: [
      { productId: "p-electronics-01", quantity: 1, price: 179 },
      { productId: "p-electronics-05", quantity: 2, price: 39 },
    ],
    subtotal: 257,
    shipping: 0,
    discount: 15,
    total: 242,
    address: addresses[0],
    paymentMethod: "Visa •••• 4821",
  },
  {
    id: "NC-100411",
    date: "2026-07-05",
    status: "shipped",
    items: [{ productId: "p-home-05", quantity: 1, price: 54 }],
    subtotal: 54,
    shipping: 6,
    discount: 0,
    total: 60,
    address: addresses[0],
    paymentMethod: "Visa •••• 4821",
    eta: "Arriving Jul 31",
  },
  {
    id: "NC-100375",
    date: "2026-06-22",
    status: "out-for-delivery",
    items: [
      { productId: "p-beauty-01", quantity: 1, price: 42 },
      { productId: "p-beauty-05", quantity: 1, price: 28 },
    ],
    subtotal: 70,
    shipping: 4,
    discount: 5,
    total: 69,
    address: addresses[1],
    paymentMethod: "Mastercard •••• 1190",
    eta: "Arriving today",
  },
  {
    id: "NC-100298",
    date: "2026-05-30",
    status: "delivered",
    items: [{ productId: "p-fashion-02", quantity: 1, price: 98 }],
    subtotal: 98,
    shipping: 0,
    discount: 0,
    total: 98,
    address: addresses[0],
    paymentMethod: "Visa •••• 4821",
  },
  {
    id: "NC-100214",
    date: "2026-05-11",
    status: "cancelled",
    items: [{ productId: "p-electronics-04", quantity: 1, price: 799 }],
    subtotal: 799,
    shipping: 0,
    discount: 40,
    total: 759,
    address: addresses[0],
    paymentMethod: "Visa •••• 4821",
  },
  {
    id: "NC-100156",
    date: "2026-04-19",
    status: "delivered",
    items: [
      { productId: "p-groceries-01", quantity: 2, price: 16 },
      { productId: "p-groceries-03", quantity: 1, price: 11 },
    ],
    subtotal: 43,
    shipping: 4,
    discount: 0,
    total: 47,
    address: addresses[1],
    paymentMethod: "Mastercard •••• 1190",
  },
];

export function getOrderById(id: string) {
  return orders.find((o) => o.id === id);
}
