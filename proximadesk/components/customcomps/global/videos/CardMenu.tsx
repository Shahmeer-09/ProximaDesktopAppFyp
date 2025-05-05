import React from "react";
import Modal from "../Modal";
import { Move } from "lucide-react";
import ChangeVideoLocation from "../../../forms/ChangeVideoLocation";
type props = {
  videoID: string;
  CurrentWorkSpace?: string;
  currentFolder?: string;
  currentfolderID?: string;
};
const CardMenu = ({
  videoID,
  CurrentWorkSpace,
  currentFolder,
  currentfolderID,
}: props) => {
  return (
    <Modal
      className=" flex items-center cursor-pointer gap-x-2 "
      title=" Move Video"
      description="  Select a workspace and folder to move the video to."
      trigger={<Move size={15} fill="#a4a4a4" className=" cursor-pointer text-[#a4a4a4]" />} 
    >
        <ChangeVideoLocation
          videoID={videoID}
          CurrentWorkSpace={CurrentWorkSpace!}
          currentFolder={currentFolder}
          currentfolderID={currentfolderID}
        />
    </Modal>
  );
};

export default CardMenu;
