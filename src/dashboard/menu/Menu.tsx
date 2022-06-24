import { Typography, Box } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CategoryIcon from "@mui/icons-material/Category";
import SegmentIcon from "@mui/icons-material/Segment";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ChatIcon from "@mui/icons-material/Chat";

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
    label: "Sessões públicas",
    path: "/admin/sessions",
    icon: <EventNoteIcon />,
  },
];

type ItemProps = {
  label: string;
  path: string;
  active: boolean;
  icon: React.ReactNode | string;
};

const isActive = (path: string, location: string) => {
  if (path === "/admin") {
    return path === location;
  }
  return location.includes(path);
};

export const Item = ({ label, path, active, icon }: ItemProps) => {
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
          <Typography
            fontWeight="bold"
            sx={{
              color: "inherit",
              "&:hover": { color: (theme) => theme.palette.primary.main },
            }}
          >
            {label}
          </Typography>
        </Box>
      </Link>
    </li>
  );
};

export const Menu = () => {
  const location = useLocation();

  return (
    <div>
      <ul>
        {ITEMS.map((item) => (
          <Item
            key={item.path}
            {...item}
            active={isActive(item.path, location.pathname)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Menu;
