import { Box, styled, Typography } from "@mui/material";

type MenuItem = {
  active?: boolean;
};

type Opened = {
  opened?: boolean;
};

export const MenuMain = styled("div")(({ theme }) => ({
  width: "0",
  transition: "all ease 300ms",
  position: "relative",
  [theme.breakpoints.up("lg")]: {
    width: "240px",
  },
}));

export const MenuContent = styled("div")<Opened>(({ opened, theme }) => ({
  zIndex: "1000",
  height: "100vh",
  position: "fixed",
  overflowX: "hidden",
  overflowY: "auto",
  left: opened ? 0 : "-300px",
  transition: "all ease 300ms",
  background: theme.palette.background.default,
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  [theme.breakpoints.up("lg")]: {
    left: 0,
  },
}));

export const MenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<MenuItem>(({ active, theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(1),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  "&:hover": { color: theme.palette.primary.main },
  background: active ? theme.palette.action.selected : "",
  borderRadius: "0 8px 8px 0",
  width: "240px",
  transition: "all ease 300ms",
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: "inherit",
  fontWeight: "600",
  paddingLeft: theme.spacing(2),
  "&:hover": { color: theme.palette.primary.main },
}));

export const MenuIcon = styled("button")(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.background.default,
  border: "none",
  height: 40,
  width: 40,
  borderRadius: 4,
  [theme.breakpoints.up("lg")]: {
    display: "none",
  },
}));
