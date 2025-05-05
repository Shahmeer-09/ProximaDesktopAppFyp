"use client";
import React, { useState } from "react";
import MegaMenu from "./Megamenu";
import { ArrowDown } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex overflow-hidden flex-col w-full bg-white border-b border-black max-w-[1440px] max-md:max-w-full">
      <nav className="flex overflow-hidden flex-wrap gap-10 justify-between items-center px-16 w-full text-base whitespace-nowrap min-h-[72px] max-md:px-5 max-md:max-w-full">
        <div className="flex gap-6 items-center self-stretch my-auto text-black min-w-60 max-md:max-w-full">
           <h2>hello</h2>
          <div className="flex overflow-hidden gap-8 items-center self-stretch my-auto min-w-60">
            <a href="#" className="self-stretch my-auto">Home</a>
            <a href="#" className="self-stretch my-auto">Features</a>
            <a href="#" className="self-stretch my-auto">Pricing</a>
            <button
              className="flex gap-1 justify-center items-center self-stretch my-auto"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mega-menu"
            >
              <span className="self-stretch my-auto">Resources</span>
               <ArrowDown/>
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-center items-center self-stretch my-auto">
          <a href="#" className="gap-2 self-stretch px-5 py-2 my-auto text-black border border-black border-solid">
            Join
          </a>
          <a href="#" className="gap-2 self-stretch px-5 py-2 my-auto text-white bg-black border border-black border-solid">
            Start
          </a>
        </div>
      </nav>

      {isMenuOpen && <MegaMenu />}
    </header>
  );
};

export default Navbar;
