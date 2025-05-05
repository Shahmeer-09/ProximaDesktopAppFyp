import { useAppSelector } from "@/redux/store";
import { useEffect, useState } from "react";
import { useMutationData } from "./UseMutaion";
import { getAlFolders, moveVideoLocation } from "@/actions/workspace";
import { UseZodForm } from "./UseZodForm";
import { createVideoLocationSchema } from "@/lib/zodschema/createvideoLocationSchema";

export const useMoveVideos = (videoId: string, currentWorkspace: string,querykey:string) => {
  const { workspace } = useAppSelector((state) => state.workspaceReducer);
  const { folders } = useAppSelector((state) => state.folderReducer);
  const [isfetching, setIsFetching] = useState(false);
  const [isFolders, setIsFolders] = useState<
    | {
        _count: { video: number };
        id: string;
        name: string;
        createdAt: Date;
        workspaceId: string | null;
      }[]
    | undefined
    | null
  >(null);

  const { mutate, isPending } = useMutationData(
    ["change-video-location"],
    (data: { workspace_id: string; folder_id: string }) =>
      moveVideoLocation(videoId, data.folder_id, data.workspace_id),
    querykey,
  );
  const { register, onFormSubmit, errors, watch, control } = UseZodForm(
    createVideoLocationSchema,
    mutate,
    {  workspace_id: "",folder_id: "" }
  );

  const fetchData = async (workspaceId: string) => {
    setIsFetching(true);
    const data = await getAlFolders(workspaceId);
    console.log(data)
    setIsFolders(data?.data);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchData(currentWorkspace);
  }, [currentWorkspace]);

  useEffect(() => {
    const workspacee = watch(async (value) => {
      if (value.workspace_id) {
        await fetchData(value.workspace_id);
      }
    });
    return () => workspacee.unsubscribe();
  }, [watch]);

  return {
    control,
    register,
    onFormSubmit,
    errors,
    isfetching,
    isPending,
    folders,
    workspace,
    isFolders,
  };
};
