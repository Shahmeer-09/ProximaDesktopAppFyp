import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const onCloseApp = () => {
  window.ipcRenderer.send("closeApp");
};

const httpclient = axios.create({
  baseURL: import.meta.env.VITE_HOST_URL,
  // headers: {
  //   "Origin": "http://localhost:3000"  // Match server origin
  // }
});
export const fetchUser = async (clerkId: string) => {
  const response = await httpclient.get(`/auth/${clerkId}`, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
// export const fetchUser = async (clerkId: string) => {
//   return await window.ipcRenderer.invoke('fetch-user', clerkId);
// };

export const fetchDevices = async () => {
  const displays = await window.ipcRenderer.invoke("getSources");
  const enumerateDevices =
    await window.navigator.mediaDevices.enumerateDevices();
  const audioInputs = enumerateDevices.filter(
    (device) => device.kind === "audioinput"
  );
  return { displays, audioInputs };
};

export const UpdateStudio = async (
  id: string,
  mic: string,
  screen: string,
  preset: string
) => {
  const response = await httpclient.patch(
    `/studio/${id}`,
    {
      screen,
      mic,
      preset,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const windoeHidePlugin = (state: boolean) => {
  window.ipcRenderer.send("hide-plugin", { state });
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);
  const timer =`${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  return {length: timer, min:minutes}
};
