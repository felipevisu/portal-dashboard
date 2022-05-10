import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard";
import Frontend from "./frontend";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Frontend />} />
        <Route path="/admin/*" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
