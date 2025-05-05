"use server";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { sendEmail } from "./user";

import { createClient, OAuthStrategy } from "@wix/sdk";
import { items } from "@wix/data";
export const hasUSerAccess = async (workspaceid: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.workspace.findFirst({
      where: {
        id: workspaceid,
        OR: [
          {
            user: {
              clerkId: user.id,
            },
          },
          {
            member: {
              some: {
                user: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });

    if (!data) {
      return { status: 400, data: null };
    }

    return { status: 200, data: data };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const getAlFolders = async (workspaceid: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.folder.findMany({
      where: {
        workspaceId: workspaceid,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        workspaceId: true,
        _count: {
          select: {
            video: true,
          },
        },
      },
    });
    if (data && data.length > 0) {
      return { status: 200, data: data };
    }
    return { status: 400, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};
export const getAllvideos = async (workspaceid: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.video.findMany({
      where: {
        acrhived: false,
        OR: [{ workspaceId: workspaceid }, { folderId: workspaceid }],
      },
      select: {
        id: true,
        title: true,
        description: true,
        source: true,
        processed: true,
        acrhived: true,
        createdAt: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (data && data.length > 0) {
      return { status: 200, data: data };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};


export const getallArchivedVideos = async (workspaceid: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.video.findMany({
      where: {
        acrhived: true,
        OR: [{ workspaceId: workspaceid }, { folderId: workspaceid }],
      },
      select: {
        id: true,
        title: true,
        description: true,
        source: true,
        processed: true,
        acrhived: true,
        createdAt: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (data && data.length > 0) {
      return { status: 200, data: data };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
}

export const getAllWorkspace = async () => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
        member: {
          select: {
            workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });
    if (data) {
      return { status: 200, data: data };
    }
    return { status: 400, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const createWorkspace = async (name: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const authorized = await prisma.user.findUnique({
      where: { clerkId: user.id },
      select: {
        subscription: {
          select: { plan: true },
        },
      },
    });

    if (authorized?.subscription?.plan === "PRO") {
      const updatedUser = await prisma.user.update({
        where: { clerkId: user.id },
        data: {
          workspace: {
            create: { name, type: "PUBLIC" },
          },
        },
      });
      return { status: 200, data: updatedUser };
    }

    return { status: 403, data: null }; // Not authorized
  } catch (error) {
    console.error(error);
    return { status: 500, data: null };
  }
};

export const renameFolder = async (
  data: { name: string },
  folderid: string
) => {
  console.log(folderid, data.name);
  try {
    const user = await currentUser();
    if (!user) {
      return { status: 401, data: null };
    }
    const response = await prisma.folder.update({
      where: {
        id: folderid,
      },
      data: {
        name: data.name,
      },
    });
    if (response) return { status: 200, data: "folder renamed" };
    return { status: 400, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const createFolder = async (workspaceid: string) => {
  console.log(workspaceid);
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const isNewFolder = await prisma.workspace.update({
      where: {
        id: workspaceid,
      },
      data: {
        folder: {
          create: {
            name: "new folder",
          },
        },
      },
    });
    if (isNewFolder) return { status: 200, data: isNewFolder };
    return { status: 400, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const getFolderInfo = async (folderid: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.folder.findUnique({
      where: {
        id: folderid,
      },
      select: {
        name: true,
        _count: {
          select: {
            video: true,
          },
        },
      },
    });
    if (data) {
      return { status: 200, data: data };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const moveVideoLocation = async (
  videId: string,
  folderId: string,
  workspaceId: string
) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: "something went wrong" };
  }
  try {
    const data = await prisma.video.update({
      where: {
        id: videId,
      },
      data: {
        folderId: folderId,
        workspaceId: workspaceId,
      },
    });
    if (data) {
      return { status: 200, data: "video moved" };
    }
    return { status: 400, data: "folder not found" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "something went wrong" };
  }
};

export const getPreviewVideo = async (videoId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const video = await prisma.video.findFirst({
      where: {
        id: videoId,
      },
      select: {
        title: true,
        createdAt: true,
        source: true,
        description: true,
        processed: true,
        viewCount: true,
        acrhived: true,
        summary: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
            clerkId: true,
            trial: true,
            subscription: {
              select: {
                plan: true,
              },
            },
          },
        },
      },
    });

    if (video) {
      return {
        status: 200,
        data: video,
        author: video.user?.clerkId == user.id ? true : false,
      };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.error("Error fetching video preview:", error);
    return { status: 500, data: null };
  }
};

export const getBillingInfo = async () => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    const data = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (data) {
      return { status: 200, data: data };
    }
    return { status: 404, data: null };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const createCommentReply = async (
  comment: string,
  userId: string,
  videoId: string,
  commentId?: string
) => {
  const user = await currentUser();
  if (!user) {
    return { status: 401, data: null };
  }
  try {
    if (commentId !== undefined) {
      await prisma.comment.update({
        where: {
          id: commentId,
        },
        data: {
          reply: {
            create: {
              comment: comment,
              videoId: videoId,
              userId: userId,
            },
          },
        },
      });
      return { status: 200, data: "reply created" };
    }
    await prisma.video.update({
      where: {
        id: videoId,
      },
      data: {
        comment: {
          create: {
            comment: comment,
            userId: userId,
          },
        },
      },
    });
    return { status: 200, data: "new comment added" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: null };
  }
};

export const getVideoComment = async (id: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 403, data: null };
  }
  try {
    const comments = await prisma.comment.findMany({
      where: {
        OR: [{ videoId: id }, { CommenId: id }],
        CommenId: null,
      },
      include: {
        reply: {
          include: {
            user: true,
          },
        },
        user: true,
      },
    });

    return { status: 404, data: comments };
  } catch (error) {
    console.log(error);
    return { status: 500, data: [] };
  }
};

export const sendEmailForFirstView = async (videoId: string) => {
  const user = await currentUser();
  if (!user) {
    return { status: 403, data: null };
  }
  try {
    const video = await prisma.video.findUnique({
      where: { id: videoId },
      select: {
        title: true,
        viewCount: true,
        user: {
          select: {
            email: true,
            firstView: true,
            clerkId: true,
          },
        },
      },
    });

    if (!video) return;
    const owner = video.user;
    if (owner?.clerkId == user.id || !owner?.firstView) {
      return {
        status: 200,
        data: "no need to send email or update view count",
      };
    }

    if (video.viewCount == 0) {
      await prisma.video.update({
        where: { id: videoId },
        data: { viewCount: video.viewCount + 1 },
      });
    } else {
      return { status: 200 };
    }
    const { trasnporter, mailoptions } = await sendEmail(
      user?.emailAddresses[0].emailAddress,
      video?.user?.email as string,
      "you got a viewer ",
      `your video with title "${video?.title}" got its first view`
    );
    trasnporter.sendMail(mailoptions, async (error, info) => {
      if (error) {
        console.log(error);
      } else {
        const notif = await prisma.user.update({
          where: { clerkId: user.id },
          data: {
            notification: {
              create: {
                message: mailoptions.text,
              },
            },
          },
        });
        if (notif) {
          return { status: 200 };
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const editVideoInfo = async (
  title: string,
  desscription: string,
  videoId: string
) => {
  try {
    const video = await prisma.video.update({
      where: { id: videoId },
      data: {
        title: title,
        description: desscription,
      },
    });
    if (video) {
      return { status: 200, data: "video updated" };
    }
    return { status: 400, data: "something went wrong" };
  } catch (error) {
    console.log("video update error", error);
    return { status: 500, data: "something went wrong" };
  }
};

export const getVixVideo = async () => {
  try {
    const myWixClient = createClient({
      modules: { items },
      auth: OAuthStrategy({
        clientId: process.env.WIX_CLIENT_ID as string,
      }),
    });

    // Fixed method - use query() instead of queryDataItems()
    const videos = await myWixClient.items.query("proxima-video").find();
    const videoIDs = videos.items.map((v) => v.title);

    const video = await prisma.video.findMany({
      where: {
        id: {
          in: videoIDs.filter((id) => id != null) as string[],
        },
      },
      select: {
        id: true,
        createdAt: true,
        source: true,
        title: true,
        summary: true,
        description: true,
        workspaceId: true,
        processed: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
    });

    if (!video || video.length === 0) {
      return { status: 404, data: [] };
    }

    return { status: 200, data: video };
  } catch (error) {
    console.log("Error fetching Wix videos:", error);
    return { status: 500, data: null };
  }
};

export const archiveUnrchiveVideo = async (
  videoid: string,
  archived: boolean
) => {
  try {
    await prisma.video.update({
      where: {
        id: videoid,
      },
      data: {
        acrhived: archived,
      },
    });
    if (archived=== false) {
      return { status: 200, data: "video is unarchived" };
    }
    if (archived === true) {
      return { status: 200, data: "video is archived" };
    }
    return { status: 400, data: "something went wrong" };
  } catch (error) {
    console.log(error);
    return { status: 500, data: "something went wrong" };
  }
};
