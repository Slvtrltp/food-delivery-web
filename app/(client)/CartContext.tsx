"use client";
import { Food } from "@/app/generated/prisma/client";
import { createContext, useContext, useState } from "react";

type CartItem = {
  food: Food;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (food: Food, quantity: number) => void;
  removeItem: (foodId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (food: Food, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.food.id === food.id);
      if (existing) {
        return prev.map((i) =>
          i.food.id === food.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { food, quantity }];
    });
  };

  const removeItem = (foodId: string) => {
    setItems((prev) => prev.filter((i) => i.food.id !== foodId));
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
