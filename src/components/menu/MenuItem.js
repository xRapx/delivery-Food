import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import Image from "next/image";
import { useContext, useState } from "react";
import FlyingButton from "react-flying-item";
import toast from "react-hot-toast";

export default function MenuItem(menuItem) {
  const { image, name, des, basePrice, sizes, extraIngredientPrices } =
    menuItem;
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useContext(CartContext);

  async function handleAddToCartButtonClick() {
    alert("add to cart");

    addToCart(menuItem);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("hiding popup");
  }

  function handleExtraThingClick(ev, extraThing) {
    const checked = ev.target.checked;
    if (checked) {
      setSelectedExtras((prev) => [...prev, extraThing]);
    } else {
      setSelectedExtras((prev) => {
        return prev.filter((e) => e.name !== extraThing.name);
      });
    }
  }

  return (
    <>
      {showPopup && (
        <div
          onClick={() => setShowPopup(false)}
          className="fixed inset-0 bg-black/80 flex items-center justify-center"
        >
          <div
            onClick={(ev) => ev.stopPropagation()}
            className="my-8 bg-white p-2 rounded-lg max-w-md"
          >
            <div
              className="overflow-y-scroll p-2"
              style={{ maxHeight: "calc(100vh - 100px)" }}
            >
              <Image
                src={image}
                alt={name}
                width={300}
                height={200}
                className="mx-auto"
              />
              <h2 className="text-lg font-bold text-center mb-2">
                {name} {basePrice}
              </h2>
              <p className="text-center text-gray-500 text-sm mb-2">{des}</p>
              <FlyingButton targetTop={"5%"} targetLeft={"95%"} src={image}>
                <div
                  className="primary sticky bottom-2"
                  onClick={handleAddToCartButtonClick}
                >
                  ODER NOW ${basePrice}
                </div>
              </FlyingButton>
              <button className="mt-2" onClick={() => setShowPopup(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
