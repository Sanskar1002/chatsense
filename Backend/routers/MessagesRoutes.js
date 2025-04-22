import { Router } from "express";
import { getMessages, uploadFile } from "../controllers/MessagesController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer"
const messagesRoutes = Router();
const upload = multer({dest:"uploads/files"})

messagesRoutes.route("/get-messages").post(verifyToken, getMessages);
messagesRoutes.route("/upload-file").post(verifyToken,upload.single("file"),uploadFile)
export default messagesRoutes;
