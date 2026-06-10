import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Prisma } from "@/app/generated/prisma/client";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { OrderFoodCell } from "./OrderFood";
import { Checkbox } from "@/components/ui/checkbox";
type OrderWithDetails = Prisma.FoodOrderGetPayload<{
  include: {
    user: true;
    foodOrderItems: { include: { food: true } };
  };
}>;

export const OrderRow = ({
  order,
  index,
  onStatusChange,
  checked,
  onCheckedChange,
}: {
  order: OrderWithDetails;
  index: number;
  onStatusChange: (id: string, status: string) => void;
  checked: boolean;
  onCheckedChange: () => void;
}) => {
  return (
    <TableRow key={order.id}>
      <TableCell>
        {" "}
        <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      </TableCell>
      <TableCell>{index + 1}</TableCell>
      <TableCell>{order.user.email}</TableCell>
      <TableCell>
        <OrderFoodCell items={order.foodOrderItems} />
      </TableCell>
      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
      <TableCell>${order.totalPrice}</TableCell>
      <TableCell>
        <OrderStatusSelect
          onChange={(val) => onStatusChange(order.id, val)}
          status={order.status}
        />
      </TableCell>
    </TableRow>
  );
};
