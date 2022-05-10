import React from "react";
import { Routes, Route } from "react-router-dom";
import SessionList from "./views/SessionList";

export const Sessions = () => {
  return (
    <Routes>
      <Route path="/" element={<SessionList />} />
    </Routes>
  );
};

export default Sessions;
