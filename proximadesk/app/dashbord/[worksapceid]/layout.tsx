
import { getAllbNotif, onAuthenticate } from "@/actions/user";
import {
  getAlFolders,
  getAllvideos,
  getAllWorkspace,
  hasUSerAccess,
} from "@/actions/workspace";
import Sidebar from "@/components/customcomps/global/Sidebar";
import { redirect } from "next/navigation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import GlobalHeader from "@/components/customcomps/global/GlobalHeader";
interface LayoutProps {
  params: Promise<{ worksapceid: string }>;
  children: React.ReactNode;
}

const Layout = async ({ params, children }: LayoutProps) => {
  const { worksapceid } = await params;
 const  user1=await onAuthenticate()
  if (!user1?.data?.workspace[0]?.id) {
    redirect(`/auth/sign-in`);
  }
  const hasAccess = await hasUSerAccess(worksapceid);
  if (hasAccess?.status !== 200) {
    redirect(`/dashbord/${user1.data?.workspace[0]?.id}`);
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["workspace-folder"],
    queryFn: () => getAlFolders(worksapceid),
  });
  await queryClient.prefetchQuery({
    queryKey: ["all-videos"],
    queryFn: () => getAllvideos(worksapceid),
  });
  await queryClient.prefetchQuery({
    queryKey: ["archive-videos"],
    queryFn: () => getAllvideos(worksapceid),
  });
  await queryClient.prefetchQuery({
    queryKey: ["all-workspaces"],
    queryFn: () => getAllWorkspace(),
  });
  await queryClient.prefetchQuery({
    queryKey: ["all-notif"],
    queryFn: () => getAllbNotif(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex min-h-screen w-screen">
        <Sidebar activeWorkspaceid={worksapceid} />
        <div className="w-full pt-28 p-6 max-h-screen  overflow-y-scroll overflow-x-hidden">
          <GlobalHeader workspace={hasAccess.data} />
          <div className="mt-4">{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Layout;
