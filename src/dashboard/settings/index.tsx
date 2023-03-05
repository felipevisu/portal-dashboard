import React from "react";
import { Route, Routes } from "react-router-dom";

import { Settings as SettingsView } from "./views/Settings";

export const Settings = () => {
  return (
    <Routes>
      <Route path="/" element={<SettingsView />} />
    </Routes>
  );
};

export default Settings;
