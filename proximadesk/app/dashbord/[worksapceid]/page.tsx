import CreateWorkspace from "@/components/customcomps/global/CreateWorkspace";
import Folder from "@/components/customcomps/global/Folder";
import CreateFolders from "@/components/customcomps/global/CreateFolders";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import Videos from "@/components/customcomps/global/videos/Videos";
import ArchiveVideo from "@/components/customcomps/global/videos/ArchiveVideo";
type params = Promise<{ worksapceid: string }>;
const page = async({params}: {params: params} ) => {
  const  workspaceID  = (await params).worksapceid;
  return (
    <div className="">
      <Tabs defaultValue="video" className="mt-6">
        <div className=" w-full flex justify-between items-center ">
          <TabsList className=" bg-transparent gap-2 pl-0 ">
            <TabsTrigger
              className=" p-[13px] rounded-full px-6 data-[state=active]:bg-neutral-700 "
              value="video"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger
              className=" p-[13px] rounded-full px-6 data-[state=active]:bg-neutral-700 "
              value="archieve"
            >
              Archieve
            </TabsTrigger>
          </TabsList>
          <div className=" flex gap-x-3 ">
            <CreateWorkspace />
            <CreateFolders  worjspaceID={workspaceID} />
          </div>
        </div>
         <section className= " mt-4 " >
          <TabsContent value={"video"}>
              <Folder workspaceID = {workspaceID} />
              <Videos folderid={workspaceID} keyVal="all-videos" />
          </TabsContent>
          <TabsContent value={"archieve"}>
              <ArchiveVideo folderid={workspaceID} keyVal="archive-videos"/>
          </TabsContent>
         </section>
      </Tabs>
    </div>
  );
};

export default page;
