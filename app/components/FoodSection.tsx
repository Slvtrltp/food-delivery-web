import React, { useState } from "react";
import { FoodCard } from "./FoodCard";
import { AddFoodCard } from "./AddFoodCard";
import { FoodCategoryWithFood } from "../(admin)/admin/products/page";
import { LabelCat } from "./LabelCat";
import { Label } from "./Label";
import { Food } from "../generated/prisma/client";
import { FoodDialog } from "./FoodDialog";

export const FoodSection = ({
  category,
  onCreate,
  onEdit,
  isAdmin = false,
}: {
  category: FoodCategoryWithFood;
  onCreate: (catId: string) => void;
  isAdmin: boolean;
  onEdit: (food: Food) => void;
}) => {
  return (
    <div className="space-y-3  w-full h-full rounded-lg bg-white py-6 px-6">
      <Label category={category} />
      <div className="flex flex-wrap items-center gap-6">
        {isAdmin && (
          <AddFoodCard
            onClick={() => {
              onCreate(category.id);
            }}
          />
        )}
        {category.foods.map((food, index) => (
          <FoodCard
            key={`${category.id}-${index}`}
            food={food}
            onClick={() => onEdit(food)}
          />
        ))}
      </div>
    </div>
  );
};
