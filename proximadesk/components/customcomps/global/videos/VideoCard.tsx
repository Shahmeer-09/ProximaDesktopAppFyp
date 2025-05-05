"use client";
import React from "react";
import CardMenu from "./CardMenu";
import Loader from "../Loader";
import { getDaysAgo } from "@/utils/GetDaysAgo";
import CopyLink from "../CopyLink";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dot, Share2, User } from "lucide-react";
type Props = {
  workspaceId: string;
  id: string;
  title: string | null;
  description: string | null;
  summary: string | null;
  source: string;
  processed: boolean;
  createdAt: Date;
  folder?: {
    id: string;
    name: string;
  } | null;
  user: {
    firstName: string;
    lastName: string;
    image: string;
  } | null;
};
const VideoCard = (props: Props) => {
  const created = getDaysAgo(props.createdAt);
  return (
    <Loader state={false}>
      <div className=" group overflow-hidden   relative  bg-[#171717] flex flex-col rounded-xl border-[1px] border-[#252525]  ">
        <div className=" hidden absolute top-3 right-3 z-50 gap-y-3 group-hover:flex flex-col items-center ">
          <CardMenu
            videoID={props.id}
            CurrentWorkSpace={props.workspaceId}
            currentFolder={props.folder?.name}
            currentfolderID={props.folder?.id}
          />
          <CopyLink
            variants="ghost"
            className=" p-0 h-5 hover:text-white rounded-full   cursor-pointer "
            videoId={props.id}
          />
        </div>
        <Link
          className=" flex justify-between flex-col hover:bg-neutral-800 transition duration-150  "
          href={`/dashbord/${props.workspaceId}/video/${props.id}`}
        >
          <video
            controls={false}
            preload="metadata"
            className=" w-full aspect-video opacity-50 z-20"
          >
            <source
              src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}#t=1`}
            />
          </video>
          <div className=" px-5 py-4 flex flex-col gap-y-2 z-20 ">
            <h2 className=" text-sm font-semibold text-neutral-300 ">
              {props.title}
            </h2>
            <div className=" flex items-center gap-x-2 ">
              <Avatar className="mt-4">
                <AvatarImage src={props.user?.image} alt="user image" />
                <AvatarFallback>
                  {" "}
                  <User />{" "}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className=" text-xs text-neutral-300  ">
                  {" "}
                  {props.user?.firstName} {props.user?.lastName}
                </p>
                <p className=" text-xs flex items-center text-neutral-500  ">
                  <Dot /> {created}
                </p>
              </div>
            </div>
            <div className=" mt-2 ">
              <span className=" flex gap-x-1 items-center ">
                <Share2 size={12} className=" text-neutral-200 " />
                <p className="text-xs text-neutral-500">
                  {props.user?.firstName}`s workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
};

export default VideoCard;
