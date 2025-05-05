"use client";
import React, { useState } from "react";
import TestimonialSlide from "./TestimonialSlide";
import Image from "next/image";

const Testimonial: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const testimonials = [
    {
      quote:
        "Using this platform has transformed how I connect with my prospects. It's incredibly intuitive and saves me so much time!",
      author: "John Doe",
      role: "Sales Manager, Acme Inc.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
    {
      quote:
        "The efficiency of this tool is unmatched. I can record and share videos in minutes!",
      author: "Jane Smith",
      role: "Marketing Director, XYZ Corp",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
  ];

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="flex overflow-hidden flex-col justify-center px-16 py-28 max-w-full bg-white w-[1440px] max-md:px-5 max-md:py-24">
      <div className="flex relative flex-col w-full max-md:max-w-full">
        <div className="flex overflow-hidden z-0 items-center w-full max-md:max-w-full">
          <TestimonialSlide
            testimonial={testimonials[activeSlide]}
            isActive={true}
          />
        </div>

        <button
          onClick={prevSlide}
          aria-label="Previous testimonial"
          className="flex absolute left-0 z-0 gap-2 justify-center items-center px-3 w-12 h-12 bg-white border border-black border-solid rounded-[50px] top-[147px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            height={1000}
            width={1000}
            alt="Previous"
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Next testimonial"
          className="flex absolute right-0 z-0 gap-2 justify-center items-center px-3 w-12 h-12 bg-white border border-black border-solid rounded-[50px] top-[147px]"
        >
          <Image
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            height={1000}
            width={1000}
            alt="Next"
            className="object-contain self-stretch my-auto w-6 aspect-square"
          />
        </button>

        <div className="flex z-0 gap-2.5 items-start self-center p-2.5 mt-12 max-md:mt-10">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={activeSlide === index ? "true" : "false"}
              className={`flex shrink-0 w-2 h-2 ${activeSlide === index ? "bg-black" : "bg-gray-300"} rounded-full`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
