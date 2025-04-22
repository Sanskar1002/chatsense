import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:8000"; // update if hosted

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  transports: ["websocket"],
});
