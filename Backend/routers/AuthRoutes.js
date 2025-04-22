import { Router } from "express";
import {
  getUserInfo,
  login,
  signup,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logout
} from "../controllers/AuthControllers.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";

const authRouter = Router();
const upload = multer({ dest: "uploads/profiles/" });

authRouter.route("/signup").post(signup);
authRouter.route("/login").post(login);
authRouter.route("/user-info").get(verifyToken, getUserInfo);
authRouter.route("/update-profile").post(verifyToken, updateProfile);
authRouter
  .route("/add-profile-image")
  .post(verifyToken, upload.single("profile-image"), addProfileImage);
authRouter
  .route("/remove-profile-image")
  .delete(verifyToken, removeProfileImage);
authRouter.route('/logout').post(verifyToken,logout)
export default authRouter;
