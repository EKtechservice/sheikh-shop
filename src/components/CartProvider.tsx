"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useRef,
} from "react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  subtotal: number;
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  updateQuantity: (productId: string | number, quantity: number, selectedSize?: string) => void;
  removeFromCart: (productId: string | number, selectedSize?: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "sheikh_shop_cart_items_v2";

const INITIAL_DEFAULT_ITEMS: CartItem[] = [
  {
    product: {
      id: "prod-oxford-shirt",
      name: "Oxford Cotton Shirt",
      slug: "oxford-cotton-shirt",
      category: "shirts",
      categoryName: "Shirts",
      price: 80.0,
      compareAtPrice: 120.0,
      image: "/images/products/oxford-shirt-v2.png",
      onSale: true,
    },
    quantity: 1,
    selectedSize: "L",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_DEFAULT_ITEMS);
  const isHydratedRef = useRef(false);

  // Restore cart from localStorage on client mount & listen for multi-tab updates
  useEffect(() => {
    const syncFromStorage = () => {
      try {
        if (typeof window === "undefined" || !window.localStorage) return;
        const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setItems(parsed);
          }
        }
      } catch {
        // Safe fallback for Safari Private Browsing mode / restricted cookies
      }
    };

    syncFromStorage();
    isHydratedRef.current = true;

    // Cross-tab synchronization
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === LOCAL_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        } catch {
          // Ignore parse errors from concurrent writes
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Sync to localStorage on item change after initial hydration
  useEffect(() => {
    if (!isHydratedRef.current) return;
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
      }
    } catch {
      // Safe fallback: Ignore quota exceeded / restricted storage in Safari private mode
    }
  }, [items]);

  const cartCount = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }, [items]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedSize?: string
  ) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          (selectedSize ? item.selectedSize === selectedSize : true)
      );

      if (existingIndex > -1) {
        const next = [...prevItems];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [...prevItems, { product, quantity, selectedSize }];
    });
  };

  const updateQuantity = (
    productId: string | number,
    quantity: number,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (
          item.product.id === productId &&
          (selectedSize ? item.selectedSize === selectedSize : true)
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const removeFromCart = (
    productId: string | number,
    selectedSize?: string
  ) => {
    setItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            (selectedSize ? item.selectedSize === selectedSize : true)
          )
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        cartCount,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
