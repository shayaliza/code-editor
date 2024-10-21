import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CodeEditor from "./comp/codeEditor";
import HomePage from "./comp/homePage";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<CodeEditor />} />
        </Routes>
      </Router>
      {/* <CodeEditor /> */}
    </div>
  );
}

export default App;
