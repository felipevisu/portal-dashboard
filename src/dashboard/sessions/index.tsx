import React from "react";
import { Route, Routes } from "react-router-dom";

import SessionCreate from "./views/SessionCreate";
import SessionDetails from "./views/SessionDetails";
import SessionList from "./views/SessionList/SessionList";

export const Sessions = () => {
  return (
    <Routes>
      <Route path="/" element={<SessionList />} />
      <Route path="/create" element={<SessionCreate />} />
      <Route path="/details/:id" element={<SessionDetails />} />
    </Routes>
  );
};

export default Sessions;
