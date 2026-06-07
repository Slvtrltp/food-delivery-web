import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const orders = await prisma.foodOrder.findMany({
    include: {
      user: true,
      foodOrderItems: {
        include: { food: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(orders);
};
