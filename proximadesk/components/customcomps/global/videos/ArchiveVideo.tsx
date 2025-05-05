"use client";

import { getallArchivedVideos,  } from "@/actions/workspace";
import { useQueryData } from "@/hooks/userQueryData";
import { cn } from "@/lib/utils";
import { VideoTypes } from "@/types/index.types";
import { Video } from "lucide-react";
import React from "react";
import VideoCard from "./VideoCard";
interface Videoprops {
  workspaceid?: string;
  folderid: string;
  keyVal: string;
}

const ArchiveVideos = ({ workspaceid, folderid, keyVal }: Videoprops) => {
  const { data, isPending, isFetched } = useQueryData(
    () => getallArchivedVideos(folderid),
    [keyVal]
  );
  const vidoedata = data as VideoTypes;
  const vidioStatus = vidoedata?.status;
  const folderVids = vidoedata?.data;

  return (
    <div className=" flex  mt-4 flex-col gap-6  w-full  ">
      <div className=" flex items-center justify-between w-full">
        <div className=" flex items-center gap-2 ">
          <Video strokeWidth={4} size={25} className="text-zinc-400" />
          <h2 className=" text-zinc-200 font-semibold text-xl ">Videos</h2>
        </div>
      </div>
      <section
        className={cn(
          vidioStatus !== 200
            ? "p-5"
            : "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
        )}
      >
        {!isPending&& isFetched && vidioStatus == 200 ? (
          <>
            {folderVids &&
              Array.isArray(folderVids) &&
              folderVids.map((video) => (
                <VideoCard
                  workspaceId={workspaceid ?? folderid}
                  {...video}
                  key={video.id}
                />
              ))}
          </>
        ) : (
          <>
            {isPending ? (
              <p className=" text-neutral-400 ">Loading...</p>
            ) : (
              <p className=" text-neutral-400 "> No videos found</p>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default ArchiveVideos;
