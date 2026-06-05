"use client";
import Hero from "../components/Hero";

import { FoodSection } from "../components/FoodSection";
import { useEffect, useState } from "react";
import { FoodCategoryWithFood } from "../(admin)/admin/products/page";
import axios from "axios";

export default function Home() {
  const [categories, setCategories] = useState<FoodCategoryWithFood[]>([]);
  useEffect(() => {
    axios.get("/api/foods/categories/foods").then((res) => {
      setCategories(res.data);
    });
  }, []);
  return (
    <>
      <Hero />
      <div className="container">
        {" "}
        {categories.map((category) => (
          <FoodSection
            key={category.id}
            onCreate={() => {}}
            category={category}
            isAdmin={false}
          />
        ))}
      </div>
    </>
  );
}
