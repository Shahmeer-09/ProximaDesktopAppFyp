import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
interface modalprops {
  trigger: React.ReactNode;
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}
const Modal = ({
  trigger,
  children,
  title,
  description,
  className,
}: modalprops) => {
  return (
    <Dialog>
      <DialogTrigger className={className} asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className=" bg-[#1e1e1e] " >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
