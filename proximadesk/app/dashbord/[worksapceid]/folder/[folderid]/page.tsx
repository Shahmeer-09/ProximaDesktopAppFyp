import { getAllvideos, getFolderInfo } from "@/actions/workspace";
import FolderInfo from "@/components/customcomps/global/FolderInfo";
import Videos from "@/components/customcomps/global/videos/Videos";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";

type Props = {
  params: Promise<{
    worksapceid: string;
    folderid: string;
  }>;
};

const page = async ({ params }: Props) => {
  const { folderid , worksapceid} = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["all-videos"],
    queryFn: () => getAllvideos(folderid),
  });

  await queryClient.prefetchQuery({
    queryKey: ["folder-info", folderid],
    queryFn: () => getFolderInfo(folderid),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderInfo folderid={folderid} />
      <Videos workspaceid={worksapceid} folderid={folderid} keyVal="folder-videos" />
    </HydrationBoundary>
  );
};

export default page;
  