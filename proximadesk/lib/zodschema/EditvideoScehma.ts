import { z } from "zod";

export const editVideoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long"),
  description: z
    .string()
    .min(100, "Description must be at least 100 characters long"),
});
