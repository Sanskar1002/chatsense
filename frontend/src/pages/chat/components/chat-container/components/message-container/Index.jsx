// import { apiClient } from "@/lib/api-client";
// import useAppStore from "@/store";
// import { GET_ALL_MESSAGES_ROUTES, HOST } from "@/utils/constants";
// import moment from "moment";
// import React, { useEffect, useRef } from "react";
// import { toast } from "react-toastify";
// import { MdFolderZip } from "react-icons/md";
// import { IoMdArrowRoundDown } from "react-icons/io";
// const MessageContainer = () => {
//   const scrollRef = useRef();
//   const {
//     selectedChatMessages,
//     selectedChatType,
//     selectedChatData,
//     setSelectedChatMessages,
//   } = useAppStore();

//   useEffect(() => {
//     const getMessages = async () => {
//       try {
//         const response = await apiClient.post(GET_ALL_MESSAGES_ROUTES, {
//           id: selectedChatData._id,
//         });
//         if (response.data.success) {
//           setSelectedChatMessages(response.data.messages);
//         }
//       } catch (error) {
//         toast.error(error.response.data.message);
//       }
//     };

//     if (selectedChatData._id) {
//       if (selectedChatType === "contact") {
//         getMessages();
//       }
//     }

//     // try {

//     // } catch (error) {
//     //   toast.error(error.response.data.message);
//     // }
//   }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

//   useEffect(() => {
//     if (scrollRef.current) {
//       scrollRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [selectedChatMessages]);

//   const renderMessages = () => {
//     let lastDate = null;

//     return selectedChatMessages.map((message) => {
//       // logic for  showing date only once for one day
//       const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
//       const showDate = messageDate !== lastDate;
//       lastDate = messageDate;

//       return (
//         <div key={message._id}>
//           {" "}
//           {showDate && (
//             <div className="text-center text-gray-500 my-2 ">
//               {moment(message.timestamp).format("LL")}
//             </div>
//           )}
//           {selectedChatType === "contact" && renderDMMessages(message)}
//         </div>
//       );
//     });
//   };

//   const checkIfImage = (filePath) => {
//     const imageRegex =
//       /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
//     return imageRegex.test(filePath);
//   };

//   const downloadFile = async (url) => {
//     const response = await apiClient.get(`${HOST}/${url}`, {
//       responseType: "blob",
//     });

//     const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = urlBlob;
//     link.setAttribute("download", url.split("/").pop());
//     document.body.appendChild(link);
//     link.click();
//     link.remove();
//     window.URL.revokeObjectURL(urlBlob);
//   };
//   const renderDMMessages = (message) => (
//     <div
//       className={`${
//         message.sender === selectedChatData._id ? "text-left" : "text-right"
//       }`}
//     >
//       {message.messageType === "text" && (
//         <div
//           className={`${
//             message.sender !== selectedChatData._id
//               ? "bg-[#8417ff]/5 text-[#8417ff/90 border-[#8417ff]/50"
//               : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
//           } border inline-block p-4 rounded my-1 max-w-[50%] break-words `}
//         >
//           {message.content}
//         </div>
//       )}

//       {message.messageType === "file" && (
//         <div
//           className={`${
//             message.sender !== selectedChatData._id
//               ? "bg-[#8417ff]/5 text-[#8417ff/90 border-[#8417ff]/50"
//               : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
//           } border inline-block p-4 rounded my-1 max-w-[50%] break-words `}
//         >
//           {checkIfImage(message.fileUrl) ? (
//             <div className="cursor-pointer">
//               <img
//                 src={`${HOST}/${message.fileUrl}`}
//                 height={300}
//                 width={300}
//                 alt="image"
//               />
//             </div>
//           ) : (
//             <div className="flex items-center justify-center gap-4">
//               <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
//                 <MdFolderZip />
//               </span>
//               <span>{message.fileUrl.split("/").pop()}</span>
//               <span
//                 className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
//                 onClick={() => downloadFile(message.fileUrl)}
//               >
//                 {" "}
//                 <IoMdArrowRoundDown />{" "}
//               </span>
//             </div>
//           )}
//         </div>
//       )}
//       <div className="text-xs text-gray-600">
//         {moment(message.timestamp).format("LT")}
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70] xl:w-[80vw] w-full ">
//       {" "}
//       {renderMessages()} <div ref={scrollRef} />
//     </div>
//   );
// };

// export default MessageContainer;

import { apiClient } from "@/lib/api-client";
import useAppStore from "@/store";
import { GET_ALL_MESSAGES_ROUTES, HOST } from "@/utils/constants";
import moment from "moment";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";

// 🎭 Emotion Mapping for Styling
const emotionColors = {
  joy: "text-green-400",
  sadness: "text-blue-400",
  anger: "text-red-400",
  love: "text-pink-400",
  neutral: "text-gray-400",
  surprise: "text-yellow-400",
};

const MessageContainer = () => {
  const scrollRef = useRef();
  const {
    selectedChatMessages,
    selectedChatType,
    selectedChatData,
    setSelectedChatMessages,
  } = useAppStore();

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;
    return imageRegex.test(filePath);
  };

  const downloadFile = async (url) => {
    const response = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
    });

    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
  };
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES_ROUTES, {
          id: selectedChatData._id,
        });

        if (response.data.success) {
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;

    return selectedChatMessages.map((message) => {
      const messageDate = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;

      return (
        <div key={message._id}>
          {showDate && (
            <div className="text-center text-gray-500 my-2 ">
              {moment(message.timestamp).format("LL")}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    const emotion = message.emotion || "neutral"; // Default to neutral if emotion is missing
    console.log(emotion);
    const emotionClass = emotionColors[emotion] || "text-gray-400";

    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words `}
          >
            {message.content}
          </div>
        )}
        {
          <div className={`mt-1 text-[10px] font-semibold ${emotionClass}`}>
            {emotion.charAt(0).toUpperCase() + emotion.slice(1)}
          </div>
        }

        {message.messageType === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words `}
          >
            {/* <div className="flex items-center gap-2">
              <MdFolderZip className="text-3xl" />
              <span>{message.fileUrl.split("/").pop()}</span>
              <IoMdArrowRoundDown
                className="cursor-pointer text-2xl hover:text-white transition-all duration-300"
                onClick={() => downloadFile(message.fileUrl)}
              />
            </div> */}
            {checkIfImage(message.fileUrl) ? (
              <div className="cursor-pointer">
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                  alt="image"
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span className="text-white/8 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="bg-black/20 p-3 text-2xl rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  {" "}
                  <IoMdArrowRoundDown />{" "}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70] xl:w-[80vw] w-full">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
