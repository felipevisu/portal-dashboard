import React from "react";
import { Routes, Route } from "react-router-dom";
import SessionCreate from "./views/SessionCreate";
import SessionList from "./views/SessionList";

export const Sessions = () => {
  return (
    <Routes>
      <Route path="/" element={<SessionList />} />
      <Route path="/create" element={<SessionCreate />} />
    </Routes>
  );
};

export default Sessions;
