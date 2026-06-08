"use client";
import { Food } from "@/app/generated/prisma/client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useCart } from "./CartContext";

export const FoodDetailModal = ({
  food,
  open,
  onClose,
}: {
  food: Food | null;
  open: boolean;
  onClose: () => void;
}) => {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!food) return null;

  const handleAdd = () => {
    addItem(food, quantity);
    onClose();
    setQuantity(1);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-2xl p-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">{food.foodName}</DialogTitle>
        <div className="flex">
          <img
            src={food.image}
            alt={food.foodName}
            className="w-[280px] h-full object-cover"
          />
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-2xl font-bold text-[#448A5B] mb-2">
                {food.foodName}
              </h2>
              <p className="text-gray-500 text-sm">{food.ingredients}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Total price</p>
              <p className="text-2xl font-bold mb-4">
                ${(food.price * quantity).toFixed(2)}
              </p>

              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-lg"
                >
                  −
                </button>
                <span className="text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-lg"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
