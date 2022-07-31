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
import SegmentIcon from "@mui/icons-material/Segment";

import { Label, MenuItem, OpenClose } from "./styles";

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
    label: "Segmentos",
    path: "/admin/segments",
    icon: <SegmentIcon />,
  },
  {
    label: "Prestadores de serviço",
    path: "/admin/providers",
    icon: <DesignServicesIcon />,
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
  active: boolean;
  opened: boolean;
  icon: React.ReactNode | string;
};

const isActive = (path: string, location: string) => {
  if (path === "/admin") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, active, opened, icon }: ItemProps) => {
  return (
    <li>
      <Link to={path}>
        <MenuItem active={active}>
          {icon}
          {opened && <Label>{label}</Label>}
        </MenuItem>
      </Link>
    </li>
  );
};

export const Menu = () => {
  const [opened, setOpened] = useState<boolean>(false);
  const location = useLocation();

  return (
    <div>
      <ul>
        {ITEMS.map((item) => (
          <Item
            key={item.path}
            {...item}
            active={isActive(item.path, location.pathname)}
            opened={opened}
          />
        ))}
        <li>
          <OpenClose onClick={() => setOpened(!opened)}>
            {opened ? <ArrowCircleLeft /> : <ArrowCircleRight />}
          </OpenClose>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
