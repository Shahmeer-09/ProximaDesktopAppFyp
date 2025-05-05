import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("the studi update called 💢");
  const id = (await params).id;
  const body = await request.json();

  const studio = await prisma.user.update({
    where: {
      id,
    },
    data: {
      media: {
        update: {
          mic: body.mic,
          screen: body.screen,
          preset: body.preset,
        },
      },
    },
  });

  if (studio) {
    return NextResponse.json({ status: 200, data: "studio updated" });
  }

  return NextResponse.json({ status: 400, data: "studio not updated" });
}
