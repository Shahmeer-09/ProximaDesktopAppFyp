import { fetchDevices } from "@/lib/utils";
import { useReducer } from "react";

export type SourceDeviceStateProps = {
  displays?: {
    appIcon: null;
    display_id: string;
    id: string;
    name: string;
    thumbnail: unknown[];
  }[];
  audioInputs?: {
    deviceId: string;
    kind: string;
    label: string;
    groupId: string;
  }[];
  error?: string | null;
  isPending?: boolean;
};

export type displayActionProps = {
  type: "GET_DISPLAYS";
  payload: SourceDeviceStateProps;
};
export const useMediaResources = () => {
  const [state, action] = useReducer(
    (state: SourceDeviceStateProps, action: displayActionProps) => {
      switch (action.type) {
        case "GET_DISPLAYS":
          return { ...state, ...action.payload };
        default:
          return state;
      }
    },
    {
      displays: [],
      audioInputs: [],
      error: null,
      isPending: false,
    }
  );

  const fethMediaResorces = () => {
    action({
      type: "GET_DISPLAYS",
      payload: {
        isPending: true,
      },
    });
    fetchDevices().then((sources)=>{
      action({
        type: "GET_DISPLAYS",
        payload: {
          ...sources,
          isPending: false,
        },
      });
    })
  };
  return {state, fethMediaResorces}
};
