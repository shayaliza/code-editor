import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

export const initSocket = () => {
  const options = {
    "force new connection": true,
    reconnectionAttempts: Infinity,
    timeout: 10000,
    //     transports: ["polling"], // polling only
    //     transports: ["websocket"], // Use WebSocket only
    transports: ["websocket", "polling"], //fallback to polling in case WebSocket fails
  };
  return io(SOCKET_URL, options);
};
