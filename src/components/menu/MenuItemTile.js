/* eslint-disable @next/next/no-img-element */

import AddToCartButton from "@/components/menu/AddToCartButton";
import Image from "next/image";

export default function MenuItemTile({ onAddToCart, ...item }) {
  const { image, description, name, basePrice, sizes, extraIngredientPrices } =
    item;
  const hasSizesOrExtras =
    sizes?.length > 0 || extraIngredientPrices?.length > 0;

  return (
    <div
      className="bg-white p-4 rounded-lg text-center
      group hover:bg-gray-200 hover:shadow-md hover:shadow-black/25 transition-all hover:scale-110 duration-100"
    >
      <Image
        src={image}
        width={500}
        height={500}
        style={{ width: "auto", height: "auto" }}
        priority
        className="max-h-auto max-h-24 block mx-auto object-contain text-center "
        alt="pizza"
      />
      <h4 className="font-semibold text-xl my-3">{name}</h4>
      <p className="text-gray-500 text-sm line-clamp-3">{description}</p>
      <AddToCartButton
        image={image}
        hasSizesOrExtras={hasSizesOrExtras}
        onClick={onAddToCart}
        basePrice={basePrice}
      />
    </div>
  );
}
