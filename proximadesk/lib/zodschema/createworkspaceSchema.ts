import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .min(1, { message: "workspace name is required" })
});

export const commenReply  = z.object({
  comment:z.string().min(1, { message: "comment is required" }),
})