import { createFolder } from "@/actions/workspace";
import { useMutationData } from "./UseMutaion";

export const UseCreateFolder = (workspaceid:string) => {
  const { mutate, isPending } = useMutationData(
    ["create-folder"],
    () => createFolder(workspaceid), // ✅ Ensure type compatibility
    "workspace-folders"
  );
  const OncreateFolder = () => {
    mutate({ name: "new folder", id: "optimistic-id" }); // Call the mutate function with the data you want to send
  };
  return { OncreateFolder, isPending };
};
