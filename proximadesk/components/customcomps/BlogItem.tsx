import React from "react";
import Image from "next/image";
interface BlogItemProps {
  image: string;
  title: string;
  description: string;
  className?: string;
}

const BlogItem: React.FC<BlogItemProps> = ({
  image,
  title,
  description,
  className = "",
}) => {
  return (
    <article
      className={`flex gap-6 items-start py-2 w-full max-md:max-w-full ${className}`}
    >
      <Image
        src={image ?? "https://media.istockphoto.com/id/1973365581/vector/sample-ink-rubber-stamp.jpg?s=612x612&w=0&k=20&c=_m6hNbFtLdulg3LK5LRjJiH6boCb_gcxPvRLytIz0Ws="}
        alt=""
        width={1000}
        height={1000}
        className="object-contain shrink-0 w-40 aspect-[1.52]"
      />
      <div className="flex-1 shrink basis-0 min-w-60">
        <div className="w-full">
          <h4 className="text-base font-semibold">{title}</h4>
          <p className="mt-1 text-sm leading-5">{description}</p>
        </div>
        <a href="#" className="mt-2 text-sm underline underline-offset-auto">
          Read more
        </a>
      </div>
    </article>
  );
};

export default BlogItem;
