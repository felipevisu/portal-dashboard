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
import { Box, IconButton, Typography } from "@mui/material";

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: (theme) => theme.spacing(2, 4),
            marginBottom: 2,
            gap: 2,
            color: active ? "primary.main" : "text.secondary",
            "&:hover": { color: "primary.main" },
            background: active ? "white" : "",
            borderRadius: "0 8px 8px 0",
          }}
        >
          {icon}
          {opened && (
            <Typography
              fontWeight="bold"
              sx={{
                color: "inherit",
                "&:hover": { color: (theme) => theme.palette.primary.main },
              }}
            >
              {label}
            </Typography>
          )}
        </Box>
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
          <IconButton
            onClick={() => setOpened(!opened)}
            sx={{
              background: (theme) => theme.palette.primary.main,
              color: "white",
              marginLeft: "24px",
            }}
          >
            {opened ? <ArrowCircleLeft /> : <ArrowCircleRight />}
          </IconButton>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
