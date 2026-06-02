import { Prisma } from "@/app/generated/prisma/browser";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  headers();
  const foodCategory = await prisma.foodCategory.findMany({
    include: {
      _count: {
        select: {
          foods: true,
        },
      },
    },
  });
  return NextResponse.json(foodCategory);
};

export const POST = async (req: NextRequest) => {
  const body: Prisma.FoodCategoryCreateInput = await req.json();
  const result = await prisma.foodCategory.create({ data: body });
  return NextResponse.json(result);
};

// export const POST = async (req: NextRequest) => {
//   const body = await req.json();

//   if (!body.categoryName) {
//     return NextResponse.json(
//       { error: "categoryName заавал шаардлагатай!" },
//       { status: 400 },
//     );
//   }
//   const newCategory = await prisma.foodCategory.create({
//     data: {
//       categoryName: body.categoryName,
//     },
//   });

//   return NextResponse.json(newCategory, { status: 201 });
// };
