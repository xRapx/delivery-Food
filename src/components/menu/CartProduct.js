import Image from "next/image";
import Trash from "../icons/Trash";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../AppContext";

export default function CartProduct({ product }) {

  const { clearCart } = useContext(CartContext);
  function onRemove(param) {}

  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        <Image width={240} height={240} src={product?.image} alt={""} />
      </div>
      <div className="flex grow">
        <h3 className="font-semibold">{product?.name} </h3>
      </div>
      <div className="text-lg font-semibold">${product?.basePrice}</div>
      {!!onRemove && (
        <div className="ml-2">
          <button type="button" onClick={() => onRemove(index)} className="p-2">
            <Trash />
          </button>
        </div>
      )}
      
    </div>
  );
}
