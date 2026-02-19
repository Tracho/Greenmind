"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { TypeProduct } from "../types/global";
import { TypeThisProduct } from "../types/basket";


type CartContextType = {
  cart: TypeThisProduct[];
  addToCart: (item: TypeThisProduct) => void;
  plusQuantity: (id: string | number) => void;
  minusQuantity: (id: string | number) => void;
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

  const plusQuantity = (productId: string | number) => {
    setCart((prev) => {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        ); 
    });
  };
  const minusQuantity = (productId: string | number) => {
    setCart((prev) => {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: (item.quantity > 1 ? item.quantity - 1 : 1) } : item
        ); 
    });
  };

  return (<>
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart , plusQuantity, minusQuantity }}>
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
