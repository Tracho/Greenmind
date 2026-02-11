"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { TypeProduct } from "../types/global";

type TypeThisProduct = {
  title: string;
  price: number | null;
  quantity: number;
  image: string;
  id: string;
}
type CartContextType = {
  cart: TypeThisProduct[];
  addToCart: (item: TypeThisProduct) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined)
function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<TypeThisProduct[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart)
  }, [cart]);


  const addToCart = (product: TypeThisProduct) => {
    setCart((prev) => {
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (<>
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  </>);
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
export default CartProvider;
