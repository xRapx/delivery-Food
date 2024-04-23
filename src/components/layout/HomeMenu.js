"use client";

import MenuItem from "@/components/menu/MenuItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders";

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setBestSellers(menuItems.slice(-3));
      });
    });
  }, []);
  return (
    <section className="">
      <div className="absolute left-0 right-0 w-full justify-start">
        <div className="absolute left-0 -top-[70px] text-left -z-10">
          <Image src={"/leftimage.jpg"} width={189} height={195} alt={"goi"} />
        </div>
        <div className="absolute -top-[70px] right-0 -z-10">
          <Image src={"/rightimage.jpg"} width={189} height={195} alt={"goi"} />
        </div>
      </div>
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"check out"}
          mainHeader={"Our Best Sellers"}
        />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {bestSellers?.length > 0 &&
          bestSellers.map((item) => <MenuItem key={item._id} {...item} />)}
      </div>
    </section>
  );
}
