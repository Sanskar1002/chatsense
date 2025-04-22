// import React, { useState } from "react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { animationDefaultOptions, getColor } from "@/lib/utils";
// import Lottie from "react-lottie";

// import { FaPlus } from "react-icons/fa6";
// import { Input } from "@/components/ui/input";
// import { toast } from "react-toastify";
// import { apiClient } from "@/lib/api-client";
// import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import useAppStore from "@/store";
// import MadeBy from "@/components/ui/MadeBy";

// const NewDM = () => {
//   const { setSelectedChatType, setSelectedChatData } = useAppStore();
//   const [openNewContactModal, setOpenNewContactModal] = useState(false);
//   const [searchedContacts, setSearchedContacts] = useState([]);
//   const searchContacts = async (searchTerm) => {
//     try {
//       if (searchTerm.length > 0) {
//         const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, {
//           searchTerm,
//         });
//         if (response.data.success) {
//           setSearchedContacts(response.data.contacts);
//           // console.log(searchedContacts);
//         }
//       } else {
//         setSearchedContacts([]);
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     }
//   };

//   const selectNewContact = (contact) => {
//     // console.log(contact);
//     setSelectedChatType("contact");
//     setSelectedChatData(contact);
//     setOpenNewContactModal(false);
//     setSearchedContacts([]);
//   };
//   return (
//     <>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger>
//             <FaPlus
//               className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
//               onClick={() => setOpenNewContactModal(true)}
//             />
//           </TooltipTrigger>
//           <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
//             <p>Select new contact</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
//         <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col ">
//           <DialogHeader>
//             <DialogTitle>Please Select a contact</DialogTitle>
//             <DialogDescription></DialogDescription>
//           </DialogHeader>
//           <div>
//             <Input
//               className="rounded-lg p-6 bg-[#2c2e3b] border-none outline-none"
//               placeholder="Search using username/firstname/gmail"
//               onChange={(e) => searchContacts(e.target.value)}
//             />
//           </div>
//           {searchedContacts.length > 0 && (
//             <ScrollArea className="h-[250px]">
//               <div className="flex flex-col gap-5">
//                 {searchedContacts.map((contact) => (
//                   <div
//                     key={contact._id}
//                     className="flex gap-3 items-center cursor-pointer "
//                     onClick={() => selectNewContact(contact)}
//                   >
//                     <div className="w-12 h-12 relative  ">
//                       <Avatar className="overflow-hidden  h-12 w-12  rounded-full ">
//                         {contact.profImage ? (
//                           <AvatarImage
//                             src={`${HOST}/${contact.profImage}`}
//                             alt="profile"
//                             className="object-cover w-full h-full bg-black rounded-full"
//                           />
//                         ) : (
//                           <div
//                             className={`uppercase h-12 w-12 border-[1px] text-lg flex items-center justify-center rounded-full ${getColor(
//                               contact.color
//                             )}`}
//                           >
//                             {contact.firstName
//                               ? contact.firstName.split("").shift()
//                               : contact.userName.split("").shift()}
//                           </div>
//                         )}
//                       </Avatar>
//                     </div>
//                     <div className="flex flex-col">
//                       <span>
//                         {contact.firstName && contact.lastName
//                           ? `${contact.firstName} ${contact.lastName}`
//                           : " "}
//                       </span>
//                       <span className="text-xs">{contact.userName}</span>
//                       <span className="text-xs">{contact.email}</span>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           )}
//           {searchedContacts.length <= 0 && (
//             <div className="flex-1  md:flex flex-col justify-center items-center duration-1000 transition-all mt-5 md:mt-0">
//               <Lottie
//                 isClickToPauseDisabled={true}
//                 height={100}
//                 width={100}
//                 options={animationDefaultOptions}
//               />
//               <div className="text-opacity-80 text-white flex flex-col  gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center ">
//                 <h3 className="poppins-medium">
//                   Hi <span className="text-purple-500"> ! </span>
//                   Search new
//                   <span className="text-purple-500"> Contacts </span>
//                 </h3>
//               </div>
//             </div>
//           )}
//           {/* <div className="flex items-centers justify-center">
//             <MadeBy />
//           </div> */}
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default NewDM;

// import React, { useState, useEffect } from "react";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { animationDefaultOptions, getColor } from "@/lib/utils";
// import Lottie from "react-lottie";
// import { FaPlus } from "react-icons/fa6";
// import { Input } from "@/components/ui/input";
// import { toast } from "react-toastify";
// import { apiClient } from "@/lib/api-client";
// import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import useAppStore from "@/store";
// import MadeBy from "@/components/ui/MadeBy";
// import { socket } from "@/lib/socket"; // ✅ import socket

