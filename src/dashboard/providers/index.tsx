import React from "react";
import { Routes, Route } from "react-router-dom";
import ProviderList from "./views/ProviderList";
import ProviderCreate from "./views/ProviderCreate";
import ProviderDetails from "./views/ProviderDetails";

export const Providers = () => {
  return (
    <Routes>
      <Route path="/" element={<ProviderList />} />
      <Route path="/create" element={<ProviderCreate />} />
      <Route path="/details/:id" element={<ProviderDetails />} />
    </Routes>
  );
};

export default Providers;
