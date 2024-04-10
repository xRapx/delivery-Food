"use client";
import Link from "next/link";
import ShoppingCart from "../icons/ShopppingCart";
import Bars2 from "../icons/Bars2";
import { useSession } from "next-auth/react";
import { Fragment, useContext, useState } from "react";
import { CartContext } from "../AppContext";

function AuthLinks({ status, userName }) {
  if (status === "authenticated") {
    return (
      <Fragment>
        <Link href={"/profile"} className="whitespace-nowrap">
          Hello, {userName}
        </Link>
        <button
          onClick={() => signOut()}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Logout
        </button>
      </Fragment>
    );
  }
  if (status === "unauthenticated") {
    return (
      <Fragment>
        <Link href={"/login"}>Login</Link>
        <Link
          href={"/register"}
          className="bg-primary rounded-full text-white px-8 py-2"
        >
          Register
        </Link>
      </Fragment>
    );
  }
}

function Header() {
  const session = useSession();
  const status = session?.status;
  const userData = session.data?.user;
  let userName = userData?.name || userData?.email;

  const { cartProducts } = useContext(CartContext);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <header>
      <div className="flex items-center md:hidden justify-between">
        <Link className="text-primary font-semibold text-2xl" href={"/"}>
          Food Delivery
        </Link>
        <div>
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span
                className="absolute -top-2 -right-4 bg-primary text-white 
									text-xs py-1 px-1 rounded-full leading-3"
              >
                {cartProducts.length}
              </span>
            )}
          </Link>
          <button
            className="p-1 border"
            onClick={() => setMobileNavOpen((prev) => !prev)}
          >
            <Bars2 />
          </button>
        </div>
      </div>
      {mobileNavOpen && (
        <div
          onClick={() => setMobileNavOpen(false)}
          className="md:hidden p-4 bg-gray-200 rounded-lg mt-2 flex flex-col gap-2 text-center"
        >
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </div>
      )}
      <div className="hidden md:flex items-center justify-between">
        <nav className="flex items-center gap-8 text-gray-500 font-semibold">
          <Link className="text-primary font-semibold text-2xl" href={"/"}>
            Food Delivery
          </Link>
          <Link href={"/"}>Home</Link>
          <Link href={"/menu"}>Menu</Link>
          <Link href={"/#about"}>About</Link>
          <Link href={"/#contact"}>Contact</Link>
        </nav>
        <nav className="flex items-center gap-4 text-gray-500 font-semibold">
          <AuthLinks status={status} userName={userName} />
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts?.length > 0 && (
              <span className="absolute -top-2 -right-4 bg-primary text-white text-xs py-1 px-1 rounded-full leading-3">
                {cartProducts.length}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
