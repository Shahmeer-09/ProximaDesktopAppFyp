import { commenReply } from "@/lib/zodschema/createworkspaceSchema";
import { useMutationData } from "./UseMutaion";
import { useQueryData } from "./userQueryData";
import { UseZodForm } from "./UseZodForm";
import { createCommentReply } from "@/actions/workspace";
import { getUserInfo } from "@/actions/user";

export const useCommentReply = (videoId: string, commentId?: string) => {
  const { data } = useQueryData(getUserInfo, ["user-info"]);

  const userinfo = data as {
    status: number;
    data: {
      id: string;
      image: string;
    };
  } | null;

  const { mutate, isPending } = useMutationData(
    ["create-comment-reply"],
    (data: { comment: string }) =>
      createCommentReply(data.comment, userinfo?.data.id as string, videoId, commentId),
    "all-comments",
    ()=> reset()
  );

  const { register,errors, reset, onFormSubmit,  } = UseZodForm(commenReply,mutate)
  return { register,errors, reset, onFormSubmit, isPending };
};
