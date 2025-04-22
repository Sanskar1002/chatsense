import express from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, searchContacts } from "../controllers/ContactsController.js";
const contactRouter = express.Router();

contactRouter.route("/search").post(verifyToken, searchContacts);
contactRouter.route("/get-contacts-for-dm").get(verifyToken, getContactsForDMList);

export default contactRouter;
