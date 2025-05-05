import React from "react";

const WorkspceCutomIcon = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-7 w-8   bg-gray-400 text-zinc-800 px-2 rounded-sm flex  items-center justify-center font-bold ">
      <span className=" font-bold " >{children}</span>
    </div>
  );
};

export default WorkspceCutomIcon;
