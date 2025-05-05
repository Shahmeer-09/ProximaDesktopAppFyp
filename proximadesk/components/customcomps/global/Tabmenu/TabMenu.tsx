import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  defalValur: string;
  trigger: string[];
  children: React.ReactNode;
};

const TabMenu = (props: Props) => {
  return (
    <Tabs defaultValue={props.defalValur} className="w-full">
      <TabsList className=" flex justify-start bg-transparent ">
        {props.trigger.map((item) => (
          <TabsTrigger
            value={item}
            key={item}
            className="  capitalize  text-neutral-300  data-[state=active]:bg-[#323232] "
          >
            {item}
          </TabsTrigger>
        ))}
      </TabsList>
      {props.children}
    </Tabs>
  );
};

export default TabMenu;
