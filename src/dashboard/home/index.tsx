import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";

export const Homepage = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Homepage;
