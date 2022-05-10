import React from "react";
import { Routes, Route } from "react-router-dom";
import ProviderList from "./views/ProviderList";

export const Providers = () => {
  return (
    <Routes>
      <Route path="/" element={<ProviderList />} />
    </Routes>
  );
};

export default Providers;
