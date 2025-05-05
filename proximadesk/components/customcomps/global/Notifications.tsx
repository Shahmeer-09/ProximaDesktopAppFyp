"use client";

import { getAllbNotif } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQueryData } from "@/hooks/userQueryData";
import { User } from "lucide-react";
import React from "react";

const Notifications = () => {
  const { data } = useQueryData(()=>getAllbNotif(), ["all-notif"]);
  const notification = data as {
    status: number;
    data: {
      notification: {
        user: {
          image: string | null;
        } | null;
        id: string;
        userId: string | null;
        message: string;
      }[];
      _count: {
        notification: number;
      };
    };
  } ;
 console.log(notification.status)
  if (!notification || notification.status !== 200) {
    return (
      <div className=" flex items-center justify-center h-full w-full ">
        <p>no notification</p>
      </div>
    );
  }
  return (
    <>
      {notification.data.notification.length > 0 &&
        notification.data.notification.map((n) => (
          <div
            key={n.id}
            className=" flex flex-col gap-y-6 border-[1px] border-zinc-400  "
          >
            <div className=" flex items-center gap-x-4 p-2 ">
              <Avatar>
                <AvatarImage src={n.user?.image as string} alt="userimage" />
                <AvatarFallback>
                  <User />
                </AvatarFallback>
              </Avatar>
              <p className=" text-zinc-300" >{n.message} </p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Notifications;
