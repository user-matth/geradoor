import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { url, shortcode, expiresAt, description } = await req.json();

    const newQRCode = await prisma.qRCode.create({
      data: {
        url,
        shortcode,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        description,
      },
    });

    return NextResponse.json(newQRCode);
  } catch (error) {
    console.error("Erro ao criar QR Code:", error);
    return new NextResponse("Erro ao criar QR Code", { status: 500 });
  }
}
