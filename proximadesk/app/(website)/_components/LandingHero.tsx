"use client";

import { motion } from "framer-motion";
import heroImage from "../../../public/projectheroMain.png";
import Image from "next/image";
import Logo from "@/components/customcomps/global/Logo";
import Link from "next/link";
import { GlowingEffect } from "./GlowingAffect";

export function HeroSectionOne() {
  return (
    <div className="relative flex flex-col w-full items-center justify-center bg-neutral-900 text-white">
      <Navbar />

      {/* Borders */}
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-300 md:text-4xl lg:text-7xl">
          {"Unlock the full potential of your videos with Pro".split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400"
        >
          Collaborate, create, and share like never before with advanced features like unlimited video length, 1080p resolution, and AI Agent capabilities.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href={"/auth/sign-in"}>
            <button className="w-60 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200">
              Explore Now
            </button>
          </Link>
          <a
            href="mailto:shahmeerweb@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="w-60 transform rounded-lg border border-gray-700 bg-black px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-900">
              Contact Support
            </button>
          </a>
        </motion.div>

        {/* Tilt + Glow Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 1.2 }}
          className="relative z-10 mt-20 rounded-3xl border border-neutral-700 bg-neutral-800 p-4 shadow-md"
        >
          <GlowingEffect
            blur={6}
            spread={30}
            glow={true}
            disabled={false}
            movementDuration={2}
            borderWidth={2}
            proximity={120}
            inactiveZone={0.4}
          />
          <div className="relative w-full overflow-hidden rounded-xl border border-gray-700">
            <Image
              src={heroImage}
              alt="Landing page preview"
              className="h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-y border-neutral-800 px-4 py-4 bg-neutral-900 text-white">
      <Logo />
      <Link href={"/auth/sign-in"}>
        <button className="w-24 md:w-32 transform rounded-lg bg-white px-6 py-2 font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200">
          Login
        </button>
      </Link>
    </nav>
  );
};
