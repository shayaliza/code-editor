// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:5173", // Vite dev server
//     methods: ["GET", "POST"],
//   },
//   // allowEIO3: true,
// });

// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("code-change", (newCode) => {
//     console.log("Received code from client:", newCode); // Check if newCode is correct here
//     socket.broadcast.emit("code-update", newCode);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected");
//   });
// });

// server.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Vite dev server or your deployed frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  // User joins a room
  socket.on("join-room", (roomId) => {
    socket.join(roomId); // Join the room sent by the frontend
    console.log(`User ${socket.id} joined room ${roomId}`);
  });

  // Handle code changes for the specific room
  socket.on("code-change", ({ roomId, newCode }) => {
    console.log(
      `Code updated in room ${roomId} by user ${socket.id}:`,
      newCode
    );
    socket.to(roomId).emit("code-update", newCode); // Send code update to all users in the room except the sender
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
