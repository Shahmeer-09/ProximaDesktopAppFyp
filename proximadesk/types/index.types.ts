export interface workSpaceProps {
  status: number;
  data: {
    member: {
      workspace: {
        id: string;
        name: string;
        type: string;
      };
    }[];
    subscription: {
      plan: "FREE" | "PRO";
    };
    workspace: {
      id: string;
      name: string;
      type: "PUBLIC" | "PERSONAL";
    }[];
  };
}

export interface notificationI {
  status: number;
    data: {
      notification: {
        user: {
          image: string | null;
        } | null;
        id: string;
        userId: string | null;
        message: string;
      }[];
      _count: {
        notification: number;
      };
    };
}

type BaseFields = {
  id: string;
  name: string;
  createdAt: Date;
  workspaceId: string;
};

type Count = {
  _count: {
    video: number;
  };
};

 type Folders = BaseFields & Count;
 export interface FoldersI {
  status: number;
  data: Folders[];
 }

export interface folderInfoI {
  status:number ,
  data :{
    name: string;
    _count: {
      video: number;
    };
  }
}

export interface VideoTypes {

    status: number,
    data: {
    id: string,
    title: string|null,
    description: string|null,
    summary: string| null,
    source: string,
    processed: boolean,
    createdAt: Date,
    acrhived : boolean,
    viewCount: number,
    folder: {
      id: string,
      name: string,
    }|null,
    user: {
      firstName: string,
      lastName: string,
      image: string,
    }|null,
    }[]
}

export type VideoProps = {
  status: number;
  data: {
    user: {
      firstName: string | null;
      lastName: string | null;
      image: string | null;
      clerkId: string;
      trial: boolean;
      subscription: {
        plan: "PRO" | "FREE";
      } | null;
    } | null;
    title: string | null;
    description: string | null;
    source: string;
    viewCount: number;
    createdAt: Date;
    processed: boolean;
    summary: string;
    acrhived: boolean;
  };
  author: boolean;
};

export type CommentRepliesProps = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  user: {
    id: string;
    email: string;
    firstName: string | null;
    lastName: string | null;
    createdAt: Date;
    clerkId: string;
    image: string | null;
    trial: boolean;
    firstView: boolean;
  } | null;
};
export type CommentProps = {
  status: number;
  data:{
    user: {
      id: string;
      email: string;
      firstName: string | null;
      lastName: string | null;
      createdAt: Date;
      clerkId: string;
      image: string | null;
      trial: boolean;
      firstView: boolean;
    } | null;
    reply :CommentRepliesProps[]
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[]
}

