import React from "react";
import Modal from "../Modal";
import { Edit } from "lucide-react";
import { EditVideoForm } from "@/components/forms/EditVideoForm";


type Props = {
  title: string;
  videoId: string;
  description: string;
};

const EditVideo = (props: Props) => {
  return (
    <Modal
      title="Edit the Video title and description"
      description=" you can update the video title and description here"
      trigger={
 
          <Edit className="cursor-pointer opacity-55 "  />
    
      }
    >
      <EditVideoForm title={props.title} videoId={props.videoId} description={props.description}  />
    </Modal>
  );
};

export default EditVideo;
