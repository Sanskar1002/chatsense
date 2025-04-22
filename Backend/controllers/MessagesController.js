import Message from "../models/MessagesModel.js";
import fs from "fs";

export const getMessages = async (req, res) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;
    if (!user1 || !user2) {
      return res.status(400).json({
        success: false,
        message: "sender receiver are required ",
      });
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("File is required");
    }

    const date = Date.now();
    let fileDir = `uploads/files/${date}`;
    let fileName = `${fileDir}/${req.file.originalname}`;
    fs.mkdirSync(fileDir, { recursive: true });

    fs.renameSync(req.file.path, fileName);
    return res.status(200).json({
      success: true,
      filePath: fileName,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


// New sendMessage controller
// export const sendMessage = async (req, res) => {
//   try {
//     const { sender, recipient, text } = req.body;
//     if (!sender || !recipient || !text) {
//       return res.status(400).json({
//         success: false,
//         message: "Sender, recipient, and text are required.",
//       });
//     }
    
//     // Call the Python microservice for emotion detection
//     const emotionResponse = await axios.post('http://localhost:5000/predict', { text });
//     const { emotion, confidence } = emotionResponse.data;
    
//     // Create the new message with the additional emotion data
//     const newMessage = await Message.create({
//       sender,
//       recipient,
//       text,
//       emotion,       // new field
//       confidence,    // new field (make sure your schema is updated to store this)
//       timestamp: new Date(),
//     });
    
//     // You can then emit this new message via your socket if needed.
//     // For example, if you have a socket instance available:
//     // socket.emit("receiveMessage", newMessage);
    
//     return res.status(200).json({
//       success: true,
//       message: newMessage,
//     });
//   } catch (error) {
//     console.error("Error in sendMessage:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Internal Server Error",
//     });
//   }
// };