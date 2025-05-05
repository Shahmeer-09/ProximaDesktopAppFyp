"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { Folder } from "lucide-react";
import { usePathname} from "next/navigation";
import { useMutationData } from "@/hooks/UseMutaion";
import { renameFolder } from "@/actions/workspace";
import { Input } from "@/components/ui/input";
import { UsermutationDatastate } from "@/hooks/UserMutationDataState";
import Link from "next/link";
interface folderprops {
  id: string;
  title: string;
  optimistic?: boolean;
  count?: number;
}
const FolderCard = ({ title, count, id, optimistic }: folderprops) => {
  const [onRename, setOnRename] = useState(false);
  const inputref = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const Rename = () => {
    setOnRename(true);
  };
  const Renamed = () => setOnRename(false);

  const { mutate} = useMutationData(
    ["rename-folder"],
    async (data: { name: string; id: string }) => {
      try {
        await renameFolder({ name: data.name }, id);
      } catch (error) {
        console.error("Error renaming folder:", error);
      }
    },
    "workspace-folders",
    Renamed
  );
  const handleParagarphDoubliclick = (
    e: React.MouseEvent<HTMLParagraphElement>
  ) => {
    e.stopPropagation();
    Rename();
  };


  const handleBlurClicked = () => {
    if (inputref.current) {
      const newName = inputref.current.value.trim(); // Get trimmed input value
      if (newName) {
        mutate({ name: newName, id: id }); // Call rename function if not empty
      }
    }
    Renamed(); // Close input field
  };

  const { latestvaraibles } = UsermutationDatastate(["rename-folder"]);

  const displayTitle = 
  latestvaraibles && 
  latestvaraibles.variables.id === id ? 
  latestvaraibles.variables.name : 
  title;
  return (
    <Link href={`${pathname}/folder/${id}`}  >    
    <div
      // onClick={hanelCardlClick}
      ref={cardRef}
      className={cn(
        optimistic && " opacity-60 animate-pulse",
        "flex items-center justify-between gap-2 rounded-md min-w-[250px] border-[1px]  hover:bg-neutral-800 cursor-pointer py-4 px-4 border-zinc-400 transition duration-150 roun"
      )}
    >
      <div className=" flex items-center justify-between w-full gap-2">
        <div className=" flex flex-col gap-[1px]  ">
          {onRename ? (
            <Input
              onBlur={() => handleBlurClicked()}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  inputref.current?.blur(); // Trigger blur manually
                }
              }}
              autoFocus
              ref={inputref}
              className=" text-neutral-300 w-full  bg-transparent border-none outline-none p-0  "
              type="text"
              placeholder={title}
            />
          ) : (
            <>
              <p
                onDoubleClick={(e) => handleParagarphDoubliclick(e)}
                onClick={(e) => e.stopPropagation()}
                className=" text-neutral-300 w-full  bg-transparent border-none outline-none p-0  "
              >
                {displayTitle}
              </p>
            </>
          )}

          <span className=" text-neutral-500 text-sm ">
            {" "}
            {count ?? 0}  {count === 1 ? "video" : "videos"}{" "}
          </span>
        </div>
        <Folder strokeWidth={3} className=" text-neutral-400" />
      </div>
    </div>
    </Link>
  );
};

export default FolderCard;
