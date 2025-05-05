import { SourceDeviceStateProps } from "@/hooks/UseMediaResources";
import { useSourcesSettings } from "@/hooks/UseSourcesSettings";
import { Headphones, Loader2, Monitor, Settings2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Controller } from "react-hook-form";

type Props = {
  state: SourceDeviceStateProps;
  data: {
    subscription: {
      plan: "PRO" | "FREE";
    } | null;
    media: {
      id: string;
      screen: string | null;
      mic: string | null;
      preset: "HD" | "SD";
      camera: string | null;
      userId: string | null;
    } | null;
    id: string;
    email: string;
    firstname: string | null;
    lastname: string | null;
    createdAt: Date;
    clerkId: string;
  } | null;
  // fetchUSeragain: () => void;
};

const MediaResources = ({ state, data }: Props) => {
  const { isPending, control, onpreset } = useSourcesSettings(
    data?.id,
    data?.media?.mic || state?.audioInputs?.[0]?.deviceId,
    data?.media?.screen || state?.displays?.[0]?.id,
    data?.media?.preset as "HD" | "SD",
    data?.subscription?.plan || "FREE"
    // fetchUSeragain
  );
  //  console.log(control)
  const activeScreen = state?.displays?.find(
    (d) => d.id === data?.media?.screen
  );
  const activeMic = state?.audioInputs?.find(
    (a) => a.deviceId === data?.media?.mic
  );

  const presetOptions = [
    {
      label: "1080",
      value: "HD",
      disabled: data?.subscription?.plan === "FREE",
    },
    { label: "720", value: "SD", disabled: false },
  ];

  const isPLanPRo = data?.subscription?.plan === "FREE";
  const presetlabel = isPLanPRo
    ? presetOptions.map((option) =>
        option.value === "HD"
          ? { ...option, label: "1080 (update to pro)" }
          : option
      )
    : presetOptions;

  return (
    <form action="" className=" flex flex-col w-full relative gap-y-3 ">
      {isPending && (
        <div className=" fixed w-full bottom-0 left-0 top-0 right-0  flex items-center justify-center z-50 h-full rounded-2xl bg-black/80 ">
          <Loader2 />
        </div>
      )}
      {!isPending && control && (
        <div
          className=" flex items-center justify-center  gap-x-5 w-full
         "
        >
          <Monitor color="#4e4c4c" fill="#4e4c4c" size={26} />
          <Controller
            name="screen"
            control={control} // ← get this from your useMoveVideos hook
            defaultValue={activeScreen?.id || ""}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className=" w-full bg-zinc-700! border-2! truncate text-white ">
                  <SelectValue placeholder="Select screen" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white">
                  {state?.displays?.map((dis) => (
                    <SelectItem key={dis.id} value={dis.id}>
                      {dis.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}
      {!isPending && control && (
        <div
          className=" flex items-center justify-center gap-x-5 w-full
         "
        >
          <Headphones color="#4e4c4c" size={26} />
          <Controller
            name="mic"
            control={control} // ← get this from your useMoveVideos hook
            defaultValue={activeMic?.deviceId || data?.media?.mic || ""}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className=" w-full bg-zinc-700! border-2! truncate text-white ">
                  <SelectValue placeholder="Select mic" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white">
                  {state?.audioInputs?.map((dis) => (
                    <SelectItem
                      className=" truncate  "
                      key={dis.deviceId}
                      value={dis.deviceId}
                    >
                      {dis.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}

      {!isPending && control && (
        <div
          className=" flex items-center justify-center gap-x-5 w-full
         "
        >
          <Settings2 color="#4e4c4c" size={26} />
          <Controller
            name="preset"
            control={control}
            defaultValue={data?.media?.preset ?? onpreset}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full bg-zinc-700! border-2 text-white">
                  <SelectValue placeholder="Select quality" />
                  {/* {data?.media?.preset || "slect quality"} */}
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 text-white">
                  {presetlabel.map((dis) => (
                    <SelectItem
                      key={dis.value}
                      value={dis.value}
                      disabled={dis.disabled}
                    >
                      {dis.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
      )}
    </form>
  );
};

export default MediaResources;
