import CommentForm from "@/components/forms/CommentForm";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CommentRepliesProps } from "@/types/index.types";
import React, { useState } from "react";

type Props = {
  comment: string;
  author: { image: string; firtName: string; lastName: string };
  reply: CommentRepliesProps[];
  videoId: string;
  commentId: string;
  isReply?: boolean;
};

const CommentCard = (props: Props) => {
  const [onReply, setonReply] = useState(false);
  return (
    <Card
      className={cn(
        props.isReply
          ? "pl-6  bg-[#1D1D1D] border-none"
          : "p-4 border-[1px] bg-[#1D1D1D]  "
      )}
    >
      <div>
        <div className=" flex gap-x-2 items-center ">
          <Avatar className=" h-6 w-6">
            <AvatarImage
              className=""
              src={props.author.image}
              alt={props.author.firtName}
            />
          </Avatar>
          <p className=" text-sm capitalize text-zinc-400 ">
            {props.author.firtName} {props.author.lastName}
          </p>
        </div>
        <div>
          <p className=" text-sm text-zinc-300 ">{props.comment}</p>
        </div>
        {!props.isReply && (
          <div className=" w-full flex justify-end mt-3 ">
            {!onReply ? (
              <Button
                onClick={() => setonReply(true)}
                className="  justify-end bg-white text-zinc-800 rounded-full "
              >
                Reply
              </Button>
            ) : (
              <CommentForm
                videoId={props.videoId}
                commentId={props.commentId}
                author={props.author.firtName}
                close={() => setonReply(false)}
                iscommenrCard
              />
            )}
          </div>
        )}
        {props.reply.length > 0 && (
          <div className=" flex flex-col   ">
            {props.reply.map((reply) => (
              <CommentCard
                key={reply.id}
                author={{
                  image: reply.user?.image || "",
                  firtName: reply.user?.firstName || "",
                  lastName: reply.user?.lastName || "",
                }}
                reply={[]}
                comment={reply.comment}
                videoId={props.videoId}
                commentId={reply.id}
                isReply
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};

export default CommentCard;
