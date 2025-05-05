import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface FeatureSectionProps {
  title: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
  listItems?: string[];
  icon?: LucideIcon;
}

const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  description,
  image,
  imagePosition,
  listItems,
  icon:Icon,
}) => {
  const contentSection = (
    <div className="flex-1 shrink self-stretch my-auto basis-0 min-w-60 max-md:max-w-full">
      <div className="w-full max-md:max-w-full">
        {Icon && (
          <Icon className="w-12 h-12 text-primary" />
        )}
        <div
          className={
            Icon ? "mt-6 w-full max-md:max-w-full" : "w-full max-md:max-w-full"
          }
        >
          <h2 className="text-4xl font-bold leading-10 max-md:max-w-full">
            {title}
          </h2>
          <p className="mt-6 text-lg leading-7 max-md:max-w-full">
            {description}
          </p>
        </div>
      </div>

      {listItems && (
        <ul className="py-2 mt-8 w-full text-base max-md:max-w-full">
          {listItems.map((item, index) => (
            <li
              key={index}
              className={`flex flex-wrap gap-4 items-center w-full max-md:max-w-full ${index > 0 ? "mt-4" : ""}`}
            >
              <Image
                src="https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws="
                width={1000}
                height={1000}
                alt=""
                className="object-contain shrink-0 self-stretch my-auto w-4 aspect-square"
              />
              <p className="flex-1 shrink self-stretch my-auto basis-0 max-md:max-w-full">
                {item}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const imageSection = (
    <Image
      src={image}
      width={1000}
      height={1000}
      alt="Feature illustration"
      className="object-contain flex-1 shrink self-stretch my-auto w-full aspect-[0.96] basis-0 min-w-60 max-md:max-w-full"
    />
  );

  return (
    <section className="flex overflow-hidden flex-col justify-center px-16 py-28 w-full text-black bg-white max-w-[1440px] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-center w-full max-md:max-w-full">
        {imagePosition === "left" ? (
          <>
            {imageSection}
            {contentSection}
          </>
        ) : (
          <>
            {contentSection}
            {imageSection}
          </>
        )}
      </div>
    </section>
  );
};

export default FeatureSection;
