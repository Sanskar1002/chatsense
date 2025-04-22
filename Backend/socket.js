// import { Server as SocketIOServer } from "socket.io";
// import Message from "./models/MessagesModel.js";

// const setupSocket = (server) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: process.env.ORIGIN,
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   const userSocketMap = new Map();

//   const disconnect = (socket) => {
//     console.log(`Client Disconnected :${socket.id}`);
//     for (const [userId, socketId] of userSocketMap.entries()) {
//       if (socketId === socket.id) {
//         userSocketMap.delete(userId);
//         break;
//       }
//     }
//   };

//   const sendMessage = async (message) => {
//     const senderSocketId = userSocketMap.get(message.sender);
//     const recipientSocketId = userSocketMap.get(message.recipient);

//     const createdMessage = await Message.create(message);

//     const messageData = await Message.findById(createdMessage._id)
//       .populate("sender", "id email firstName lastName userName image color")
//       .populate(
//         "recipient",
//         "id email firstName lastName userName image color"
//       );

//     if (recipientSocketId) {
//       io.to(recipientSocketId).emit("receiveMessage", messageData);
//     }

//     // sender is online so send the message to sender so it will update in ui
//     if (senderSocketId) {
//       io.to(senderSocketId).emit("receiveMessage", messageData);
//     }
//   };
//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(userSocketMap);
//       console.log(`User connected : ${userId}with socket Id: ${socket.id}`);
//     } else {
//       console.log("Userid not provided during connection ");
//     }

//     socket.on("sendMessage", sendMessage);
//     socket.on("disconnect", () => disconnect(socket));
//   });
// };

// export default setupSocket;

import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";
import axios from "axios"; // Import axios

const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const userSocketMap = new Map();

  const disconnect = (socket) => {
    console.log(`Client Disconnected: ${socket.id}`);
    for (const [userId, socketId] of userSocketMap.entries()) {
      if (socketId === socket.id) {
        userSocketMap.delete(userId);
        break;
      }
    }
  };

  const sendMessage = async (message) => {
    try {
      // Check if the message is a text message and has content
      if (message.messageType === "text" && message.content) {
        // Call the Python emotion detection API with the content
        const emotionResponse = await axios.post(
          "http://localhost:5000/predict",
          { text: message.content }
        );
        const { emotion, confidence } = emotionResponse.data;
        // Attach emotion data to the message object
        message.emotion = emotion;
        message.confidence = confidence;
      }

      const senderSocketId = userSocketMap.get(message.sender);
      const recipientSocketId = userSocketMap.get(message.recipient);

      // Create the new message (with emotion data if applicable)
      const createdMessage = await Message.create(message);

      const messageData = await Message.findById(createdMessage._id)
        .populate("sender", "id email firstName lastName userName image color")
        .populate(
          "recipient",
          "id email firstName lastName userName image color"
        );

      // Emit the message to the recipient if online
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", messageData);
        //updated
      
      }

      // Emit the message to the sender to update their UI
      if (senderSocketId) {
        io.to(senderSocketId).emit("receiveMessage", messageData);
      
      }
    } catch (error) {
      console.error("Error in sendMessage:", error);
    }
  };

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(userSocketMap);
      console.log(`User connected: ${userId} with socket Id: ${socket.id}`);
    } else {
      console.log("UserId not provided during connection");
    }

    socket.on("sendMessage", sendMessage);
    socket.on("disconnect", () => disconnect(socket));
  });
};

export default setupSocket;
