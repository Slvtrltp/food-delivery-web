import React from "react";
import { FoodCard } from "./FoodCard";
import { AddFoodCard } from "./AddFoodCard";
import { FoodCategoryWithFood } from "../(admin)/admin/products/page";
import { LabelCat } from "./LabelCat";
import { Label } from "./Label";

export const FoodSection = ({
  category,
  onCreate,
}: {
  category: FoodCategoryWithFood;
  onCreate: (catId: string) => void;
}) => {
  return (
    <div className="space-y-3  w-full h-full rounded-lg bg-white py-6 px-6">
      <Label category={category} />
      <div className="grid grid-cols-4">
        <AddFoodCard
          onClick={() => {
            onCreate(category.id);
          }}
        />
        {category.foods.map((food, index) => (
          <FoodCard key={`${category.id}-${index}`} food={food} />
        ))}
      </div>
    </div>
  );
};
