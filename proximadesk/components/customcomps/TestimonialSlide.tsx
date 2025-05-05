import Image from "next/image";
import React from "react";

interface TestimonialProps {
  testimonial: {
    quote: string;
    author: string;
    role: string;
    avatar: string;
  };
  isActive: boolean;
}

const TestimonialSlide: React.FC<TestimonialProps> = ({
  testimonial,
  isActive,
}) => {
  return (
    <div
      className={`flex flex-col items-center self-stretch my-auto text-center text-black min-w-60 w-[1312px] max-md:max-w-full ${isActive ? "" : "hidden"}`}
      role="tabpanel"
      aria-hidden={!isActive}
    >
      <div className="flex overflow-hidden flex-col items-center max-w-full w-[768px]">
        <Image
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
          width={1000}
          height={1000}
          alt="Company logo"
          className="object-contain max-w-full aspect-[2.5] w-[120px]"
        />
        <blockquote className="self-stretch mt-8 text-2xl font-bold leading-9 max-md:max-w-full">
          &quot;{testimonial.quote}&quot;
        </blockquote>
        <div className="flex flex-col mt-8 max-w-full text-base w-[300px]">
          <Image
            src={testimonial.avatar}
            height={1000}
            width={1000}
            alt={testimonial.author}
            className="object-contain self-center w-14 rounded-full aspect-square"
          />
          <div className="flex flex-col items-start mt-4 w-full">
            <p className="font-semibold">{testimonial.author}</p>
            <p>{testimonial.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlide;
