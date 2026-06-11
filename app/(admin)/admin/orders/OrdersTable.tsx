"use client";

import { useEffect, useMemo, useState } from "react";
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
import { Prisma } from "@/app/generated/prisma/client";
import { OrderStatusSelect } from "./OrderStatusSelect";
import { OrderRow } from "./OrderRow";
import { Checkbox } from "@/components/ui/checkbox";
import { on } from "events";
import { DatePickerWithRange } from "./DateRange";
import { DateRange } from "react-day-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FoodOrderStatus, ORDER_STATUSES } from "./types";
import { ChevronLeft, ChevronRight } from "lucide-react";

type OrderWithDetails = Prisma.FoodOrderGetPayload<{
  include: {
    user: true;
    foodOrderItems: { include: { food: true } };
  };
}>;
const PAGE_SIZE = 15;
export default function OrdersTable() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("/api/orders").then((res) => setOrders(res.data));
  }, []);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      if (!dateRange?.from) return true;
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      const from = new Date(dateRange.from);
      from.setHours(0, 0, 0, 0);
      const to = dateRange.to ? new Date(dateRange.to) : from;
      to.setHours(23, 59, 59, 999);
      return orderDate >= from && orderDate <= to;
    });
  }, [orders, dateRange]);
  const totalPages = Math.ceil(filteredOrders.length / PAGE_SIZE);
  const paginatedOrders = useMemo(() => {
    return filteredOrders.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE,
    );
  }, [filteredOrders, currentPage]);

  // dateRange өөрчлөгдөхөд page-г reset хийх handler
  const handleDateRangeChange = (range: DateRange | undefined) => {
    setDateRange(range);
    setCurrentPage(1);
  };
  const all = () => {
    if (selected.length === orders.length) {
      setSelected([]);
    } else {
      setSelected(orders.map((order) => order.id));
    }
  };

  const one = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };
  const handleStatusChange = async (orderId: string, status: string) => {
    await axios.put(`/api/orders/${orderId}`, { status });
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: status as FoodOrderStatus } : o,
      ),
    );
  };
  const handleBulkStatusChange = async (status: string) => {
    await Promise.all(
      selected.map((id) => axios.put(`/api/orders/${id}`, { status })),
    );
    setOrders((prev) =>
      prev.map((o) =>
        selected.includes(o.id)
          ? { ...o, status: status as FoodOrderStatus }
          : o,
      ),
    );
    setSelected([]);
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-1">Orders</h1>
          <p className="text-gray-400 text-sm mb-6">
            {filteredOrders.length} items
          </p>
        </div>
        <div className="flex items-center gap-5">
          <DatePickerWithRange onChange={handleDateRangeChange} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                disabled={selected.length === 0}
                className="px-4 py-2 rounded-3xl text-white bg-black disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Change delivery state
                {selected.length > 0 && (
                  <span className="ml-2 bg-white text-black rounded-full px-2 text-xs font-bold">
                    {selected.length}
                  </span>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {ORDER_STATUSES.map((status) => (
                <DropdownMenuItem
                  disabled={selected.length === 0}
                  key={status}
                  onClick={() => handleBulkStatusChange(status)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                checked={selected.length === orders.length && orders.length > 0}
                onCheckedChange={all}
              />
            </TableHead>
            <TableHead>№</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Food</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Delivery state</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.map((order, index) => (
            <OrderRow
              key={order.id}
              order={order}
              index={(currentPage - 1) * PAGE_SIZE + index}
              onStatusChange={handleStatusChange}
              checked={selected.includes(order.id)}
              onCheckedChange={() => one(order.id)}
            />
          ))}
        </TableBody>
      </Table>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <p className="text-sm text-gray-500">
            {(currentPage - 1) * PAGE_SIZE + 1}–
            {Math.min(currentPage * PAGE_SIZE, filteredOrders.length)} /{" "}
            {filteredOrders.length}
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md border disabled:opacity-40 hover:bg-gray-100"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "border hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md border disabled:opacity-40 hover:bg-gray-100"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
