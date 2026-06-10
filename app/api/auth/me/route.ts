import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid token" });
  }
  const [_, token] = authorization.split(" ");

  try {
    const payload = jwt.verify(token, "My-JWT-Secret") as { id: string };
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    return NextResponse.json({ message: "Success!", user });
  } catch {
    return NextResponse.json({ message: "Token expired" }, { status: 401 });
  }
};

export const PUT = async (req: NextRequest) => {
  const authorization = req.headers.get("Authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }
  const [_, token] = authorization.split(" ");
  try {
    const payload = jwt.verify(token, "My-JWT-Secret") as { id: string };
    const { address } = await req.json();
    const user = await prisma.user.update({
      where: { id: payload.id },
      data: { address },
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ message: "Token expired" }, { status: 401 });
  }
};
