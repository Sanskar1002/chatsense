import express from "express";
import dotenv from "dotenv";
import database from "./config/database.js";
import cors from "cors";
import authRouter from "./routers/AuthRoutes.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import contactRouter from "./routers/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routers/MessagesRoutes.js";

dotenv.config();
database();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/contacts", contactRouter);
app.use("/api/messages", messagesRoutes);

const server = app.listen(PORT, () => {
  console.log(`Listening at port localhost:${PORT}`);
});

setupSocket(server);
// console.log(server)
