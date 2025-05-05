import { prisma } from "@/lib/prisma";
import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params:Promise< { userid: string }> }
) {
  try {
    const userid =(await params).userid;
     console.log("endpoint hid 💚")
    const existingUSer = await prisma.user.findUnique({
      where: {
        clerkId: userid,
      },
      include: {
        media: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (existingUSer) {
      return NextResponse.json({ status: 200, data: existingUSer });
    }

    const clerkClientInstance = await clerkClient();
    const userinstance = await clerkClientInstance.users.getUser(userid);

    const authUser = await prisma.user.create({
      data: {
        clerkId: userinstance.id,
        email: userinstance.emailAddresses[0]?.emailAddress || "",
        firstName: userinstance.firstName || "",
        lastName: userinstance.lastName || "",
        image: userinstance.imageUrl || "",
        subscription: { create: {} },
        media: { create: {} },
        workspace: {
          create: {
            name: `${userinstance.firstName || "User"}'s Workspace`,
            type: "PRIVATE",
          },
        },
      },
      include: {
        workspace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (authUser) {
      return NextResponse.json({ status: 201, data: authUser });
    }
    return NextResponse.json({ status: 400, data: null });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, data: null });
  }
}
