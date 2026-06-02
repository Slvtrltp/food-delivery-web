import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const foods = await prisma.food.findMany();
  return NextResponse.json(foods);
};
export const POST = async (req: NextRequest) => {
  const { foodCategoryId, ...restBody }: Prisma.FoodUncheckedCreateInput =
    await req.json();
  const result = await prisma.food.create({
    data: {
      ...restBody,
      category: {
        connect: {
          id: foodCategoryId,
        },
      },
    },
  });
  return NextResponse.json(result);
};
