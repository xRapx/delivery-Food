"use client";
import MenuItem from "@/components/menu/MenuItem";
import Image from "next/image";
import { useEffect, useState } from "react";
import SectionHeaders from "../SectionHeaders";
import { dataFood } from "../db";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

export default function HomeMenu() {
  const [bestSellers, setBestSellers] = useState([]);
  useEffect(() => {
    setBestSellers(dataFood.slice(-3));
  }, []);
  return (
    <QueryClientProvider client={queryClient}>
      <section className="">
        <div className="absolute left-0 right-0 w-full justify-start">
          <div className="absolute left-0 -top-[70px] text-left -z-10 sm:-top-[27px]">
            <Image
              src={"/goi.jpg"}
              width={150}
              height={190}
              alt={"goi"}
              className="w-auto h-auto"
            />
          </div>
          <div className="absolute -top-[120px] right-0 -z-10 sm:-top-[27px]">
            <Image
              src={"/goi2.jpg"}
              width={150}
              height={190}
              alt={"goi2"}
              className="w-auto h-auto"
            />
          </div>
        </div>
        <div className="text-center mb-4">
          <SectionHeaders
            subHeader={"check out"}
            mainHeader={"Our Best Sellers"}
          />
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {bestSellers.length > 0 &&
            bestSellers.map((item) => <MenuItem key={item.id} {...item} />)}
        </div>
      </section>
    </QueryClientProvider>
  );
}
