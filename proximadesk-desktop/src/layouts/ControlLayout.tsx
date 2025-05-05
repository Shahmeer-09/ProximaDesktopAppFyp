import Logo from "@/components/Logo";
import { cn, onCloseApp } from "@/lib/utils";
import { UserButton } from "@clerk/clerk-react";
import { X } from "lucide-react";
import React, { useState } from "react";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

const ControlLayout = ({ className, children }: Props) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  window.ipcRenderer.on("hide-plugin", (event, payload) => {
    setIsVisible(payload.state);
  });
  return (
    <div
      className={cn(
        className,
        isVisible && "invisible",
        " flex flex-col rounded-3xl overflow-hidden border-2 border-stone-600  px-1 w-full bg-stone-900"
      )}
    >
      <div className=" flex items-center justify-between p-5 draggable  ">
        <span className=" no-drag ">
          <UserButton />
        </span>
        <X
          size={20}
          className=" text-gray-400 hover:text-white no-drag cursor-pointer "
          onClick={onCloseApp}
        />
      </div>
      <div className=" h-0 flex-1 overflow-auto ">{children}</div>
      <div className=" flex p-5 w-full ">
        <Logo />
      </div>
    </div>
  );
};

export default ControlLayout;
