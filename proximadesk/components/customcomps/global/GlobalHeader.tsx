"use client";

import { workspace } from "@prisma/client";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  workspace: workspace | null;
};

function GlobalHeader({ workspace }: Props) {
  const pathName = usePathname().split(`/dashbord/${workspace?.id}`)[1];
  return (
    <article className=" flex flex-col gap-3  ">
      <span className=" text-neutral-500 text-xs  ">{workspace?.type}</span>
      <h1 className="text-3xl text-neutral-100 font-bold">
        {pathName && !pathName.includes("folder") ? !pathName.includes("video")
          ? pathName.charAt(1).toUpperCase() +
            pathName.slice(2).toLocaleLowerCase()
            :"Videos"
          : "My library"}
      </h1>
    </article>
  );
}

export default GlobalHeader;
