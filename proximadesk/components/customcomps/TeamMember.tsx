import { Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  image: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, image }) => {
  return (
    <article className="flex flex-col flex-1 shrink basis-0 min-w-60">
      <Image
        src={image}
        height={1000}
        width={1000}
        alt={name}
        className="object-contain w-full aspect-[1.03]"
      />
      <div className="mt-6 w-full text-center text-black">
        <div className="w-full">
          <h3 className="text-xl font-semibold">{name}</h3>
          <p className="text-lg">{role}</p>
        </div>
        <p className="mt-4 text-base leading-6">{bio}</p>
      </div>
      <div className="flex gap-3.5 items-start self-center mt-6">
        <a href="#" aria-label={`${name}'s LinkedIn profile`}>
            <Linkedin height={20} width={20} />
            
        </a>
        <a href="#" aria-label={`${name}'s Twitter profile`}>
          <Twitter/>
        </a>
        <a href="#" aria-label={`${name}'s Email`}>
          <Mail/>
        </a>
      </div>
    </article>
  );
};

export default TeamMember;
