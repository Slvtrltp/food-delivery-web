import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const foods = await prisma.food.findMany();
  return NextResponse.json(foods);
};
export const POST = async (req: NextRequest) => {
  const body = await req.json();

  if (!body.categoryName) {
    return NextResponse.json(
      { error: "categoryName заавал шаардлагатай!" },
      { status: 400 },
    );
  }
  const newCategory = await prisma.foodCategory.create({
    data: {
      categoryName: body.categoryName,
    },
  });

  return NextResponse.json(newCategory, { status: 201 });
};
