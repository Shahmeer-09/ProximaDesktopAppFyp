"use server";

import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_CLIENT_SECRET as string);

export const sendEmail = async (
  from: string,
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const trasnporter = nodemailer.createTransport({
    service: "gmail",

    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });
  const mailoptions = {
    from,
    to,
    subject,
    text,
    html,
  };
  return { trasnporter, mailoptions };
};
export const onAuthenticate = async () => {
  try {
    // Get current user (server-side operation)
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: null };
    }

    // Use the correct URL based on environment
    const baseUrl =
      process.env.NEXT_PUBLIC_HOST_URL ||
      (process.env.NODE_ENV === "production"
        ? "https://your-production-domain.com"
        : "http://localhost:3000");

    // Server-side fetch with Next.js caching
    const response = await fetch(`${baseUrl}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
      // Use Next.js data cache with a 5-minute revalidation period
      next: { 
        revalidate: 300, // 5 minutes in seconds
        tags: ['auth-user'] // Tag for manual revalidation
      }
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Authentication Error:", error);
    return { status: 500, data: null };
  }
};

export async function revalidateAuthCache() {
  try {
    const { revalidateTag } = await import('next/cache');
    revalidateTag('auth-user');
    return { success: true };
  } catch (error) {
    console.error("Failed to revalidate auth cache:", error);
    return { success: false, error };
  }
}
export const getAllbNotif = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: null };
    }
    const notif = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notification: {
          select: {
            user: {
              select: {
                image: true,
              },
            },
            id: true,
            message: true,
            userId: true,
          },
        },
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });
    if (notif && notif.notification.length > 0) {
      return { status: 200, data: notif };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);

    return { status: 500, data: null };
  }
};

export const searchWorkspaces = async (key: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: null };
    }
    key = key.trim();
    const workspaces = await prisma.user.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: key,
            },
          },
          {
            lastName: {
              contains: key,
            },
          },
          {
            email: {
              contains: key,
            },
          },
        ],
        NOT: {
          clerkId: user?.id,
        },
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstName: true,
        lastName: true,
        image: true,
        email: true,
      },
    });

    if (workspaces && workspaces.length > 0) {
      return { status: 200, data: workspaces };
    }
    return { status: 404, data: undefined };
  } catch (error) {
    console.log(error);

    return { status: 500, data: undefined };
  }
};

export const getFirstView = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: null };
    }
    const firstView = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        firstView: true,
      },
    });
    if (firstView) {
      return { status: 200, data: firstView.firstView };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);

    return { status: 500, data: null };
  }
};

export const enableFirstView = async (checked) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: null };
    }
    const firstView = await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        firstView: checked,
      },
    });
    if (firstView) {
      return { status: 200, data: firstView.firstView };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);

    return { status: 500, data: null };
  }
};

export const getUserInfo = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: null };
    }
    const userInfo = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        image: true,
      },
    });
    if (userInfo) {
      return { status: 200, data: userInfo };
    } else {
      return { status: 404, data: null };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const inviteMember = async (reciverId: string, workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 403, data: "user not found" };
    }

    const [reciverinfo, senderInfo] = await Promise.all([
      prisma.user.findUnique({
        where: {
          id: reciverId,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      }),
      prisma.user.findUnique({
        where: {
          clerkId: user.id,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
        },
      }),
    ]);
    if (reciverinfo && senderInfo) {
      const workspace = await prisma.workspace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (workspace) {
        const invitation = await prisma.invite.create({
          data: {
            senderId: senderInfo.id,
            receiverId: reciverinfo.id,
            workspaceId: workspace.id,
            content: `you are invited to join ${workspace.name}. Click here to join`,
          },
          select: {
            id: true,
          },
        });
        await prisma.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            notification: {
              create: {
                message: `${senderInfo.firstName} ${senderInfo.lastName} invited ${reciverinfo.firstName} ${reciverinfo.lastName} to join ${workspace?.name}`,
              },
            },
          },
        });
        if (invitation) {
          const { trasnporter, mailoptions } = await sendEmail(
            senderInfo.email,
            reciverinfo.email,
            "Invitation to join workspace",
            `you are invited to join ${workspace.name}. Click here to join`,
            `<a href="${process.env.NEXT_PUBLIC_HOST_LINK}/invite/${invitation.id}" style="background-color:#0000; padding:5px 10px; border-radius:10px;">Accept invite</a>`
          );
          trasnporter.sendMail(mailoptions, (error, info) => {
            if (error) {
              console.log(error);
            }
            console.log(info);
          });
          return { status: 200, data: "invitation sent" };
        }
        return { status: 400, data: "invitation not sent" };
      }
      return { status: 404, data: "workspace not found" };
    }
    return { status: 404, data: "user not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const acceptinvitaion = async (invitationId: string) => {
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 404, data: "user not found" };
    }
    const invitation = await prisma.invite.findUnique({
      where: {
        id: invitationId,
      },
      select: {
        id: true,
        workspaceId: true,
        receiver: {
          select: {
            clerkId: true,
          },
        },
      },
    });
    if (user.id !== invitation?.receiver?.clerkId) {
      return { status: 401, data: "not authorized" };
    }
    const updateInvitation = prisma.invite.update({
      where: {
        id: invitationId,
      },
      data: {
        accepted: true,
      },
    });
    const addUsertoWorkspace = prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        member: {
          create: {
            workspaceId: invitation?.workspaceId,
          },
        },
      },
    });
    const invitationTransaction = await prisma.$transaction([
      updateInvitation,
      addUsertoWorkspace,
    ]);
    if (invitationTransaction) {
      return { status: 200, data: "invitation accepted" };
    }
    return { status: 400, data: "invitation not accepted" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const UpdateSubsciption = async (session_id: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 403, data: "user not found" };
  }
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session) {
      const subscription = await prisma.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          trial:false,
          subscription: {
            update: {
              customerId: session.customer as string,
              plan: "PRO",
            },
          },
        },
      });
      if(subscription){
        return { status: 200, data: "subscription updated" };
      }
      return { status: 404, data: "subscription not found" };
    }
  } catch (error) {
     console.log(error);
    return { status: 500, data: null };
  }

}
