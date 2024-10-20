const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server
    methods: ["GET", "POST"],
  },
  // allowEIO3: true,
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("code-change", (newCode) => {
    console.log("Received code from client:", newCode); // Check if newCode is correct here
    socket.broadcast.emit("code-update", newCode);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
