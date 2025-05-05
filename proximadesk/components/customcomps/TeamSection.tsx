import React from "react";
import TeamMember from "./TeamMember";

const TeamSection: React.FC = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "CEO & Founder",
      bio: "Passionate about transforming communication through innovative technology and user-friendly design.",
      image:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "Michael Smith",
      role: "CTO & Co-Founder",
      bio: "Expert in AI and software development, driving our tech forward.",
      image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "Sarah Lee",
      role: "CMO & Co-Founder",
      bio: "Focused on user engagement and marketing strategies that resonate.",
      image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
    {
      name: "David Brown",
      role: "Product Manager",
      bio: "Bringing innovative ideas to life through effective product development.",
      image:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww",
    },
 
  ];

  return (
    <section className="flex overflow-hidden flex-col items-center px-16 py-28 max-w-full bg-white w-[1440px] max-md:px-5 max-md:py-24">
      <div className="flex flex-col max-w-full text-center text-black w-[768px]">
        <p className="self-center text-base font-semibold whitespace-nowrap">
          Innovate
        </p>
        <div className="mt-4 w-full max-md:max-w-full">
          <h2 className="text-5xl font-bold leading-tight max-md:max-w-full max-md:text-4xl">
            Our Team
          </h2>
          <p className="mt-6 text-lg max-md:max-w-full">
            Meet the visionaries behind our groundbreaking platform.
          </p>
        </div>
      </div>

      <div className="self-stretch mt-20 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-8 items-start w-full max-md:max-w-full">
          {teamMembers.slice(0, 4).map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>

        <div className="flex flex-wrap gap-8 items-start mt-16 w-full max-md:mt-10 max-md:max-w-full">
          {teamMembers.slice(4).map((member, index) => (
            <TeamMember
              key={index}
              name={member.name}
              role={member.role}
              bio={member.bio}
              image={member.image}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center mt-20 max-w-full w-[768px] max-md:mt-10">
        <div className="w-full text-center text-black">
          <h3 className="text-3xl font-bold leading-tight max-md:max-w-full">
            Were hiring!
          </h3>
          <p className="mt-4 text-lg max-md:max-w-full">
            Explore exciting opportunities to join our dynamic team.
          </p>
        </div>
        <div className="mt-6 max-w-full text-base text-black w-[155px]">
          <a
            href="#"
            className="block gap-2 self-stretch px-6 py-3 text-center border border-black border-solid max-md:px-5"
          >
            Open positions
          </a>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
