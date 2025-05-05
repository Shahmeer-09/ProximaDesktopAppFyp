"use client";

import { useCommentReply } from "@/hooks/UserCommentReply";
import { Send, X} from "lucide-react";
import React from "react";
import FormGenerator from "./FormGenerator";
import { Button } from "../ui/button";
import Loader from "../customcomps/global/Loader";
type props = {
  videoId: string;
  commentId?: string;
  author: string;
  close?: () => void;
  iscommenrCard?:boolean
};
const CommentForm = (props: props) => {
  const { register, errors,  onFormSubmit, isPending } = useCommentReply(
    props.videoId,
    props.commentId
  );

  return (
    <form action="" onSubmit={onFormSubmit} className="relative w-full ">
     
      <FormGenerator
       register={register}
        errors={errors}
        placeholder={`Respond to ${props.author}..`}
        name="comment"
        inputType="input"
        lines={8}
        type="text"
        
      />
        {props.iscommenrCard && <X size={20} onClick={props.close} className=" cursor-pointer absolute top-[8px] right-8 z-50 text-white/50 group-hover:text-white/80"/>}
      <Button
      type="submit"
      className=" group absolute top-[1px] right-0 z-20 cursor-pointer bg-transparent"
      >
      <Loader state={isPending}>
        <Send size={20} strokeWidth={3} className=" text-white/50 group-hover:text-white/80 cursor-pointer " />
      </Loader>
      </Button>
    </form>
  );
};

export default CommentForm;
