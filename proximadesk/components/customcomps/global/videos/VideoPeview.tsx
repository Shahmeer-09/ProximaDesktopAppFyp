"use client";

import { getPreviewVideo, sendEmailForFirstView } from "@/actions/workspace";
import { useQueryData } from "@/hooks/userQueryData";
import { VideoProps } from "@/types/index.types";
import { getDaysAgo } from "@/utils/GetDaysAgo";
import { useRouter } from "next/navigation";
import CopyLink from "../CopyLink";
import RichLink from "./RichLink";
import { getTruncatedText } from "@/lib/utils";
import TabMenu from "../Tabmenu/TabMenu";
import AiTools from "../Tabmenu/AiTools";
import Trnascript from "../Tabmenu/Trnascript";
import Activities from "../Tabmenu/Activities";
import { useEffect } from "react";
import EditVideo from "./EditVideo";
import ArchiveBtn from "./ArchiveBtn";

type Props = {
  videoId: string;
};

const VideoPeview = (props: Props) => {
  const router = useRouter();
  const { data } = useQueryData(
    () => getPreviewVideo(props.videoId),
    ["video-preview"]
  );
  const { data: video, status, author } = data as VideoProps;
  if (status !== 200) {
    router.push("/");
  }
  const firstView = async () => await sendEmailForFirstView(props.videoId);
  useEffect(() => {
    if (video && video?.viewCount == 0) {
      firstView();
    }
  }, []);
  console.log(video, "from video preview");
  console.log(props.videoId, video.acrhived, "from video preview");
  const createdDate = getDaysAgo(video.createdAt);
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-3 p-10 min-h-screen  lg:py-10 overflow-y-auto gap-5 ">
      <div className=" flex flex-col lg:col-span-2 gap-y-10 ">
        <div>
          <div className=" flex items-center justify-between gap-x-5 ">
            <h2 className="text-white font-bold text-4xl capitalize ">
              {" "}
              {video.title}
            </h2>
            <ArchiveBtn videoID={props.videoId} acrhived={video.acrhived} /> 
            {author ? (
              <EditVideo
                title={video.title ?? ""}
                description={video.description ?? ""}
                videoId={props.videoId}
              />
            ) : (
              <></>
            )}
          </div>
          <span className=" flex  gap-x-3 mt-2">
            <p className=" text-neutral-600  capitalize">
              {video.user?.firstName} {video.user?.lastName}
            </p>
            <p className=" text-neutral-600 ">{createdDate}</p>
          </span>
        </div>
        <video
          controls
          autoPlay={false}
          // preload="metadata"
          className=" w-full aspect-video opacity-50 rounded-xl border-[1px] border-[#252525]"
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${video.source}#t=1`}
            type={video.source.endsWith(".webm") ? "video/webm" : "video/mp4"}
          />
        </video>
        <div className="  flex flex-col gap-y-4 ">
          <div className=" flex items-center gap-x-5 justify-between ">
            <p className=" text-neutral-300 font-bold ">Description</p>
          </div>
          <p className=" text-neutral-400 text-lg font-medium ">
            {video.description} views
          </p>
        </div>
      </div>
      <div className="flex lg:col-span-1 flex-col gap-y-16">
        <div className="flex justify-end gap-x-3 items-center ">
          <CopyLink videoId={props.videoId} />
          <RichLink
            description={getTruncatedText(video?.description ?? "", 130)}
            id={props.videoId}
            title={video?.title}
            source={video?.source}
          />
        </div>
        <div>
          <TabMenu
            defalValur={"Ai tools"}
            trigger={["Ai tools", "Transcript", "Activity"]}
          >
            <AiTools
              trial={video?.user?.trial}
              plan={video.user?.subscription?.plan as "FREE" | "PRO"}
              videoId={props.videoId}
              transcription={video.summary}
            />
            <Trnascript transcript={video.summary as string} />
            <Activities
              videoId={props.videoId}
              author={video.user?.firstName as string}
            />
          </TabMenu>
        </div>
      </div>
    </div>
  );
};

export default VideoPeview;
