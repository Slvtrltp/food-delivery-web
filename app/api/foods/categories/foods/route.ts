import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  const categories = await prisma.foodCategory.findMany({
    include: { foods: true },
  });
  return NextResponse.json(categories);
};
export const POST = async (req: Request) => {
  const body = await req.json();
  const { foodName, price, ingredients, image, foodCategoryId } = body;

  const food = await prisma.food.create({
    data: { foodName, price, ingredients, image, foodCategoryId },
  });

  return NextResponse.json(food);
};
