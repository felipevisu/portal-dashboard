import React from "react";

import SettingsPage from "../components/SettingsPage";
import { createConfigurationMenu } from "../utils";

export const Settings = () => {
  const menus = createConfigurationMenu();
  return <SettingsPage menus={menus} />;
};

export default Settings;
