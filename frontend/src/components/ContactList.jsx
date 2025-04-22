// import React from "react";
// import { Avatar, AvatarImage } from "./ui/avatar";
// import { HOST } from "@/utils/constants";
// import { getColor } from "@/lib/utils";
// import useAppStore from "@/store";

// const ContactList = ({ dmContactList, isChannel = false }) => {
//   const {
//     selectedChatData,
//     setSelectedChatData,
//     setSelectedChatType,
//     selectedChatType,
//     setSelectedChatMessages,
//   } = useAppStore();

//   const handleClick = (contact) => {
//     if (isChannel) setSelectedChatType("channel");
//     else setSelectedChatType("contact");

//     setSelectedChatData(contact);
//     if (selectedChatData && selectedChatData._id !== contact._id) {
//       setSelectedChatMessages([]);
//     }
//   };

//   return (
//     <div className="mt-5">
//       {dmContactList.map((contact) => (
//         <div
//           key={contact._id}
//           className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
//             selectedChatData && selectedChatData._id === contact._id
//               ? "bg-[#8417ff] hover:bg-[#8417ff]"
//               : "hover:bg-[#f1f1f111]"
//           }`}
//           onClick={() => handleClick(contact)}
//         >
//           <div className="flex gap-5 items-center justify-start text-neutral-300">
//             {!isChannel && (
//               <Avatar className="overflow-hidden  h-10 w-10  rounded-full ">
//                 {contact.profImage ? (
//                   <AvatarImage
//                     src={`${HOST}/${contact.profImage}`}
//                     alt="profile"
//                     className="object-cover w-full h-full bg-black rounded-full"
//                   />
//                 ) : (
//                   <div
//                     className={` ${
//                       selectedChatData && selectedChatData._id === contact._id
//                         ? "bg-[ffffff22] border border-white/70"
//                         : getColor(contact.color)
//                     }} uppercase h-10 w-10 border-[1px] text-lg flex items-center justify-center rounded-full `}
//                   >
//                     {contact?.firstName
//                       ? contact?.firstName.split("").shift()
//                       : contact?.userName.split("").shift()}
//                   </div>
//                 )}
//               </Avatar>
//             )}
//             {isChannel && (
//               <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full">
//                 #
//               </div>
//             )}

//             {isChannel ? (
//               <span>{contact.name}</span>
//             ) : (
//               <span>{`${contact.firstName} ${contact.lastName}`}</span>
//             )}
//             {/* <div className="flex flex-col">
//               <span>
//                 {contact.firstName && contact.lastName
//                   ? `${contact.firstName} ${contact.lastName}`
//                   : " "}
//               </span>
//               <span className="text-xs">{contact.userName}</span>
//               <span className="text-xs">{contact.email}</span>
//             </div> */}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default ContactList;

import React, { useMemo } from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { HOST } from "@/utils/constants";
import { getColor } from "@/lib/utils";
import useAppStore from "@/store";
import { BsDot } from "react-icons/bs";

const ContactList = ({ dmContactList, isChannel = false }) => {
  const {
    selectedChatData,
    setSelectedChatData,
    setSelectedChatType,
    setSelectedChatMessages,
    unreadMessages,
    clearUnreadMessage,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");

    setSelectedChatData(contact);
    setSelectedChatMessages([]);

    clearUnreadMessage(contact._id); // clear blue dot when opened
  };

  const sortedContacts = useMemo(() => {
    const copy = [...dmContactList];
    // Move contacts with unread messages to the top
    copy.sort((a, b) => {
      const aUnread = unreadMessages[a._id] ? 1 : 0;
      const bUnread = unreadMessages[b._id] ? 1 : 0;
      return bUnread - aUnread;
    });
    return copy;
  }, [dmContactList, unreadMessages]);

  return (
    <div className="mt-5">
      {sortedContacts.map((contact) => {
        const unread = unreadMessages[contact._id];
        const isSelected =
          selectedChatData && selectedChatData._id === contact._id;

        return (
          <div
            key={contact._id}
            className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
              isSelected
                ? "bg-[#8417ff] hover:bg-[#8417ff]"
                : "hover:bg-[#f1f1f111]"
            }`}
            onClick={() => handleClick(contact)}
          >
            <div className="flex gap-3 items-center justify-start text-neutral-300">
              {!isChannel && (
                <Avatar className="overflow-hidden h-10 w-10 rounded-full">
                  {contact.profImage ? (
                    <AvatarImage
                      src={`${HOST}/${contact.profImage}`}
                      alt="profile"
                      className="object-cover w-full h-full bg-black rounded-full"
                    />
                  ) : (
                    <div
                      className={`${
                        isSelected
                          ? "bg-[ffffff22] border border-white/70"
                          : getColor(contact.color)
                      } uppercase h-10 w-10 border-[1px] text-lg flex items-center justify-center rounded-full`}
                    >
                      {contact?.firstName
                        ? contact?.firstName.charAt(0)
                        : contact?.userName.charAt(0)}
                    </div>
                  )}
                </Avatar>
              )}

              <div className="flex flex-col gap-[1px]">
                <div className="flex gap-1 items-center">
                  <span className="font-semibold text-sm">
                    {`${contact.firstName} ${contact.lastName}`}
                  </span>
                  {unread && <BsDot className="text-blue-500 text-xl" />}
                </div>
                {unread && (
                  <span className="text-xs text-white/70 line-clamp-1">
                    {unread.content}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ContactList;
