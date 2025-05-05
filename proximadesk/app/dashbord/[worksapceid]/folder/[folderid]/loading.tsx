import { Loader } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className=" flex  justify-center items-center mt-[200px]  w-full ">
      <Loader className=" text-3xl text-white animate-spin " />
    </div>
  );
};

export default loading;
