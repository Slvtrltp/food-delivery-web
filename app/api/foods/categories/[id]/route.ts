import { FoodCategory, Prisma } from "@/app/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  await prisma.foodCategory.delete({ where: { id } });
  return NextResponse.json({ message: "Устгагдлаа" });
};
export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  headers();
  const { id } = await params;
  const body: Prisma.FoodCategoryCreateInput = await req.json();
  const result = await prisma.foodCategory.update({
    where: { id },
    data: { categoryName: body.categoryName },
  });
  return NextResponse.json(result);
};
