import { Prisma } from "@/app/generated/prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

type OrderItem = Prisma.FoodOrderItemGetPayload<{
  include: { food: true };
}>;

export const OrderFoodCell = ({ items }: { items: OrderItem[] }) => {
  if (items.length === 1) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={items[0].food.image}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span>{items[0].food.foodName}</span>
        <span className="text-gray-400">x{items[0].quantity}</span>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 text-gray-700 hover:text-black">
          <span>{items.length} foods</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56 p-2">
        <div className="flex flex-col gap-2">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-2 px-1">
              <img
                src={item.food.image}
                className="w-8 h-8 rounded-md object-cover flex-shrink-0"
              />
              <span className="flex-1 text-sm">{item.food.foodName}</span>
              <span className="text-gray-400 text-sm">x {item.quantity}</span>
            </div>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
