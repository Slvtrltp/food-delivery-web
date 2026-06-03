import React from "react";
import Image from "next/image";
import { Food } from "../generated/prisma/client";

export const FoodCard = ({ food }: { food: Food }) => {
  return (
    <div
      className={`my-10 group w-[320px] h-[440px] relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-2xl`}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-gray-100">
        <Image
          src={food.image}
          alt={food.foodName}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-50 group-hover:bg-[#448A5B]"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {food.foodName}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {food.ingredients}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-extrabold text-gray-900">
            {food.price}
          </span>
          <button className="px-4 py-1.5 bg-[#448A5B] text-white text-sm font-semibold rounded-lg transition-colors hover:bg-[#40b367] active:scale-95 ">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
