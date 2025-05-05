"use client";

import React from "react";
import Logo from "./Logo";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useQueryData } from "@/hooks/userQueryData";
import { getAllWorkspace } from "@/actions/workspace";
import { notificationI, workSpaceProps } from "@/types/index.types";
import Modal from "./Modal";
import { Menu, PlusCircle } from "lucide-react";
import Search from "./Search";
import { MENU_ITEMS } from "@/constants/MenuItems";
import SideBarItem from "./SideBarItem";
import { getAllbNotif } from "@/actions/user";
import WorkspceCutomIcon from "./WorkspceCutomIcon";
import GlobalCard from "./GlobalCard";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,

  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import InfoBar from "./InfoBar";
import { WORKSPACE } from "@/redux/slices/workspace";
import { useAppDispatch } from "@/redux/store";
import Paymentbutton from "./Payment-button";

type sidebarprops = {
  activeWorkspaceid: string;
};
const Sidebar = ({ activeWorkspaceid }: sidebarprops) => {
  const router = useRouter();
  const pathname = usePathname();
   const dispatch = useAppDispatch();
  const handleSelectValueChange = (value: string) => {
    router.push(`/dashbord/${value}`);
  };
  const { data:notif }= useQueryData(getAllbNotif, ["all-notif"]);
  const  notifications  = notif as notificationI;
  const { data , isFetched} = useQueryData(getAllWorkspace, ["all-workspaces"]);
  const { data: workspace } = data as workSpaceProps;
  const currentWorkspace = workspace.workspace.find(
    (w) => w.id === activeWorkspaceid
  );

  if(isFetched &&  workspace){
    dispatch(WORKSPACE({workspace: workspace.workspace}))
  }
  const MenuItems = MENU_ITEMS(activeWorkspaceid);

  const sidedebarSection = (
    <div className="   flex flex-col overflow-y-auto  overflow-x-hidden items-center gap-4 relative   min-h-screen w-[260px] p-4  bg-[#111111] ">
      <div className=" bg-[#111111] p-4 gap-2 static mb-2 top-0 w-full left-0 right-0  items-center justify-center flex  h-full  ">
        <Logo />
      </div>
      <Select value={activeWorkspaceid} onValueChange={handleSelectValueChange}>
        <SelectTrigger className="  text-neutral-400 bg-transparent ">
          <SelectValue placeholder="Select a Workspace"></SelectValue>
        </SelectTrigger>
        <SelectContent className=" bg-[#111111] backdrop-blur-xl ">
          <SelectGroup>
            <SelectLabel>workspace</SelectLabel>
            <Separator />
            {workspace.workspace.map((workspace) => (
              <SelectItem key={workspace.id} value={workspace.id}>
                {workspace.name}
              </SelectItem>
            ))}
            {workspace.member.length > 0 &&
              workspace.member.map((workspace) => (
                <SelectItem
                  key={workspace.workspace.id}
                  value={workspace.workspace.id}
                >
                  {workspace.workspace.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {currentWorkspace?.type == "PUBLIC" &&
        workspace.subscription?.plan == "PRO" && (
          <Modal
            trigger={
              <span className=" flex items-center justify-center cursor-pointer bg-zinc-800/90 gap-2 hover:bg-zinc-800/60 rounded-md w-full py-1.5">
                <PlusCircle size={15} className="text-neutral-400" />
                <span className=" text-neutral-400 capitalize ">
                  invite to workspace
                </span>
              </span>
            }
            title="Invite to workspace"
            description="invite people you know to your workspace"
          >
            <Search workspaceID={activeWorkspaceid} />
          </Modal>
        )}
        
      <p className=" w-full text-neutral-400 font-bold mt-4 ">Menu</p>
      <nav className="w-full">
        <ul className="  ">
          {MenuItems.map((item) => (
            <SideBarItem
              key={item.href}
              href={item.href}
              title={item.title}  
              icon={item.icon}
              selected={pathname === item.href}
              notification={
                (item.title === "Notifications" &&
                  notifications?.data?.notification?.length &&
                  notifications?.data?._count?.notification) ||
                0
              }
            />
          ))}
        </ul>
      </nav>
      <div className=" h-[1px] bg-zinc-500 w-full "></div>
      <p className="w-full mt-2 font-bold text-neutral-400">workspaces</p>
      {workspace.workspace.length == 1 && workspace.member.length === 0 && (
        <div className=" w-full flex  items-center justify-self-start mt-[-10px]  ">
          <p className=" text-neutral-400 font-semibold text-sm ">
            {workspace?.subscription?.plan === "FREE"
              ? "upgrade to create workspces"
              : "No work space found"}
          </p>
        </div>
      )}
      <nav className="w-full">
        <ul className="fade-layer h-[150px] overflow-auto ::-webkit-scrollbar  overflow-x-hidden ">
          {workspace.workspace.length > 0 &&
            workspace.workspace.map(
              (workspace) =>
                workspace.type !== "PERSONAL" && (
                  <SideBarItem
                    key={workspace.id}
                    href={`/dashbord/${workspace.id}`}
                    title={workspace.name}
                    iconComp={
                      <WorkspceCutomIcon>
                        {workspace.name.slice(0, 2).toUpperCase()}
                      </WorkspceCutomIcon>
                    }
                    selected={pathname === `/dashbord/${workspace.id}`}
                  />
                )
            )}
        </ul>
      </nav>
      {workspace?.subscription?.plan === "FREE" && (
        <GlobalCard
          title="upgrade to pro"
          description="upgrade to pro to get more Ai features like transcriptions and title generation"
          footer={
            <Paymentbutton/>
          }
        />
      )}
    </div>
  );
  return (
    <div className=" " >
      <InfoBar/>
      <div className=" md:hidden fixed my-4 ">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button className="cursor-pointer" variant={"ghost"}>
              {" "}
              <Menu />{" "}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-fit h-full border-0  p-0">
            <SheetHeader className="p-0 gap-0 mt-[-30px]">
              <SheetTitle></SheetTitle>
            </SheetHeader>

            {sidedebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className=" md:block hidden  ">{sidedebarSection}</div>
    </div>
  );
};

export default Sidebar;
