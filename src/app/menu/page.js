"use client";
import { useProfile } from "@/components/UseProfile";
import { useEffect, useState } from "react";
import MenuItem from "@/components/menu/MenuItem";
import SectionHeaders from "@/components/SectionHeaders";

export default function Menu() {
  const [menu, setMenu] = useState([]);
  // const { loading, data } = useProfile();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <div className="text-center mb-4">
        <SectionHeaders
          subHeader={"Food Delivery"}
          mainHeader={"Menu Orders"}
        />
        <div className="grid grid-cols-3 gap-2">
          {menu.map((item, index) => (
            <MenuItem key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
