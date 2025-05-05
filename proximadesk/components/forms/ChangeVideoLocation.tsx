import React from "react";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMoveVideos } from "@/hooks/UseMoveVideos";
import { Controller } from "react-hook-form";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import Loader from "../customcomps/global/Loader";

type Props = {
  videoID: string;
  CurrentWorkSpace: string;
  currentFolder?: string;
  currentfolderID?: string;
};

const ChangeVideoLocation = (props: Props) => {
  const { workspace, isFolders,folders, onFormSubmit, control, isfetching, isPending } =
    useMoveVideos(props.videoID, props.CurrentWorkSpace, "folder-videos");
  const folder = folders?.find(
    (folder) => folder.id === props.currentfolderID
  );
  const currentWorkspace = workspace?.find(
    (workspace) => workspace.id === props.CurrentWorkSpace
  );
  return (
    <form action="" onSubmit={onFormSubmit}>
      <div className="flex flex-col gap-y-5">
        <div className="boder-[1px] rounded-xl p-5">
          <div className="mb-5">
            <h2 className="text-xs text-[#4a4a4a]">Current Workspce</h2>
            <p className=" text-neutral-400 text-sm">
              {currentWorkspace?.name}
            </p>
          </div>
          <div>
            <h2 className="text-xs text-[#4a4a4a]">Current Folder</h2>
            <p className="text-neutral-400 text-sm">{folder?.name} folder </p>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex flex-col gap-y-5 p-5 border-[1px] rounded-xl">
          <h2 className="text-xs text-[#4a4a4a]">To</h2>
          <label className="flex-col gap-y-2 flex">
            <p className="text-xs">Workspace</p>
            <Controller
              name="workspace_id"
              control={control} // ← get this from your useMoveVideos hook
              defaultValue={currentWorkspace?.id || ""}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="rounded-lg w-full">
                    <SelectValue placeholder="Select workspace" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111111]">
                    {workspace?.map((ws) => (
                      <SelectItem key={ws.id} value={ws.id}>
                        {ws.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </label>
          {isfetching ? (
            <Skeleton className=" w-full h-[40px] rounded-xl bg-zinc-700 " />
          ) : (
            <label className="flex-col gap-y-2 flex">
              <p className="text-xs">Folders in this workspace</p>
              {isFolders && isFolders.length > 0 ? (
                <Controller
                  name="folder_id"
                  control={control} // ← get this from your useMoveVideos hook
                  defaultValue={folder?.id || ""}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="rounded-lg w-full">
                        <SelectValue placeholder="Select workspace" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#111111]">
                        {isFolders?.map((ws, key) =>
                          key == 0 ? (
                            <SelectItem key={ws.id} value={ws.id}>
                              {ws.name}
                            </SelectItem>
                          ) : (
                            <SelectItem key={ws.id} value={ws.id}>
                              {ws.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  )}
                />
              ) : (
                <p className="text-xs text-[#4a4a4a]">
                  No Folders for thiw workspace
                </p>
              )}
            </label>
          )}
          <Button   className="w-full  bg-white text-zinc-800   ">
            <Loader state={isPending} >
              Trnasfer
            </Loader>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChangeVideoLocation;
