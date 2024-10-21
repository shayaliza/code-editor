import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleCreateRoom = () => {
    const newRoomId = uuidv4(); // Generate a new room ID
    navigate(`/room/${newRoomId}`); // Redirect to the new room
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Real-Time Code Collaboration</h1>
      <button onClick={handleCreateRoom} style={buttonStyle}>
        Create New Room
      </button>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "5px",
};

export default HomePage;
