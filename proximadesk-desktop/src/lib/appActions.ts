import { v4 as uuid } from "uuid";
import { windoeHidePlugin } from "./utils";
import io from "socket.io-client";
let videoTrandferFileName: string | undefined;
let mediaRecorder: MediaRecorder;
let userId:string
export const StartRecording = (Sources: {
  id: string;
  mic: string;
  screen: string;
}) => {
  windoeHidePlugin(true);
  videoTrandferFileName = `${uuid()}-${Sources.id.slice(0, 8)}.webm`;
  mediaRecorder.start(1000);
};
const socket = io(import.meta.env.VITE_SOCKET_URL);
export const  StopRecording = () => mediaRecorder.stop();
const onDataAvailable = (e:BlobEvent)=>{
  // alert("running")
  console.log("data available",e.data)
  socket.emit("video-chunks", {
    chunks: e.data,
    fileName: videoTrandferFileName,
  })
}

const stopRecoding = ()=>{
  windoeHidePlugin(false)
  socket.emit("process-video",{
    fileName: videoTrandferFileName,
    userId: userId
  })
}

export const selectSources = async (
  onSources: {
    screen: string;
    mic: string;
    id: string;
    preset: "HD" | "SD";
  },
  videoElement: React.RefObject<HTMLVideoElement>
) => {
  if (onSources && onSources.screen && onSources.mic && onSources.id) {
    const constraints: any = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: onSources?.screen,
          minWidth: onSources.preset === "HD" ? 1920 : 1280,
          maxWidth: onSources.preset === "HD" ? 1920 : 1280,
          minHeight: onSources.preset === "HD" ? 1080 : 720,
          maxHeight: onSources.preset === "HD" ? 1080 : 720,
          frameRate: 30,
        },
      },
    };

    userId = onSources.id;
    // Additional logic for handling constraints can be added here
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    const audioStream = await navigator.mediaDevices.getUserMedia({
      video:false,
      audio: { deviceId: onSources.mic },
    });

    if(videoElement && videoElement.current){
      videoElement.current.srcObject  = stream
       await videoElement.current.play()
    }

    const combinedStream = new MediaStream([
      ...stream.getTracks(),
      ...audioStream.getTracks(),
    ])
    mediaRecorder = new MediaRecorder(combinedStream, {
      mimeType: "video/webm; codecs=vp9",
    });

    mediaRecorder.ondataavailable = onDataAvailable
    mediaRecorder.onstop= stopRecoding
  }
};


