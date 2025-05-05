import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const body = await req.json();
    const id =(await params).userId;

    const privateWorkspaces = await prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        workspace: {
          where: {
            type: "PRIVATE",
          },
          select: {
            id: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    const startProcessing = await prisma.workspace.update({
      where: {
        id: privateWorkspaces?.workspace[0]?.id,
      },
      data: {
        videos: {
          create: {
            source: body?.fileName,
            userId: id,
          },
        },
      },
      select: {
        user: {
          select: {
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (startProcessing) {
      return NextResponse.json({
        status: 200,
        plan: startProcessing?.user?.subscription?.plan,
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
