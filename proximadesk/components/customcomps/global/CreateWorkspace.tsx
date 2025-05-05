"use client";

import { getAllWorkspace } from "@/actions/workspace";
import { useQueryData } from "@/hooks/userQueryData";
import React from "react";
import Modal from "./Modal";
import { Button } from "@/components/ui/button";
import { Folder } from "lucide-react";
import CreateWorkspaceForm from "@/components/forms/CreateWorkspaceForm";

const CreateWorkspace = () => {
  const { data } = useQueryData(getAllWorkspace, ["all-workspaces"]);
 
  const { data: plan } = data as {
    status: number;
    data: {
      subscription: {
        plan: "FREE" | "PRO";
      } | null;
    };
  };
  if (plan.subscription?.plan == "FREE") return <></>;
  return (
    <>
      {plan.subscription?.plan == "PRO" && (
        <Modal
          title="Create Workspace"
          description="Workspace helps you colaborate with your team memebers and creaet manage videos easily"
          trigger={
            <Button className=" hover:bg-neutral-800/60 transition-all cursor-pointer  bg-neutral-800 text-zinc-300 flex items-center gap-2 py-6 px-4 rounded-full ">
              <Folder size={15} strokeWidth={4} className="text-neutral-400" />
              <span>Create Workspace</span>
            </Button>
          }
        >
          <CreateWorkspaceForm />
        </Modal>
      )}
    </>
  );
};

export default CreateWorkspace;
