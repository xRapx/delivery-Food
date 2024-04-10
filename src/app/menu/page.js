/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";

import SectionHeaders from "@/components/SectionHeaders";
import { dataFood } from "@/components/db";
console.log(dataFood);

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  useEffect(() => {
    setCategories(categories);
    setMenuItems(dataFood);
  }, []);
  return (
    <section className="mt-8">
      {categories.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category === c._id)
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </section>
  );
}
