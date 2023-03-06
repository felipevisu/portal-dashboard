import React from "react";
import { Route, Routes } from "react-router-dom";

import PluginDetails from "./views/PluginDetails";
import PluginsList from "./views/PluginsList";

export const Plugins = () => {
  return (
    <Routes>
      <Route path="/" element={<PluginsList />} />
      <Route path="/details/:id/*" element={<PluginDetails />} />
    </Routes>
  );
};

export default Plugins;
