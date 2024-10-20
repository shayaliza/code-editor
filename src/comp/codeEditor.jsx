// // src/components/CodeEditor.jsx
// import React, { useEffect, useState } from "react";
// import { UnControlled as CodeMirror } from "react-codemirror2";
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/material.css";
// import "codemirror/mode/javascript/javascript";
// import { initSocket } from "../socket";

// const CodeEditor = () => {
//   const [code, setCode] = useState("// Start typing your code here2");
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     // Initialize the socket connection
//     const socketInstance = initSocket();
//     setSocket(socketInstance);

//     // Listen for code updates from the server
//     socketInstance.on("code-update", (newCode) => {
//       console.log("Received code update from server:", newCode); // Add log
//       setCode(newCode);
//     });

//     // Log connection issues
//     socketInstance.on("connect_error", (err) => {
//       console.error("Socket connection error:", err);
//     });

//     socketInstance.on("disconnect", (reason) => {
//       console.warn("Socket disconnected:", reason);
//     });

//     // Cleanup on unmount
//     return () => socketInstance.disconnect();
//   }, []);

//   const handleEditorChange = (editor, data, value) => {
//     console.log("Editor content changed:", value); // Log the editor content
//     setCode(value);

//     // Emit code updates to other clients
//     if (socket) {
//       console.log("Emitting code change:", value); // Log the emitted value
//       socket.emit("code-change", value);
//     }
//   };
//   return (
//     <div>
//       <h2>Real-Time Code Editor</h2>
//       {/* <CodeMirror
//         value={code}
//         options={{
//           mode: "javascript",
//           theme: "material",
//           lineNumbers: true,
//         }}
//         onChange={handleEditorChange}
//       /> */}
//       <CodeMirror
//         value={code}
//         options={{
//           mode: "javascript",
//           theme: "material",
//           lineNumbers: true,
//         }}
//         onBeforeChange={(editor, data, value) => {
//           setCode(value); // Update the state with the new code
//         }}
//         onChange={(editor, data, value) => {
//           handleEditorChange(editor, data, value); // Emit the code-change event here
//         }}
//       />
//     </div>
//   );
// };

// export default CodeEditor;

import React, { useEffect, useState } from "react";
import { initSocket } from "../socket";

const CodeEditor = () => {
  const [code, setCode] = useState("Start typing your code here...");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Initialize the socket connection
    const socketInstance = initSocket();
    setSocket(socketInstance);

    // Listen for code updates from the server
    socketInstance.on("code-update", (newCode) => {
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
    return () => socketInstance.disconnect();
  }, []);

  const handleTextChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode); // Update the code locally

    // Emit code updates to other clients
    if (socket) {
      console.log("Emitting code change:", newCode); // Log emitted code
      socket.emit("code-change", newCode);
    }
  };

  return (
    <div>
      <h2>Real-Time Text Editor</h2>
      <textarea
        value={code}
        onChange={handleTextChange}
        rows="10"
        cols="50"
        placeholder="Start typing..."
      />
    </div>
  );
};

export default CodeEditor;
