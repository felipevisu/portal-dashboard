import React, { useEffect, useState } from "react";
import i18n from "i18next";
import { Link, useLocation } from "react-router-dom";

import { AttachMoney } from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { useLinks } from "@portal/hooks";

import { Label, MenuContent, MenuItem, MenuMain, SubMenuItem } from "./styles";
import { useEntryTypesQuery } from "@portal/graphql";

type MenuItemProps = {
  label: string;
  path: string;
  icon: React.ReactNode;
  subItems?: { label: string; path: string }[];
};

const useMenuItems = (): MenuItemProps[] => {
  const { t } = i18n;
  const links = useLinks();
  const { data } = useEntryTypesQuery({ variables: { first: 10 } });

  const entryTypesMenu =
    data?.entryTypes?.edges?.map(({ node }) => ({
      label: node.name,
      path: links.entryList(node.id),
      icon: <DashboardIcon />,
    })) || [];

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
      label: "Cadastros",
      path: "#",
      icon: <DesignServicesIcon />,
      subItems: entryTypesMenu,
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
  subItems?: {
    label: string;
    path: string;
  }[];
};

const isActive = (path: string, location: string) => {
  if (path === "/") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, icon, active, subItems }: ItemProps) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(subItems?.some((item) => isActive(item.path, location.pathname)));
  }, [location, subItems]);

  return (
    <li>
      {subItems?.length ? (
        <MenuItem active={open} onClick={() => setOpen(!open)}>
          {icon}
          <Label>{label}</Label>
        </MenuItem>
      ) : (
        <Link to={path}>
          <MenuItem active={active}>
            {icon}
            <Label>{label}</Label>
          </MenuItem>
        </Link>
      )}
      {open && subItems?.length && (
        <ul>
          {subItems.map((item, index) => (
            <li key={index}>
              <Link to={item.path}>
                <SubMenuItem active={isActive(item.path, location.pathname)}>
                  {item.label}
                </SubMenuItem>
              </Link>
            </li>
          ))}
        </ul>
      )}
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
              subItems={item.subItems}
            />
          ))}
        </ul>
      </MenuContent>
    </MenuMain>
  );
};

export default Menu;
