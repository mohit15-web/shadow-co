"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

export interface CartItem {
  productSlug: string;
  size: string;
  quantity: number;
}

type Action =
  | { type: "add"; productSlug: string; size: string; quantity: number }
  | { type: "remove"; productSlug: string; size: string }
  | { type: "setQuantity"; productSlug: string; size: string; quantity: number }
  | { type: "hydrate"; items: CartItem[] }
  | { type: "clear" };

function reducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case "hydrate":
      return action.items;
    case "add": {
      const existing = state.find(
        (i) => i.productSlug === action.productSlug && i.size === action.size,
      );
      if (existing) {
        return state.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + action.quantity } : i,
        );
      }
      return [...state, { productSlug: action.productSlug, size: action.size, quantity: action.quantity }];
    }
    case "setQuantity":
      return state
        .map((i) =>
          i.productSlug === action.productSlug && i.size === action.size
            ? { ...i, quantity: action.quantity }
            : i,
        )
        .filter((i) => i.quantity > 0);
    case "remove":
      return state.filter(
        (i) => !(i.productSlug === action.productSlug && i.size === action.size),
      );
    case "clear":
      return [];
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (productSlug: string, size: string, quantity?: number) => void;
  removeItem: (productSlug: string, size: string) => void;
  setQuantity: (productSlug: string, size: string, quantity: number) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "shadow-co-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      // ignore malformed storage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
      addItem: (productSlug, size, quantity = 1) =>
        dispatch({ type: "add", productSlug, size, quantity }),
      removeItem: (productSlug, size) => dispatch({ type: "remove", productSlug, size }),
      setQuantity: (productSlug, size, quantity) =>
        dispatch({ type: "setQuantity", productSlug, size, quantity }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
