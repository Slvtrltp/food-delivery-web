"use client";

import { AddFoodCard } from "@/app/components/AddFoodCard";
import { Category } from "@/app/components/Category";
import { FoodDialog } from "@/app/components/FoodDialog";
import { FoodSection } from "@/app/components/FoodSection";
import { Food, Prisma } from "@/app/generated/prisma/client";
import axios from "axios";
import { useEffect, useState } from "react";
export type FoodCategoryWithFood = Prisma.FoodCategoryGetPayload<{
  include: { foods: true };
}>;
export default function AdminProductsPage() {
  const [active, setActive] = useState("all");
  const [categories, setCategories] = useState<FoodCategoryWithFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [creatingCategory, setCreatingCategory] = useState("");
  const [open, setOpen] = useState(false);
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
    setCreatingCategory(categoryId);
    setSelectedFood(null);
    setOpen(true);
  };

  const handleEdit = (food: Food) => {
    setSelectedFood(food);
    setCreatingCategory(food.foodCategoryId);
    setOpen(true);
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
            onEdit={handleEdit}
          />
        ))}
      </div>
      <FoodDialog
        open={open}
        categories={categories}
        foodCategoryId={creatingCategory}
        food={selectedFood}
        onClose={() => {
          setOpen(false);
          setCreatingCategory("");
          setSelectedFood(null);
        }}
      />
    </div>
  );
}
