import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  const { id } = await params;
  const { status } = await req.json();
  const updated = await prisma.foodOrder.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(updated);
};
