import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";

export const Auth = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default Auth;
