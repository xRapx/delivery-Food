/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext({});

export function cartProductPrice(cartProduct) {
  let price = cartProduct.basePrice;
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return price;
}

export function AppProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const ls = typeof window !== "undefined" ? window.localStorage : null;

  //save Cart to localStorage
  function saveCartProductsToLocalStorage() {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  //get data to localstorage
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Lắng nghe cartProduct khi chưa được cập nhật để không bị []
  useEffect(() => {
    saveCartProductsToLocalStorage(cartProducts);
  }, [cartProducts]);

  //clear Cart
  function clearCart() {
    setCartProducts([]);
    saveCartProductsToLocalStorage([]);
  }

  //remove Cart
  function removeCartProduct(indexToRemove) {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (prev,index) => index !== indexToRemove
      );
      saveCartProductsToLocalStorage(newCartProducts);
      return newCartProducts;
    });
    toast.success("Product removed");
  }

  //add cart
  function addToCart(product, size = null, extras = []) {
    setCartProducts((prevProducts) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProducts, cartProduct];
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
