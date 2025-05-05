import { mediaSourceSettingSchema } from "@/schemas/media.source.schema";
import { UseZodForm } from "./UseZodForm";
import { useMutationData } from "./UsermutationData";
import { UpdateStudio } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useSourcesSettings = (
  id: string | undefined,
  mic: string | undefined,
  screen: string | undefined,
  preset: "HD" | "SD",
  plan: "PRO" | "FREE",
  // fetchUSeragain: () => void
) => {
  const [onpreset, setpreset] = useState<"HD" | "SD" | undefined>("SD");
  const { watch, register, control } = UseZodForm(mediaSourceSettingSchema, {
    screen: screen || undefined,
    preset: preset,
    mic: mic || undefined,
  });

  const { mutate, isPending } = useMutationData(
    ["studio-settings-update"],
    (data: { mic: string; screen: string; preset: "HD" | "SD"; id: string }) =>
      UpdateStudio(data.id, data.mic, data.screen, data.preset),
    
    // fetchUSeragain
  );

  useEffect(() => {
    if (screen && mic) {
      window.ipcRenderer.send("media-sources", {
        mic,
        screen,
        preset,
        id,
        plan,
      });
    }
  }, [screen, mic]);

  useEffect(() => {
    const subscribe = watch((data) => {
      setpreset(data.preset);
      mutate({
        mic: data.mic!,
        screen: data.screen!,
        preset: data.preset!,
        id: id || "",
      });

      window.ipcRenderer.send("media-sources", {
        mic: data.mic!,
        screen: data.screen!,
        preset: data.preset!,
        id: id,
        plan: plan,
      });
    });

    return () => subscribe.unsubscribe();
  }, [watch]);

  return { register, onpreset, isPending, control };
};
