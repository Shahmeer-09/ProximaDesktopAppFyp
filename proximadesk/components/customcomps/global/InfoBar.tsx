import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserButton } from "@clerk/nextjs";
import { Download, Search, Upload, Video } from "lucide-react";
import React from "react";

const InfoBar = () => {
  return (
    <header className="   backdrop-blur-lg  border-b border-zinc-600 fixed w-full flex justify-between items-center pl-20 md:pl-[266px] p-4 gap-4">
      {/* <div className=" flex justify-center items-center border-2 border-neutral-500 w-full rounded-full max-w-lg gap-4 px-4 ">
        <Search className=" " size={20} />
        <Input
          className=" focus-visible:border-0 focus-visible:ring-0 border-none outline-none   !placeholder-neutral-500  "
          placeholder="search for projects, folders and people"
        />
      </div> */}
      <div className=" flex gap-4">
        <Button className=" bg-neutral-700 flex items-center gap-2 text-zinc-200 border-2 ">
          <Download strokeWidth={3} /> <span>Download recorder</span>
        </Button>
        <Button className=" bg-neutral-300 flex items-center gap-2 text-zinc-800 ">
          <Video strokeWidth={3} /> <span> start recording</span>
        </Button>
      </div>

      <UserButton />
    </header>
  );
};

export default InfoBar;
