"use client";

import { getVideoComment } from "@/actions/workspace";
import CommentForm from "@/components/forms/CommentForm";
import { TabsContent } from "@/components/ui/tabs";
import { useQueryData } from "@/hooks/userQueryData";
import { CommentProps } from "@/types/index.types";
import React from "react";
import CommentCard from "../videos/CommentCard";

const Activities = ({
  videoId,
  author,
}: {
  videoId: string;
  author: string;
}) => {
  const { data } = useQueryData(
    () => getVideoComment(videoId),
    ["all-comments"]
  );
  const comments = data as CommentProps;
  return (
    <TabsContent
      value="Activity"
      className="  gap-y-5  p-5 rounded-xl bg-zinc-800"
    >
      <div className=" flex flex-col gap-y-3.5">

      <CommentForm author={author} videoId={videoId} />
      {comments .data.length >0 ?
        comments.data?.map((comment) => (
          <CommentCard
            key={comment.id}
            comment={comment.comment}
            author={{
              image: comment.user?.image || "",
              firtName: comment.user?.firstName || "",
              lastName: comment.user?.lastName || "",
            }}
            reply={comment.reply}
            videoId={comment.videoId!}
            commentId={comment.id}
            />
        ))
            :(
              <p className=" mt-2 ml-10 text-neutral-400" >No comments</p>
            )
      }
      </div>

    </TabsContent>
  );
};

export default Activities;
