import Image from "next/image";
import React from "react";
import circle from "../../../public/circle.png";
const Logo = () => {
  return (
    <div className=" flex items-center ">
      <Image
        src={circle}
        height={1000}
        width={1000}
        alt="logo"
        className=" object-center object-cover  bg-no-repeat w-[30px]  "
      />
      <h5 className="bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent font-bold  text-lg  ">
        ProximaDesk
      </h5>
    </div>
  );
};

export default Logo;
