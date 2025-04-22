import useAppStore from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const socket = useRef();
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socket.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo._id },
      });

      socket.current.on("connect", () => {
        console.log("connected to socket server");
      });
      // const handleReceiveMessage = (message) => {
      //   // const { addMessage, selectedChatData, selectedChatType } =
      //   //   useAppStore.getState();

      //   // if (
      //   //   selectedChatType !== undefined &&
      //   //   (selectedChatData._id === message.sender._id ||
      //   //     selectedChatData._id === message.recipient._id)
      //   // ) {
      //   //   addMessage(message);
      //   //   console.log(message)
      //   // }

      //   const {
      //     addMessage,
      //     selectedChatData,
      //     selectedChatType,
      //     updateLatestMessageInContactList,
      //   } = useAppStore.getState();
        
      //   if (
      //     selectedChatType !== undefined &&
      //     (selectedChatData._id === message.sender._id ||
      //       selectedChatData._id === message.recipient._id)
      //   ) {
      //     addMessage(message);
      //   }
      //   updateLatestMessageInContactList(message);
      // };

      const handleReceiveMessage = (message) => {
        const {
          addMessage,
          selectedChatData,
          selectedChatType,
          updateLatestMessageInContactList,
          updateLastMessage, // <-- ADD THIS
        } = useAppStore.getState();
      
        const isCurrentChatOpen =
          selectedChatType !== undefined &&
          (selectedChatData._id === message.sender._id ||
            selectedChatData._id === message.recipient._id);
      
        if (isCurrentChatOpen) {
          addMessage(message);
        } else {
          updateLastMessage(message.sender._id, message); // <-- Mark unread
        }
      
        updateLatestMessageInContactList(message);
      };
      
      socket.current.on("receiveMessage", handleReceiveMessage);
      return () => {
        socket.current.disconnect();
      }; 
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};
