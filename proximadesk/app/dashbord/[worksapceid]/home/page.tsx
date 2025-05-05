import { getVixVideo } from "@/actions/workspace";
import VideoCard from "@/components/customcomps/global/videos/VideoCard";
import React from "react";

const Home = async () => {
  const vides = await getVixVideo();

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-2 gap-5 ">
      {vides
        ? vides.data?.map((video) => (
            <VideoCard
              key={video.id}
              {...video}
              user={{
                firstName: video.user?.firstName ?? "",
                lastName: video.user?.lastName ?? "",
                image: video.user?.image ?? "",
              }}
              workspaceId={video?.workspaceId as string}
            />
          ))
        : ""}
    </div>
  );
};

export default Home;