// const NewDM = () => {
//   const { setSelectedChatType, setSelectedChatData } = useAppStore();
//   const [openNewContactModal, setOpenNewContactModal] = useState(false);
//   const [searchedContacts, setSearchedContacts] = useState([]);

//   const searchContacts = async (searchTerm) => {
//     try {
//       if (searchTerm.length > 0) {
//         const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, {
//           searchTerm,
//         });
//         if (response.data.success) {
//           setSearchedContacts(response.data.contacts);
//         }
//       } else {
//         setSearchedContacts([]);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error fetching contacts");
//     }
//   };

//   const selectNewContact = (contact) => {
//     setSelectedChatType("contact");
//     setSelectedChatData(contact);
//     setOpenNewContactModal(false);
//     setSearchedContacts([]);
//   };

//   // ✅ Real-time update using socket
//   useEffect(() => {
//     socket.on("receive-message", ({ sender, message }) => {
//       setSearchedContacts((prevContacts) => {
//         const existing = prevContacts.find((c) => c._id === sender._id);
//         if (existing) {
//           return prevContacts.map((c) =>
//             c._id === sender._id ? { ...c, latestMessage: message } : c
//           );
//         } else {
//           return [{ ...sender, latestMessage: message }, ...prevContacts];
//         }
//       });
//     });

//     return () => {
//       socket.off("receive-message");
//     };
//   }, []);

//   // Optional: fetch on modal open
//   useEffect(() => {
//     if (openNewContactModal) {
//       searchContacts("");
//     }
//   }, [openNewContactModal]);

//   return (
//     <>
//       <TooltipProvider>
//         <Tooltip>
//           <TooltipTrigger>
//             <FaPlus
//               className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
//               onClick={() => setOpenNewContactModal(true)}
//             />
//           </TooltipTrigger>
//           <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
//             <p>Select new contact</p>
//           </TooltipContent>
//         </Tooltip>
//       </TooltipProvider>

//       <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
//         <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
//           <DialogHeader>
//             <DialogTitle>Please Select a contact</DialogTitle>
//             <DialogDescription></DialogDescription>
//           </DialogHeader>

//           <div>
//             <Input
//               className="rounded-lg p-6 bg-[#2c2e3b] border-none outline-none"
//               placeholder="Search using username/firstname/gmail"
//               onChange={(e) => searchContacts(e.target.value)}
//             />
//           </div>

//           {searchedContacts.length > 0 && (
//             <ScrollArea className="h-[250px]">
//               <div className="flex flex-col gap-5">
//                 {searchedContacts.map((contact) => (
//                   <div
//                     key={contact._id}
//                     className="flex gap-3 items-center cursor-pointer"
//                     onClick={() => selectNewContact(contact)}
//                   >
//                     <div className="w-12 h-12 relative">
//                       <Avatar className="overflow-hidden h-12 w-12 rounded-full">
//                         {contact.profImage ? (
//                           <AvatarImage
//                             src={`${HOST}/${contact.profImage}`}
//                             alt="profile"
//                             className="object-cover w-full h-full bg-black rounded-full"
//                           />
//                         ) : (
//                           <div
//                             className={`uppercase h-12 w-12 border-[1px] text-lg flex items-center justify-center rounded-full ${getColor(
//                               contact.color
//                             )}`}
//                           >
//                             {contact.firstName
//                               ? contact.firstName.charAt(0)
//                               : contact.userName.charAt(0)}
//                           </div>
//                         )}
//                       </Avatar>
//                     </div>
//                     <div className="flex flex-col">
//                       <span className="font-semibold">
//                         {contact.firstName && contact.lastName
//                           ? `${contact.firstName} ${contact.lastName}`
//                           : contact.userName}
//                       </span>
//                       <span className="text-xs text-gray-400">
//                         {contact.email}
//                       </span>
//                       {contact.latestMessage && (
//                         <span className="text-sm text-green-400 mt-1">
//                           💬 {contact.latestMessage}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </ScrollArea>
//           )}

//           {searchedContacts.length <= 0 && (
//             <div className="flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all mt-5 md:mt-0">
//               <Lottie
//                 isClickToPauseDisabled={true}
//                 height={100}
//                 width={100}
//                 options={animationDefaultOptions}
//               />
//               <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
//                 <h3 className="poppins-medium">
//                   Hi <span className="text-purple-500">!</span> Search new{" "}
//                   <span className="text-purple-500">Contacts</span>
//                 </h3>
//               </div>
//             </div>
//           )}

