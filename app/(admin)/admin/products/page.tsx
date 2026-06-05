"use client";

import { AddFoodCard } from "@/app/components/AddFoodCard";
import { Category } from "@/app/components/Category";
import { FoodDialog } from "@/app/components/FoodDialog";
import { FoodSection } from "@/app/components/FoodSection";
import { Prisma } from "@/app/generated/prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
export type FoodCategoryWithFood = Prisma.FoodCategoryGetPayload<{
  include: { foods: true };
}>;
export default function AdminProductsPage() {
  const [active, setActive] = useState("all");
  const [isCategoryCreating, setIsCategoryCreating] = useState(false);
  const [categories, setCategories] = useState<FoodCategoryWithFood[]>([]);
  const [creatingCategory, setCreatingCategory] = useState("");
  const visible =
    active === "all" ? categories : categories.filter((s) => s.id === active);

  useEffect(() => {
    axios.get("/api/foods/categories/foods").then((res) => {
      setCategories(res.data);
    });
  }, []);
  useEffect(() => {
    console.log(creatingCategory);
  }, [creatingCategory]);

  const handleOnCreateProduct = (categoryId: string) => {
    console.log("categoryId:", categoryId);
    setCreatingCategory(categoryId);
  };

  return (
    <div>
      <Category
        onClick={(id) => setActive(id)}
        onCreate={() => console.log("create")}
      />
      <div className="  space-y-10 mt-15">
        {visible.map((section) => (
          <FoodSection
            key={section.id}
            onCreate={handleOnCreateProduct}
            category={section}
            isAdmin={true}
          />
        ))}
      </div>
      <FoodDialog
        categories={categories}
        foodCategoryId={creatingCategory}
        open={Boolean(creatingCategory)}
        onClose={() => {
          setCreatingCategory("");
        }}
      />
    </div>
  );
}
