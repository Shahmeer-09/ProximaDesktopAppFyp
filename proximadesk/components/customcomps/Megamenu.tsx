import React from "react";
import MenuItem from "./MenuItem";
import BlogItem from "./BlogItem";
import { ArrowRightCircle, BookAudio, FileSignatureIcon, HelpCircleIcon, PersonStanding, PersonStandingIcon, Phone, Video } from "lucide-react";

const MegaMenu: React.FC = () => {
  return (
    <div
      id="mega-menu"
      className="flex overflow-hidden flex-wrap self-center w-full text-black max-md:max-w-full"
    >
      <section className="flex flex-wrap flex-1 shrink gap-8 items-start self-start py-8 pr-8 pl-16 basis-8 min-w-60 max-md:px-5 max-md:max-w-full">
        <div className="flex-1 shrink basis-0 min-w-60">
          <h3 className="text-sm font-semibold">Explore Our Pages</h3>
          <ul className="mt-4 w-full">
            <MenuItem
              icon={PersonStandingIcon}
              title="About Us"
              description="Learn more about our mission and vision"
            />
            <MenuItem
              icon={Phone}
              title="Contact Us"
              description="Get in touch with our support team"
              className="mt-4"
            />
            <MenuItem
              icon={FileSignatureIcon}
              title="Blog Posts"
              description="Read our latest insights and updates"
              className="mt-4"
            />
            <MenuItem
             icon={HelpCircleIcon}
              title="Help Center"
              description="Find answers to your questions"
              className="mt-4"
            />
          </ul>
        </div>

        <div className="flex-1 shrink basis-0 min-w-60">
          <h3 className="text-sm font-semibold">Latest Articles</h3>
          <ul className="mt-4 w-full">
            <MenuItem
              icon={Video}
              title="Video Marketing"
              description="Discover the power of video in marketing"
            />
            <MenuItem
              icon={PersonStanding}
              title="Customer Stories"
              description="See how others succeed with our platform"
              className="mt-4"
            />
            <MenuItem
              icon={PersonStandingIcon}
              title="Webinars"
              description="Join our upcoming live sessions"
              className="mt-4"
            />
            <MenuItem
             icon={BookAudio}
              title="E-books"
              description="Download our free resources for insights"
              className="mt-4"
            />
          </ul>
        </div>
      </section>

      <section className="flex flex-col py-8 pr-24 pl-8 bg-white min-w-60 w-[560px] max-md:px-5 max-md:max-w-full">
        <h3 className="text-sm font-semibold">From Our Blog</h3>
        <div className="mt-4 w-full max-md:max-w-full">
          <BlogItem
            image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            title="Maximize Engagement"
            description="Tips to enhance your video marketing strategy"
          />
          <BlogItem
            image="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww"
            title="Boost Conversions"
            description="Learn how to turn views into sales"
            className="mt-2"
          />
        </div>
        <a
          href="#"
          className="flex gap-2 justify-center items-center self-start py-1 mt-4 text-base text-black whitespace-nowrap"
        >
          <span className="self-stretch my-auto">Button</span>
          <ArrowRightCircle className="self-stretch my-auto"/>
          
        </a>
      </section>
    </div>
  );
};

export default MegaMenu;
