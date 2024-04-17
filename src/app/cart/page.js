/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import SectionHeaders from "@/components/SectionHeaders";
import CartProduct from "../../components/menu/CartProduct";
import { dataFood } from "@/components/db";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../components/AppContext";
import AddressInputs from "../../components/layout/AddressInputs";

export default function CartPage() {
  const { cartProducts, totals } = useContext(CartContext);
  const [total, setTotal] = useState("");
  const [address, setAddress] = useState({});

  useEffect(() => {
    let price = 0;
    cartProducts.map((item) => {
      price += item.basePrice;
      return price;
    });
    setTotal(price);
  }, [cartProducts]);

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <SectionHeaders mainHeader="Cart" />
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }

  function proceedToCheckout() {}
  function handleAddressChange() {}

  return (
    <section className="mt-8">
      <div className="text-center">
        <SectionHeaders mainHeader="Cart" />
      </div>

      <div className="mt-8 grid gap-8 grid-cols-2">
        <div>
          {cartProducts?.length === 0 && (
            <div>No products in your shopping cart</div>
          )}
          {cartProducts?.length > 0 &&
            cartProducts.map((product, index) => (
              <CartProduct
                key={index}
                product={product}
                // onRemove={removeCartProduct}
              />
            ))}
          <div className="py-2 pr-16 flex justify-end items-center">
            <div className="text-gray-500">
              Subtotal:
              <br />
              Delivery:
              <br />
              Total:
            </div>
            <div className="font-semibold pl-2 text-right">
              ${total}
              <br />
              $5
              <br />${total + 5}
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg">
          <h2>Checkout</h2>
          <form onSubmit={proceedToCheckout}>
            <AddressInputs
              addressProps={address}
              setAddressProp={handleAddressChange}
            />
            <button type="submit">Pay ${total + 5}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
