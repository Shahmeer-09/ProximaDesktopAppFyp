import { getUserInfo } from '@/actions/user';
import { getPreviewVideo, getVideoComment } from '@/actions/workspace';
import VideoPeview from '@/components/customcomps/global/videos/VideoPeview';
import { dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import React from 'react'

const page = async ({videoId}:{videoId:string}) => {
 const queryClient = new QueryClient();
await queryClient.prefetchQuery({
  queryKey: ["video-preview"],
  queryFn: () => getPreviewVideo(videoId),
});
await queryClient.prefetchQuery({
  queryKey: ["user-info"],
  queryFn: () => getUserInfo(),
});
await queryClient.prefetchQuery({
  queryKey: ["all-comments"],
  queryFn: () => getVideoComment(videoId),
});
  return (
    <HydrationBoundary state={dehydrate(queryClient)} >
       <VideoPeview videoId={videoId} />
    </HydrationBoundary>
  )
}

export default page