"use client";

import { useArchiveHook } from "@/hooks/UserArchive";
import { Archive, ArchiveX, Loader,  } from "lucide-react";
import React from "react";

type Props = {
  videoID: string;
  acrhived: boolean;
};

const ArchiveBtn = (props: Props) => {
  const { mutate, isPending } = useArchiveHook(props.videoID, props.acrhived);
  console.log(props.acrhived);
  return (
    <>
      {props.acrhived ? (
        <>
          {isPending ? (
            <Loader className=" animate-spin" />
          ) : (
            <ArchiveX
              onClick={mutate}
              className={`cursor-pointer opacity-55 
       
               `}
            />
          )}
        </>
      ) : (
        <>
          {isPending ? (
            <Loader className=" animate-spin" />
          ) : (
            <Archive
              onClick={mutate}
              className={`cursor-pointer opacity-55 
               `}
            />
          )}
        </>
      )}
    </>
  );
};

export default ArchiveBtn;
