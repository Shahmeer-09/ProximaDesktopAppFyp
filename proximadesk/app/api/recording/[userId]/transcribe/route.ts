import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const content = await req.json();
    const id =(await params).userId;
    const {
      fileName,
      transcription,
      content: { title, summary },
    } = content;
 console.log(title, summary, transcription)
    const completeTranscribe = await prisma.video.update({
      where: {
        source_userId: {
          source: fileName,
          userId: id,
        },
      },
      data: {
        title: title,
        description: summary,
        summary: transcription,
      },
    });

    if (completeTranscribe) {
      console.log("trasncribe completed");
      return NextResponse.json({
        status: 200,
        message: "Transcription completed",
      });
    }
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
    });
  } catch (error) {
    console.log("error something went wrong", error);
  }
}
