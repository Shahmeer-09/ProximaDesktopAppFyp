import { editVideoSchema } from "@/lib/zodschema/EditvideoScehma";
import { UseZodForm } from "./UseZodForm";
import { useMutationData } from "./UseMutaion";
import { editVideoInfo } from "@/actions/workspace";
export const useEditVideoHook = (
  videId: string,
  title: string,
  description: string
) => {
  const { mutate, isPending } = useMutationData(
    ["Edit-video"],
    (data: { title: string; description: string }) =>
      editVideoInfo(data.title, data.description, videId),
    "video-preview"
  );
  const { errors, onFormSubmit, register } = UseZodForm(
    editVideoSchema,
    mutate,
    { title, description }
  );

  return { register, onFormSubmit, errors, isPending };
};
