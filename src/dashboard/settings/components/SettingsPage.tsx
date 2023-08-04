import React from "react";
import { Link } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import { SettingsItem } from "../utils";

import { NavigationCard, SettingsGrid } from "./styles";

interface SettingsPageProps {
  menus: SettingsItem[];
}

export const SettingsPage = ({ menus }: SettingsPageProps) => {
  return (
    <SettingsGrid>
      {menus.map((menu) => (
        <Link to={menu.url} key={menu.url}>
          <NavigationCard>
            <Typography>{menu.icon}</Typography>
            <Box>
              <Typography fontWeight="bold" sx={{ marginBottom: 1 }}>
                {menu.title}
              </Typography>
              <Typography>{menu.description}</Typography>
            </Box>
          </NavigationCard>
        </Link>
      ))}
    </SettingsGrid>
  );
};

export default SettingsPage;
