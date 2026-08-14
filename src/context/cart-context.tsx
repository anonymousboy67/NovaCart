"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartItem } from "@/lib/types";
import { useProducts } from "@/context/products-context";
import { initialCartProductIds } from "@/lib/data/mock-state";
import { readStorage, writeStorage } from "@/lib/utils";
import { toast } from "sonner";

interface CartContextValue {
  items: CartItem[];
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { getById } = useProducts();
  const [items, setItems] = useState<CartItem[]>(initialCartProductIds);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage after hydration
  useEffect(() => {
    const storedCart = readStorage<CartItem[]>("novacart-cart", initialCartProductIds);
    setItems(storedCart);
    setIsHydrated(true);
  }, []);

  // Persist cart to localStorage when it changes (but only after hydration)
  useEffect(() => {
    if (isHydrated) {
      writeStorage("novacart-cart", items);
    }
  }, [items, isHydrated]);

  const addToCart = useCallback((productId: string, quantity: number = 1) => {
    const product = getById(productId);
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { productId, quantity }];
    });
    toast.success(`${product?.name ?? "Item"} added to cart`);
  }, [getById]);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((i) => i.productId !== productId)
        : prev.map((i) => (i.productId === productId ? { ...i, quantity } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const cartCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  const subtotal = useMemo(
    () =>
      items.reduce((sum, i) => {
        const product = getById(i.productId);
        return sum + (product?.price ?? 0) * i.quantity;
      }, 0),
    [items, getById]
  );

  const value = useMemo(
    () => ({ items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
