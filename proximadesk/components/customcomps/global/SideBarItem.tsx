import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface sidebarItemprops {
  href: string;
  icon?: LucideIcon
  iconComp?:React.ReactNode
  title: string;
  selected: boolean;
  notification?: number;
}
const SideBarItem = ({
  href,
  icon: Icon,
  title,
  selected,
  iconComp
}: //   notification,
sidebarItemprops) => {
  return (
    <Link   href={href} className=" my-[5px] w-full ">
      <li
        className={cn(
          "flex items-center  group   hover:bg-zinc-800 rounded-md  ",
          selected ? " bg-zinc-800" :""
        )}
      
      >
        <div className=" flex items-center p-2 gap-2 transition-all w-full   " >
          {
            Icon && !iconComp ? (
              <Icon
              size={18}
              color="#505052"
              strokeWidth={3}
              className=" text-zinc-700 "
            />
            ):(
              iconComp
            )
            
          }
          <p
            className={cn("text-sm font-semibold group-hover:text-zinc-400 ", selected ? "text-zinc-400":"text-zinc-500")}
          >
            {title}
          </p>
        </div>
      </li>
    </Link>
  );
};

export default SideBarItem;
