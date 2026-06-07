"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FoodOrderStatus, Prisma } from "@/app/generated/prisma/client";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { OrderRow } from "./OrderRow";

type OrderWithDetails = Prisma.FoodOrderGetPayload<{
  include: {
    user: true;
    foodOrderItems: { include: { food: true } };
  };
}>;

export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => setOrders(res.data));
  }, []);

  const handleStatusChange = async (orderId: string, status: string) => {
    await axios.put(`/api/orders/${orderId}`, { status });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: status as FoodOrderStatus } : o,
      ),
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Orders</h1>
      <p className="text-gray-400 text-sm mb-6">{orders.length} items</p>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order, index) => (
            <OrderRow
              key={order.id}
              order={order}
              index={index}
              onStatusChange={handleStatusChange}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
