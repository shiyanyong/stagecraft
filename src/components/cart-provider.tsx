"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/lib/site-data";

export type CartItem = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "stagecraft-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    window.localStorage.removeItem(storageKey);
    setItems([]);
  }, []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => {
      const product = products.find((candidate) => candidate.slug === item.slug);
      return sum + (product?.price ?? 0) * item.quantity;
    }, 0);

    return {
      items,
      count,
      subtotal,
      addItem: (slug) =>
        setItems((current) => {
          const existing = current.find((item) => item.slug === slug);
          if (existing) {
            return current.map((item) =>
              item.slug === slug
                ? { ...item, quantity: Math.min(item.quantity + 1, 99) }
                : item,
            );
          }
          return [...current, { slug, quantity: 1 }];
        }),
      updateQuantity: (slug, quantity) =>
        setItems((current) =>
          current
            .map((item) =>
              item.slug === slug
                ? { ...item, quantity: Math.max(1, Math.min(quantity, 99)) }
                : item,
            )
            .filter((item) => item.quantity > 0),
        ),
      removeItem: (slug) =>
        setItems((current) => current.filter((item) => item.slug !== slug)),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
