import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import useAppStore from "@/store";
import { HOST } from "@/utils/constants";

import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData } = useAppStore();
  return (
    <div className="h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between px-10">
      <div className="flex gap-5 items-center justify-between w-full">
        <div className="flex gap-3 items-center justify-between">
          {/* current selected chat */}
          <div className="w-12 h-12 relative  ">
            <Avatar className="overflow-hidden  h-12 w-12  rounded-full ">
              {selectedChatData.profImage ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.profImage}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black rounded-full"
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 border-[1px] text-lg flex items-center justify-center rounded-full ${getColor(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.userName.split("").shift()}
                </div>
              )}
            </Avatar>
          </div>
          <div className="flex flex-col">
            <span>
              {selectedChatData.firstName && selectedChatData.lastName
                ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
                : " "}
            </span>
            <span className="text-xs">{selectedChatData.userName}</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all"
            onClick={() => closeChat()}
          >
            <RiCloseFill className="text-3xl" />
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default ChatHeader;
