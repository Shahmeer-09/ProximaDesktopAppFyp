import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const userid =(await params).userId;
    const body = await req.json();

    const completeVideo = await prisma.video.update({
      where: {
        source_userId: {
          source: body?.fileName,
          userId: userid,
        },
      },
      data: {
        processed: false,
      },
    });
    if(completeVideo){
        return NextResponse.json({
            status: 200,
            message: "Video completed",
        });
    }
    return NextResponse.json({
        status: 400,
        message: "Something went wrong",
    });
  } catch (error) {
    console.log("error something went wrong", error);
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
    });
  }
}
