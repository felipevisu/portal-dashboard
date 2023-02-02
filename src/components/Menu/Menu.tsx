import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  ArrowCircleLeft,
  ArrowCircleRight,
  AttachMoney,
} from "@mui/icons-material";
import CategoryIcon from "@mui/icons-material/Category";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EventNoteIcon from "@mui/icons-material/EventNote";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { Fade } from "@mui/material";

import { Label, MenuContent, MenuItem, MenuMain, OpenClose } from "./styles";

const ITEMS = [
  {
    label: "Homepage",
    path: "/admin",
    icon: <DashboardIcon />,
  },
  {
    label: "Categorias",
    path: "/admin/categories",
    icon: <CategoryIcon />,
  },
  {
    label: "Veículos de comunicação",
    path: "/admin/vehicles",
    icon: <ChatIcon />,
  },
  {
    label: "Prestadores de serviço",
    path: "/admin/providers",
    icon: <DesignServicesIcon />,
  },
  {
    label: "Documentos",
    path: "/admin/documents",
    icon: <InsertDriveFileIcon />,
  },
  {
    label: "Investimentos",
    path: "/admin/investments",
    icon: <AttachMoney />,
  },
  {
    label: "Sessões públicas",
    path: "/admin/sessions",
    icon: <EventNoteIcon />,
  },
];

type ItemProps = {
  label: string;
  path: string;
  icon: React.ReactNode | string;
  active: boolean;
  opened: boolean;
};

const isActive = (path: string, location: string) => {
  if (path === "/admin") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, icon, active, opened }: ItemProps) => {
  return (
    <li>
      <Link to={path}>
        <MenuItem active={active} opened={opened}>
          <div>{icon}</div>
          <Fade in={opened}>
            <Label>{label}</Label>
          </Fade>
        </MenuItem>
      </Link>
    </li>
  );
};

export const Menu = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const location = useLocation();

  return (
    <MenuMain opened={opened}>
      <MenuContent opened={opened}>
        <ul>
          {ITEMS.map((item) => (
            <Item
              key={item.path}
              {...item}
              active={isActive(item.path, location.pathname)}
              opened={opened}
            />
          ))}
        </ul>
        <OpenClose onClick={() => setOpened(!opened)}>
          {opened ? <ArrowCircleLeft /> : <ArrowCircleRight />}
        </OpenClose>
      </MenuContent>
    </MenuMain>
  );
};

export default Menu;
