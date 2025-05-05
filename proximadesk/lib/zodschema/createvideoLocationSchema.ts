import { z } from "zod";

export const createVideoLocationSchema = z.object({
  folder_id: z.string().min(1, { message: "folder id is required" }),
  workspace_id: z.string().min(1, { message: "workspace id is required" }),
});