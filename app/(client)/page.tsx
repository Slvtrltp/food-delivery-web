"use client";
import Hero from "../components/Hero";
import { FoodSection } from "../components/FoodSection";

import { useEffect, useState } from "react";
import { FoodCategoryWithFood } from "../(admin)/admin/products/page";
import { Food } from "../generated/prisma/client";
import axios from "axios";
import { FoodDetailModal } from "./FoodDetailModal";
import { CartDrawer } from "./CartDrawer";

export default function Home() {
  const [categories, setCategories] = useState<FoodCategoryWithFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  useEffect(() => {
    axios.get("/api/foods/categories/foods").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <>
      <Hero />
      <div className="container">
        {categories.map((category) => (
          <FoodSection
            key={category.id}
            onCreate={() => {}}
            category={category}
            isAdmin={false}
            onEdit={(food) => setSelectedFood(food)}
          />
        ))}
      </div>
      <FoodDetailModal
        food={selectedFood}
        open={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
     
    </>
  );
}
