import Logo from "@/components/customcomps/global/Logo";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";

import React from "react";

const LandingNavbar = () => {
  return (
    <div className=" flex justify-between items-center py-2  w-full  ">
      <div className=" flex text-3xl font-semibold items-center gap-2 ">
        <Menu />
        <Logo />
      </div>
      <div className=" gap-x-5 items-center  hidden md:flex">
        <Link
          className=" rounded-full bg-blue-500 px-5 py-1 text-white text-sm hover:bg-blue-600  "
          href={"/"}
        >
          Home
        </Link>
        <Link className=" text-sm " href={"/price"}>
          Price
        </Link>
        <Link className=" text-sm " href={"/contacts"}>
          Features
        </Link>
      </div>
      <Button variant={"outline"} asChild> 
        <Link href={"/auth/sign-in"}>
        Login
        </Link>
        </Button>
    </div>
  );
};

export default LandingNavbar;
