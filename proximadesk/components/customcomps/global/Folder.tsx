"use client";

import {  FolderIcon,  Loader2 } from "lucide-react";
import React from "react";
import FolderCard from "./FolderCard";
import { useQueryData } from "@/hooks/userQueryData";
import { getAlFolders } from "@/actions/workspace";
import { UsermutationDatastate } from "@/hooks/UserMutationDataState";
import { cn } from "@/lib/utils";
import { useDispatch } from "react-redux";
import { FOLDERS } from "@/redux/slices/folders";
import { FoldersI } from "@/types/index.types";

type Props = {
  workspaceID: string;
};

const Folder = ({ workspaceID }: Props) => {
  const dispatch = useDispatch()
  const { data, isFetching , isFetched} = useQueryData(
    () => getAlFolders(workspaceID),
    ["workspace-folders"]
  );
  const { latestvaraibles } = UsermutationDatastate(["create-folder"]);
  const folders = data as FoldersI;
  if (isFetching && !folders) {
    return (
      <div className=" flex items-center justify-center w-full mt-5 ">
        <Loader2 size={20} className=" text-neutral-400 animate-spin " />
      </div>
    )
  }
  if(isFetched && folders?.status === 200){
    dispatch(FOLDERS({folders:folders.data }))
  }
  return (
    <div className=" flex flex-col gap-4 ">
      <div className=" flex items-center justify-between ">
        <div className=" flex items-center gap-2 ">
          <FolderIcon
            strokeWidth={3}
            size={25}
            className=" text-neutral-400 "
          />
          <h2 className=" text-neutral-200 font-semibold  text-xl ">Folders</h2>
        </div>
        {/* <div className=" flex items-center gap-2 cursor-pointer ">
          <span className=" text-neutral-200 text-sm ">see all</span>
          <ArrowRight size={15} className=" text-neutral-400 " />
        </div> */}
      </div>
      <section
        className={cn(
          folders?.status !== 200
            ? " justify-center flex w-full "
            : " flex items-center gap-4 w-full overflow-x-auto "
        )}
      >
        {folders && folders?.status !== 200 ? (
          <p className=" text-neutral-300  ">No folders found</p>
        ) : (
          <>
            {latestvaraibles && latestvaraibles.status == "pending" && (
              <FolderCard
                key={latestvaraibles.variables.id}
                title={latestvaraibles.variables.name}
                id={latestvaraibles.variables.id}
                optimistic
              />
            )}
            {folders &&
              folders?.data.map((folder) => (
                <FolderCard
                  key={folder.id}
                  id={folder.id}
                  title={folder.name}
                  count={folder._count.video}
                />
              ))}
          </>
        )}
      </section>
    </div>
  );
};

export default Folder;
