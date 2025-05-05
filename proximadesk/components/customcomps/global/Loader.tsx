import { Loader2 } from "lucide-react";
import React from "react";

const Loader = ({
  state,
  children,
}: {
  state: boolean;
  children: React.ReactNode | React.ReactNode[];
}) => {
  return (
    <>
      {state ? (
      
          <Loader2 className=" animate-spin" size={20} />
       
      ) : (
         children
      )}
    </>
  );
};

export default Loader;
