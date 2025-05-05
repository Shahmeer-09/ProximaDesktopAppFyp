import { z } from "zod";

export const mediaSourceSettingSchema = z.object({
    mic: z.string(),
    screen: z.string(),
    preset: z.enum(["HD", "SD"]),
});