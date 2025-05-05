import { acceptinvitaion } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";
type params = Promise<{ inviteId: string }>;
const Page = async ({ params }: { params: params }) => {
  const inviteId = (await params).inviteId;
  const acceptinvite = await acceptinvitaion(inviteId);
  if (acceptinvite.status == 404) {
    redirect(`/auth/sign-in`);
  }
  if (acceptinvite.status == 401) {
    return (
      <div className=" flex items-center justify-center h-screen w-full flex-col gap-y-2 ">
        <h1 className=" text-6xl font-bold text-white ">401</h1>
        <p className= "">you are not authorized to accept thi invite</p>
      </div>
    );
  }
  if(acceptinvite.status == 200){
    redirect("/auth/callback");
  }

};

export default Page;
