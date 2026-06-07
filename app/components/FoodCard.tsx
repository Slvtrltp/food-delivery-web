import React from "react";
import Image from "next/image";
import { Food } from "../generated/prisma/client";

export const FoodCard = ({
  food,
  onClick,
}: {
  food: Food;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="my-6 group w-[260px] h-[360px] relative bg-white rounded-xl shadow-md overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-xl"
    >
      <div className="relative w-full h-[180px] overflow-hidden bg-gray-100">
        <Image
          src={food.image}
          alt={food.foodName}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-80"
        />
      </div>

      <div className="p-3 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-800 line-clamp-1">
            {food.foodName}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {food.ingredients}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-extrabold text-gray-900">
            {food.price}
          </span>
          <button className="px-3 py-1 bg-[#448A5B] text-white text-xs font-semibold rounded-md transition-colors hover:bg-[#40b367] active:scale-95">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
