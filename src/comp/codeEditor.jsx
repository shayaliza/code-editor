import React, { useEffect, useState } from "react";
import { initSocket } from "../socket";
import { useParams } from "react-router-dom";

const CodeEditor = () => {
  const [code, setCode] = useState("Start typing your code here...");
  const [socket, setSocket] = useState(null);
  const { roomId } = useParams(); // Get the roomId from the URL

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = initSocket();
    setSocket(socketInstance);

    // Join the specific room
    socketInstance.emit("join-room", roomId);

    // Listen for code updates from the server
    socketInstance.on("code-update", ({ newCode }) => {
      console.log("Received code update from server:", newCode); // Log received code
      setCode(newCode); // Update the code state with new code from server
    });

    // Log connection issues
    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    socketInstance.on("disconnect", (reason) => {
      console.warn("Socket disconnected:", reason);
    });

    // Cleanup on unmount
    return () => {
      socketInstance.emit("leave-room", roomId); // Optional: leave room on unmount
      socketInstance.disconnect();
    };
  }, [roomId]);

  const handleTextChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode); // Update the code locally

    // Emit code updates to other clients in the same room
    if (socket) {
      console.log("Emitting code change:", newCode); // Log emitted code
      socket.emit("code-change", { roomId, newCode });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Real-Time Collaborative Code Editor</h2>
      <textarea
        value={code}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        placeholder="Start typing..."
        style={{ marginTop: "20px" }}
      />
      <p>Share this room link to collaborate: {window.location.href}</p>
    </div>
  );
};

export default CodeEditor;
