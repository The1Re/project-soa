import { createContext, useContext, useState, ReactNode } from "react";
import { Amulet } from "../models/Amulet";
import { Book } from "../models/Book";

interface CartContextType {
  cart: (Amulet | Book)[];
  addToCart: (amulet: Amulet | Book) => void;
  removeFromCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<(Amulet | Book)[]>([]);

  const addToCart = (amulet: Amulet | Book) => {
    setCart((prevCart) => [...prevCart, amulet]);
  };

  const removeFromCart = (index: number ) => {
    setCart((prevCart) => prevCart.filter((item , idx) => idx !== index));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
