import { prisma } from "./../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const user = res.user;
  if(!user || !user.id){
    return NextResponse.json({ status: 400, data: null });
  }
  try {
    const authUser = await prisma.user.upsert({
      where: { clerkId: user.id },
      update: {}, // No need to update fields for now
      create: {
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        image: user.imageUrl || "",
        subscription: { create: {} },
        media: { create: {} },
        workspace: {
          create: {
            name: `${user.firstName || "User"}'s Workspace`,
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
    return NextResponse.json({ status: 200, data:authUser});
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 500, data: null });
  }
}
