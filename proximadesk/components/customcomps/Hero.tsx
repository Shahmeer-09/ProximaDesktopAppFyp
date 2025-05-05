import Image from "next/image";
import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex overflow-hidden flex-col px-16 py-28 max-w-full bg-white w-[1440px] max-md:px-5 max-md:py-24">
      <div className="flex flex-col self-center max-w-full w-[768px]">
        <div className="w-full text-center text-black max-md:max-w-full">
          <h1 className="text-6xl font-bold leading-[67px] max-md:max-w-full max-md:text-4xl max-md:leading-[54px]">
            Capture and Share Videos Instantly with AI
          </h1>
          <p className="mt-6 text-lg leading-7 max-md:max-w-full">
            Transform your communication with our innovative video recording and
            sharing platform. Powered by AI, effortlessly connect with your
            prospects and make a lasting impression.
          </p>
        </div>
        <div className="flex gap-4 items-start self-center mt-8 text-base">
          <a
            href="#"
            className="gap-2 self-stretch px-6 py-3 text-white bg-black border border-black border-solid max-md:px-5"
          >
            Learn More
          </a>
          <a
            href="#"
            className="gap-2 self-stretch px-6 py-3 text-black border border-black border-solid max-md:px-5"
          >
            Sign Up
          </a>
        </div>
      </div>
      <Image
        src="https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws="
        width={1000}
        height={1000}
        alt="Platform preview"
        className="object-contain mt-20 w-full aspect-[1.78] max-md:mt-10 max-md:max-w-full"
      />
    </section>
  );
};

export default Hero;
