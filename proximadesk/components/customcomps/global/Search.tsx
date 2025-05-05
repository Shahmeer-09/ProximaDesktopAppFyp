import { inviteMember } from "@/actions/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/UseMutaion";
// import { useMutationData } from "@/hooks/UseMutaion";
import { UseSearch } from "@/hooks/UseSearch";
import { User } from "lucide-react";
import React from "react";
import Loader from "./Loader";

type Props = {
  workspaceID: string;
};

const Search = ({ workspaceID }: Props) => {
  const { userdata, onSearchQuery, isFetching, query } = UseSearch(
    "get-Users",
    "USERS"
  );
  const { mutate, isPending } = useMutationData(
    ["invite-members"],
    (data: { id: string }) => inviteMember(data.id, workspaceID),
  
  );
  return (
    <div className=" flex flex-col gap-y-4 ">
      <Input
        onChange={onSearchQuery}
        className=" bg-transparent border-2 outline-none rounded-full "
        value={query}
        placeholder="Search for users"
        type="text"
      />

      {isFetching ? (
        <div className="flex flex-col gap-y-2">
          <Skeleton className=" w-full h-8 rounded-full bg-zinc-600/60 " />
        </div>
      ) : !userdata ? (
        <p className=" text-red-500  font-semibold text-sm  items-center ">
          No users found
        </p>
      ) : (
        userdata.map((user) => (
          <div
            key={user.id}
            className=" border-2 w-full flex gap-x-3 p-3  rounded-xl items-center  "
          >
            <Avatar>
              <AvatarImage src="" alt="users" />
              <AvatarFallback>
                <User size={24} />
              </AvatarFallback>
            </Avatar>
            <div className=" flex flex-col gap-y-1 items-start ">
              <p className=" text-sm font-semibold text-neutral-100 capitalize ">
                {user.firstName} {user.lastName}
              </p>
              <span className=" bg-white text-green-600 text-xs rounded-full w-fit px-2  ">
                {user.subscription?.plan === "PRO" ? "PRO" : "FREE"}
              </span>
            </div>
            <div className=" flex-1 flex justify-end items-end  ">
              <Button
                variant={"outline"}
                className=" cursor-pointer w-5/12  bg-white text-zinc-800 "
                onClick={() => mutate({ id: user.id })}
              >
                <Loader state={isPending}>invite</Loader>
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;
