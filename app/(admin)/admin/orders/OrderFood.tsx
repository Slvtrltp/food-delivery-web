import { Prisma } from "@/app/generated/prisma/client";

type OrderItem = Prisma.FoodOrderItemGetPayload<{
  include: { food: true };
}>;

export const OrderFoodCell = ({ items }: { items: OrderItem[] }) => {
  if (items.length === 1) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={items[0].food.image}
          className="w-8 h-8 rounded object-cover"
        />
        <span>{items[0].food.foodName}</span>
        <span className="text-gray-400">x{items[0].quantity}</span>
      </div>
    );
  }
  return <span className="text-gray-500">{items.length} foods</span>;
};
