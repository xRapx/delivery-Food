"use client";

import MenuItem from "@/components/menu/MenuItem";
import { useEffect, useState } from "react";
import SectionHeaders from "../../components/SectionHeaders";

export default function MenuPage() {
  const [categories, setCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    setLoading(true)
    fetch("/api/categories").then((res) => {
      res.json().then((categories) => setCategories(categories));
      setLoading(false)
    });
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => setMenuItems(menuItems));
      setLoading(false)
    });
  }, []);

  return (
    <div className="mt-8">
      {
        loading && (<div>Loading....</div>) 
      }
      {categories?.length > 0 &&
        categories.map((c) => (
          <div key={c._id}>
            <div className="text-center">
              <SectionHeaders mainHeader={c.name} className="uppercase" />
            </div>
            <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
              {menuItems
                .filter((item) => item.category.toString() === c._id.toString())
                .map((item) => (
                  <MenuItem key={item._id} {...item} />
                ))}
            </div>
          </div>
        ))}
    </div>
  );
}
