" use client";
import FeatureCard from "./FeatureCard";
import { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon | string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: LucideIcon;
}

interface FeatureListProps {
  title: string;
  description: string;
  features: Feature[];
}

const FeatureList: React.FC<FeatureListProps> = ({
  title,
  description,
  features,
}) => {
  return (
    <section className="overflow-hidden px-16 py-28 w-full bg-white max-w-[1440px] max-md:px-5 max-md:py-24 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 items-start w-full text-black max-md:max-w-full">
        <h2 className="overflow-hidden flex-1 shrink text-4xl font-bold leading-10 basis-0 min-w-60 max-md:max-w-full">
          {title}
        </h2>
        <p className="overflow-hidden flex-1 shrink text-lg leading-7 basis-0 min-w-60 max-md:max-w-full">
          {description}
        </p>
      </div>

      <div className="mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-10 justify-center items-start w-full max-md:max-w-full">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              buttonText={feature.buttonText}
              buttonIcon={feature.buttonIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureList;
