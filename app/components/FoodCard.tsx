import React from "react";
import Image from "next/image";

interface FoodCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  width: string;
  height: string;
}

export const FoodCard: React.FC<FoodCardProps> = ({
  image,
  title,
  description,
  price,
  width,
  height,
}) => {
  return (
    <div
      className={`my-10 group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col transition-all duration-300 hover:shadow-2xl`}
      style={{ width: width, height: height }}
    >
      <div className="relative w-full h-[240px] overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300 group-hover:opacity-50 group-hover:bg-[#448A5B]"
        />
      </div>

      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {description}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-extrabold text-gray-900">{price}</span>
          <button className="px-4 py-1.5 bg-[#448A5B] text-white text-sm font-semibold rounded-lg transition-colors hover:bg-[#40b367] active:scale-95 ">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
