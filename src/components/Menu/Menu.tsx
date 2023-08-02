import React from "react";
import i18n from "i18next";
import { Link, useLocation } from "react-router-dom";

import { AttachMoney } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useLinks } from "@portal/hooks";

import { Label, MenuContent, MenuItem, MenuMain } from "./styles";

type MenuItemProps = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

const useMenuItems = (): MenuItemProps[] => {
  const { t } = i18n;
  const links = useLinks();

  return [
    {
      label: t("homepage"),
      path: links.homepage(),
      icon: <DashboardIcon />,
    },
    {
      label: t("category.plural"),
      path: links.categoryList(),
      icon: <CategoryIcon />,
    },
    {
      label: t("vehicles.plural"),
      path: links.entryList("vehicles"),
      icon: <ChatIcon />,
    },
    {
      label: t("providers.plural"),
      path: links.entryList("providers"),
      icon: <DesignServicesIcon />,
    },
    {
      label: t("document.plural"),
      path: links.documentList(),
      icon: <InsertDriveFileIcon />,
    },
    {
      label: t("investment.plural"),
      path: "/investments",
      icon: <AttachMoney />,
    },
    {
      label: t("session.plural"),
      path: "/sessions",
      icon: <EventNoteIcon />,
    },
    {
      label: t("settings"),
      path: "/settings",
      icon: <DisplaySettingsIcon />,
    },
  ];
};

type ItemProps = {
  label: string;
  path: string;
  icon: React.ReactNode | string;
  active: boolean;
};

const isActive = (path: string, location: string) => {
  if (path === "/") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, icon, active }: ItemProps) => {
  return (
    <li>
      <Link to={path}>
        <MenuItem active={active}>
          {icon}
          <Label>{label}</Label>
        </MenuItem>
      </Link>
    </li>
  );
};

export const Menu = ({ opened }: { opened: boolean }) => {
  const location = useLocation();
  const menuItems = useMenuItems();

  return (
    <MenuMain>
      <MenuContent opened={opened}>
        <ul>
          {menuItems.map((item) => (
            <Item
              key={item.path}
              {...item}
              active={isActive(item.path, location.pathname)}
            />
          ))}
        </ul>
      </MenuContent>
    </MenuMain>
  );
};

export default Menu;