//           <div className="flex items-center justify-center">
//             <MadeBy />
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default NewDM;

import React, { useState, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { animationDefaultOptions, getColor } from "@/lib/utils";
import Lottie from "react-lottie";
import { FaPlus } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { apiClient } from "@/lib/api-client";
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import useAppStore from "@/store";
import MadeBy from "@/components/ui/MadeBy";
import { socket } from "@/lib/socket";

const NewDM = () => {
  const {
    setSelectedChatType,
    setSelectedChatData,
    selectedChatType,
    selectedChatData,
  } = useAppStore();

  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([]);

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(SEARCH_CONTACTS_ROUTES, {
          searchTerm,
        });
        if (response.data.success) {
          setSearchedContacts(response.data.contacts);
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching contacts");
    }
  };

  const selectNewContact = (contact) => {
    setSelectedChatType("contact");
    setSelectedChatData(contact);
    setOpenNewContactModal(false);
    setSearchedContacts((prev) =>
      prev.map((c) => (c._id === contact._id ? { ...c, unread: false } : c))
    );
  };

  useEffect(() => {
    socket.on("receive-message", ({ sender, message }) => {
      const isChatOpen =
        selectedChatType === "contact" && selectedChatData?._id === sender._id;

      setSearchedContacts((prevContacts) => {
        const existing = prevContacts.find((c) => c._id === sender._id);
        if (existing) {
          return prevContacts.map((c) =>
            c._id === sender._id
              ? {
                  ...c,
                  latestMessage: message,
                  unread: !isChatOpen,
                }
              : c
          );
        } else {
          return [
            {
              ...sender,
              latestMessage: message,
              unread: !isChatOpen,
            },
            ...prevContacts,
          ];
        }
      });
    });

    return () => {
      socket.off("receive-message");
    };
  }, [selectedChatType, selectedChatData]);

  useEffect(() => {
    if (openNewContactModal) {
      searchContacts("");
    }
  }, [openNewContactModal]);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModal(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Select new contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal}>
        <DialogContent className="bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col">
          <DialogHeader>
            <DialogTitle>Please Select a contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          <div>
            <Input
              className="rounded-lg p-6 bg-[#2c2e3b] border-none outline-none"
              placeholder="Search using username/firstname/gmail"
              onChange={(e) => searchContacts(e.target.value)}
            />
          </div>

          {searchedContacts.length > 0 && (
            <ScrollArea className="h-[250px]">
              <div className="flex flex-col gap-5">
                {searchedContacts.map((contact) => (
                  <div
                    key={contact._id}
                    className="flex gap-3 items-center cursor-pointer"
                    onClick={() => selectNewContact(contact)}
                  >
                    {/* {console.log("dhek",contact)} */}
                    <div className="w-12 h-12 relative">
                      <Avatar className="overflow-hidden h-12 w-12 rounded-full">
                        {contact.profImage ? (
                          <AvatarImage
                            src={`${HOST}/${contact.profImage}`}
                            alt="profile"
                            className="object-cover w-full h-full bg-black rounded-full"
                          />
                        ) : (
                          <div
                            className={`uppercase h-12 w-12 border-[1px] text-lg flex items-center justify-center rounded-full ${getColor(
                              contact.color
                            )}`}
                          >
                            {contact.firstName
                              ? contact.firstName.charAt(0)
                              : contact.userName.charAt(0)}
                          </div>
                        )}
                      </Avatar>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">
                        {contact.firstName && contact.lastName
                          ? `${contact.firstName} ${contact.lastName}`
                          : contact.userName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {contact.email}
                        {contact.unread && (
                          <span className="text-blue-400 ml-2 text-xl">🔵</span>
                        )}
                      </span>
                      {contact.latestMessage && (
                        <span className="text-sm text-green-400 mt-1">
                          💬 {contact.latestMessage}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {searchedContacts.length <= 0 && (
            <div className="flex-1 md:flex flex-col justify-center items-center duration-1000 transition-all mt-5 md:mt-0">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOptions}
              />
              <div className="text-opacity-80 text-white flex flex-col gap-5 items-center mt-5 lg:text-2xl text-xl transition-all duration-300 text-center">
                <h3 className="poppins-medium">
                  Hi <span className="text-purple-500">!</span> Search new{" "}
                  <span className="text-purple-500">Contacts</span>
                </h3>
              </div>
            </div>
          )}

          {/* <div className="flex items-center justify-center">
            <MadeBy />
          </div> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NewDM;
