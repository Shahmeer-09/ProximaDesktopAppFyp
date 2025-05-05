import { useEditVideoHook } from "@/hooks/EditVideo";
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type Props = {
  title: string;
  videoId: string;
  description: string;
};

export const EditVideoForm = (props: Props) => {
  const { register, onFormSubmit, errors, isPending } = useEditVideoHook(
    props.videoId,
    props.title,
    props.description
  );

  return (
    <form onSubmit={onFormSubmit} className="space-y-4 pt-10">
      <div className=" flex flex-col gap-y-3 " >
        <Label htmlFor="title">Edit Title</Label>
        <Input
          id="title"
          type="text"
          defaultValue={props.title}
          {...register("title")}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div className=" flex flex-col gap-y-3 ">
        <Label htmlFor="description">Edit Description</Label>
        <Input
          id="description"
          type="text"
          defaultValue={props.description}
          {...register("description")}
          className={errors.description ? "border-red-500" : ""}
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className=" bg-white text-zinc-800 " >
        {isPending ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
};
