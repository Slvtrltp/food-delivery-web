import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Prisma } from "../generated/prisma/client";
import { useState } from "react";
import { FoodCategoryWithFood } from "../(admin)/admin/products/page";

export const Label = ({ category }: { category: FoodCategoryWithFood }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[20px] font-semibold">{category.categoryName}</span>
      <div className="text-[20px] font-semibold">({category.foods.length})</div>
    </div>
  );
};
