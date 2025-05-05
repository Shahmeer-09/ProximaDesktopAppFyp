"use client";

import { MaskContainer } from "@/app/(website)/_components/MaskContainer";

export const CTABanner = () => {
  return (
    <div className="flex h-[30rem] w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto max-w-4xl text-center text-4xl font-bold text-slate-200">
            Unlock the full potential of your videos with Pro. Collaborate, create, and share like never before.
          </p>
        }
        revealSize={400}
        className="h-[30rem] w-full bg-gradient-to-r from-[#051a42] via-[#193d7f] to-[#1f56b4] rounded-md border text-white dark:text-black"
      >
        Discover the power of{" "}
        <span className="text-blue-500">Pro Features</span> with unlimited video length, 1080p resolution, and{" "}
        <span className="text-blue-500">AI Agent</span> capabilities.
      </MaskContainer>
    </div>
  );
};
