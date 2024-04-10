import MenuItemTile from "./MenuItemTile";

export default function MenuItem(menuItem) {
  const { id, image, name, des, basePrice, sizes, extraIngredientPrices } =
    menuItem;

  return (
    <>
      <MenuItemTile {...menuItem} />
    </>
  );
}
