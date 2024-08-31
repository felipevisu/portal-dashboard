import { Box, IconButton, styled, Typography } from "@mui/material";

type MenuItem = {
  active?: boolean;
};

type Opened = {
  opened?: boolean;
};

export const MenuMain = styled("div")(({ theme }) => ({
  width: "0",
  position: "relative",
  [theme.breakpoints.up("lg")]: {
    width: "300px",
  },
}));

export const MenuContent = styled("div")<Opened>(({ opened, theme }) => ({
  zIndex: "1000",
  top: theme.spacing(3),
  bottom: theme.spacing(3),
  padding: theme.spacing(2),
  position: "fixed",
  overflowX: "hidden",
  overflowY: "auto",
  borderRadius: theme.spacing(1),
  left: opened ? theme.spacing(3) : "-300px",
  background: theme.palette.background.paper,
  [theme.breakpoints.up("lg")]: {
    left: theme.spacing(3),
  },
  ul: {
    listStyle: "none",
  },
}));

export const MenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<MenuItem>(({ active, theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2),
  marginBottom: theme.spacing(1),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  "&:hover": { color: theme.palette.primary.main },
  background: active ? theme.palette.action.selected : "",
  borderRadius: theme.spacing(1),
  width: "240px",
  transition: "all ease 300ms",
  cursor: "pointer",
}));

export const SubMenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<MenuItem>(({ active, theme }) => ({
  padding: theme.spacing(0.5, 1, 1, 8),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  "&:hover": { color: theme.palette.primary.main },
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: "inherit",
  fontWeight: "600",
  paddingLeft: theme.spacing(2),
  "&:hover": { color: theme.palette.primary.main },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  marginRight: theme.spacing(2),
  "&:hover": {
    background: theme.palette.primary.dark,
  },
  color: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));
