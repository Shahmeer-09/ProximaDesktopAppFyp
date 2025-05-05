import { UseCreateWorkspace } from "@/hooks/UseCreateWorkspace";
import React from "react";
import FormGenerator from "./FormGenerator";
import { Button } from "../ui/button";
import Loader from "../customcomps/global/Loader";

const CreateWorkspaceForm = () => {
  const { register, onFormSubmit, errors, isPending } = UseCreateWorkspace();
  return (
    <form
      onSubmit={onFormSubmit}
      className=" flex flex-col gap-y-3 text-start "
    >
      <FormGenerator
        name="name"
        lable="workspace name"
        register={register}
        errors={errors}
        type="text"
        inputType="input"
      />
      <Button
        type="submit"
        variant={"default"}
        className=" w-full text-zinc-800 cursor-pointer  bg-zinc-100 "
      >
        <Loader state={isPending}>create workspace</Loader>
      </Button>
    </form>
  );
};

export default CreateWorkspaceForm;
