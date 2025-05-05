import React, { useEffect, useRef, useState } from "react";
import { selectSources, StartRecording, StopRecording } from "@/lib/appActions";
import { cn, formatTime } from "@/lib/utils";
import { Cast, Pause, Square } from "lucide-react";
const StudioTray = () => {
  const videoElem = useRef<HTMLVideoElement | null>(null);
  const [preview, setpreview] = useState(false);
  const [onTimer, setOnTime] = useState("00:00:00");
  const [Recording, setRecording] = useState(false);
  const [count, setcount] = useState(0);
  const [onSources, setOnSources] = useState<
    | {
        screen: string;
        mic: string;
        preset: "HD" | "SD";
        id: string;
        plan: "PRO" | "FREE";
      }
    | undefined
  >(undefined);
  const cleartime = () => {
    setcount(0);
    setOnTime("00:00:00");
  };
  window.ipcRenderer.on("profile-recieved", (event, payload) => {
    setOnSources(payload);
  });
  let intervalId: NodeJS.Timeout;

  useEffect(() => {
    if (!Recording) return;
  
    const initialTime = new Date();
  
    const updateTimer = () => {
      const currentTime = new Date();
      const elapsedTime = Math.floor((currentTime.getTime() - initialTime.getTime()) / 1000);
      setcount(elapsedTime);
      
      const formatedTime = formatTime(elapsedTime);
  
      // Update the timer display
      setOnTime(formatedTime.length);
  
      // Check for FREE plan 5-minute limit
      if (onSources?.plan === "FREE" && formatedTime.min >= 5) {
        setRecording(false);
        clearInterval(intervalId);
        StopRecording();
         cleartime()
        return;
      }
  
      // Check for invalid time
      if (elapsedTime <= 0) {
        setOnTime("00:00:00");
        clearInterval(intervalId);
      }
    };
  
    // Initial call to avoid delay
    updateTimer();
    
    // Start the interval
    intervalId = setInterval(updateTimer, 1000);
  
    // Cleanup function
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [Recording, onSources?.plan]); // Add relevant dependencies
  
  useEffect(() => {
    if (onSources && onSources.screen) {
      selectSources(onSources, videoElem);
    }
    return () => {
      selectSources(onSources!, videoElem);
    };
  }, [onSources]);

  return !onSources ? (
    <></>
  ) : (
    <div className=" flex flex-col items-center gap-y-5 justify-end draggablenh h-screen ">
      {preview && (
        <video
          autoPlay
          ref={videoElem}
          className={`
        self-end border-2 w-6/12 bg-white `}
        ></video>
      )}
      <div className=" rounded-full flex items-center justify-around w-full h-20 border-2 border-stone-6w00 draggable bg-stone-900 ">
        <div
          {...(onSources && {
            onClick: () => {
              setRecording(true);
              StartRecording(onSources);
            },
          })}
          className={cn(
            " rounded-full no-drag cursor-pointer hover:opacity-75 ",
            Recording
              ? " animate-pulse  bg-red-500 h-6 w-6 "
              : " bg-red-400 h-8 w-8 "
          )}
        >
          <span className=" absolute top-[77%]  transform -translate-1/2 -right-4  text-white ">
            {onTimer}
          </span>
        </div>
        {!Recording ? (
          <Pause className=" opacity-40 no-drag " stroke={"0"} fill="white" />
        ) : (
          <Square
            onClick={() => {
              setRecording(false);
              StopRecording();
            }}
            className=" no-drag cursor-pointer trnasform transition hover:scale-110  "
            fill="white"
            stroke="white"
          />
        )}
        <Cast
          onClick={() => setpreview(!preview)}
          className="no-drag cursor-pointer hover:opacity-45"
          fill="white"
        />
      </div>
    </div>
  );
};

export default StudioTray;
