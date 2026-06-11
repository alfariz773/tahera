'use client';

import React, { createContext, useContext, useState } from 'react';

export type CartItem = {
  name: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (name: string, priceStr: string) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, delta: number) => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (val: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Helper to turn text like "AED 45" into the math number 45
  const parsePrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/[^\d]/g, ''), 10);
    return isNaN(num) ? 0 : num;
  };

  const addToCart = (name: string, priceStr: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.name === name);
      if (existing) {
        return prev.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { name, price: parsePrice(priceStr), quantity: 1 }];
    });
    // Open the slide-out drawer automatically when they add food!
    setIsCartOpen(true); 
  };

  const removeFromCart = (name: string) => {
    setCart((prev) => prev.filter((item) => item.name !== name));
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.name === name) {
          const newQuantity = item.quantity + delta;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, cartTotal, cartCount, isCartOpen, setIsCartOpen }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}