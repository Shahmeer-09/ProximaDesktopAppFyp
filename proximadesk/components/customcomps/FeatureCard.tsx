import { LucideIcon } from "lucide-react";
import React from "react";

interface FeatureCardProps {
  icon: LucideIcon | string;
  title: string;
  description: string;
  buttonText: string;
  buttonIcon: LucideIcon;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon:Icon,
  title,
  description,
  buttonText,
  buttonIcon:ButtonICon,
}) => {
  return (
    <article className="flex-1 shrink basis-0 min-w-60">
      <div className="w-full text-black">
        {Icon && (
          <Icon className="w-12 h-12 text-primary" />
        )}
        <h3 className="mt-6 text-2xl font-bold leading-9">{title}</h3>
        <p className="mt-6 text-base leading-6">{description}</p>
      </div>
      <div className="flex flex-col items-start mt-8 w-full text-base text-black">
        <a
          href="#"
          className="flex overflow-hidden gap-2 justify-center items-center"
        >
          <span className="self-stretch my-auto">{buttonText}</span>
          <ButtonICon className="w-6 h-6" />
        </a>
      </div>
    </article>
  );
};

export default FeatureCard;
