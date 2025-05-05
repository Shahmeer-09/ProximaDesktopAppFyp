import { getUserInfo } from '@/actions/user';
import { getPreviewVideo, getVideoComment } from '@/actions/workspace';
import VideoPeview from '@/components/customcomps/global/videos/VideoPeview';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import React from 'react';

type Params = {
  params: Promise<{
    videoid: string;
  }>;
};

const page = async ({ params }:Awaited<Params>) => {
  const { videoid } =(await params) // Extract videoid from params

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['video-preview'],
    queryFn: () => getPreviewVideo(videoid),
  });
  await queryClient.prefetchQuery({
    queryKey: ['user-info'],
    queryFn: () => getUserInfo(),
  });
  await queryClient.prefetchQuery({
    queryKey: ['all-comments'],
    queryFn: () => getVideoComment(videoid),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoPeview videoId={videoid} />
    </HydrationBoundary>
  );
};

export default page;