import { archiveUnrchiveVideo } from "@/actions/workspace";
import { useMutationData } from "./UseMutaion";

export const useArchiveHook = (videoId: string, archived: boolean) => {
    const archiveVal = archived ? false : true;
   const {mutate, isPending} = useMutationData(
    ["archive-video"],
    () => archiveUnrchiveVideo(videoId, archiveVal),
    "video-preview"

  )

  return { mutate, isPending };
}