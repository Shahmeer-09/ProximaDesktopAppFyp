import { UpdateSubsciption } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: { session_id?: string; cancel?: boolean };
};

const Page = async ({ searchParams: { session_id, cancel } }: Props) => {
  if (session_id) {
    const checkout = await UpdateSubsciption(session_id);
    if (checkout?.status === 200) {
      redirect("/auth/callback");
    }
  }
  if (cancel) {
    return (
      <div className="flex text-zinc-300 items-center justify-center w-screen h-screen">
        <h2 className="text-5xl font-bold">404</h2>
        <p className="text-xl text-center"></p>
      </div>
    );
  }
};

export default Page;
