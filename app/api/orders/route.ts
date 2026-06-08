import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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

export const POST = async (req: NextRequest) => {
  const { userId, totalPrice, items, address } = await req.json();

  const order = await prisma.foodOrder.create({
    data: {
      userId,
      totalPrice,
      address,
      foodOrderItems: {
        create: items.map((i: { foodId: string; quantity: number }) => ({
          foodId: i.foodId,
          quantity: i.quantity,
        })),
      },
    },
  });
  return NextResponse.json(order);
};
