import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PUT = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params; // ← await нэмэх
  const body = await req.json();
  const { foodName, price, ingredients, image, foodCategoryId } = body;

  const updated = await prisma.food.update({
    where: { id },
    data: { foodName, price, ingredients, image, foodCategoryId },
  });

  return NextResponse.json(updated);
};

export const DELETE = async (
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params; // ← await нэмэх

  await prisma.food.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
};
