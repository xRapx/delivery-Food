"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs() {
  const path = usePathname();
  return (
    <div className="flex mx-auto gap-2 tabs justify-center flex-wrap">
      <Link
            href={"/menuitems"}
            className={path.includes("menuitems") ? "active" : ""}
      >
        Menu Items
      </Link>
      <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
        Orders
      </Link>
    </div>
  );
}
