/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({});

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function clearCart() {}
  function removeCartProduct() {}
  function saveCartProductsToLocalStorage() {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }
  // Lắng nghe cartProduct khi chưa được cập nhật để không bị []
  useEffect(() => {
    saveCartProductsToLocalStorage(cartProducts);
  }, [cartProducts]);

  function addToCart(product) {
    setCartProducts((prevProduct) => {
      const cartProduct = { ...product };
      const newProducts = [...prevProduct, cartProduct];

      saveCartProductsToLocalStorage(newProducts);
      return newProducts;
    });
  }

  //value action
  const actionCart = {
    cartProducts,
    clearCart,
    removeCartProduct,
    saveCartProductsToLocalStorage,
    addToCart,
  };

  return (
    <SessionProvider>
      <CartContext.Provider value={actionCart}>{children}</CartContext.Provider>
    </SessionProvider>
  );
}
