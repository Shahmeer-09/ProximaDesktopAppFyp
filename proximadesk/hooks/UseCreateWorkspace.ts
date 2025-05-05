import { createWorkspace } from "@/actions/workspace";
import { useMutationData } from "./UseMutaion";
import { UseZodForm } from "./UseZodForm";
import { createWorkspaceSchema } from "@/lib/zodschema/createworkspaceSchema";

export const UseCreateWorkspace = () => {
  const { mutate, isPending } = useMutationData(
    ["create-workspace"],
    (data: { name: string }) => createWorkspace(data.name), // ✅ Ensure type compatibility
    "all-workspaces"
  );
  const { register, onFormSubmit, errors } = UseZodForm(
    createWorkspaceSchema,
    mutate
  );
  return { register, onFormSubmit, errors, isPending };
};
