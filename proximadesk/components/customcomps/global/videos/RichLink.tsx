import { Button } from "@/components/ui/button";
import React from "react";
import { toast } from "sonner";

type Props = {
  description: string | null;
  id: string;
  title: string | null;
  source: string;
};

const RichLink = (props: Props) => {
  const copyRichText = () => {
    const originalTitle = props.title || "Untitled";
    const thumbnail = `<a style="display: flex; flex-direction: column; gap: 10px" href="${process.env.NEXT_PUBLIC_HOST_URL}/preview/${props.id}">
          <h3 style="text-decoration: none; color: black; margin: 0;">${originalTitle}</h3>
          <p style="text-decoration: none; color: black; margin: 0;">${props.description}</p>
          <video width="320" style="display: block">
            <source type="video/webm" src="${process.env.NEXT_PUBLIC_CLOUD_FRONT_STREAM_URL}/${props.source}" />
          </video>
        </a>`;

    const thumbnailBlob = new Blob([thumbnail], { type: "text/html" });
    const blobTitle = new Blob([originalTitle], { type: "text/plain" });

    const data = [
      new ClipboardItem({
        ["text/plain"]: blobTitle,
        ["text/html"]: thumbnailBlob,
      }),
    ];

    navigator.clipboard.write(data).then(() => {
      toast.success("Rich link copied to clipboard", {
        description: "You can paste it anywhere you want",
      });
    });
  };

  return (
    <Button onClick={copyRichText} className=" rounded-full bg-white text-zinc-800 cursor-pointer ">
      Get embeded code
    </Button>
  );
};



export default RichLink;
