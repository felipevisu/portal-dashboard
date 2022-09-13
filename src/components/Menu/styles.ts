import { Box, IconButton, styled, Typography } from "@mui/material";

interface MenuContent {
  opened?: boolean;
}

interface MenuItem {
  active?: boolean;
}

export const MenuContent = styled("div")<MenuContent>(({ opened, theme }) => ({
  zIndex: "1000",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: opened ? "0px" : "-70px",
  padding: theme.spacing(2, 0),
  background: "white",
  paddingTop: "72px",
  [theme.breakpoints.up("lg")]: {
    position: "sticky",
    background: "none",
    paddingTop: theme.spacing(2),
  },
}));

export const MenuItem = styled(Box)<MenuItem>(({ active, theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(2),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  "&:hover": { color: theme.palette.primary.main },
  background: active ? "white" : "",
  borderRadius: "0 8px 8px 0",
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: "inherit",
  fontWeight: "bold",
  paddingLeft: theme.spacing(2),
  "&:hover": { color: theme.palette.primary.main },
}));

export const OpenClose = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  top: "16px",
  left: "16px",
  width: "40px",
  background: theme.palette.primary.main,
  color: "white",
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  "&:hover": { background: theme.palette.primary.dark },
  [theme.breakpoints.up("lg")]: {
    position: "relative",
    top: "0",
  },
}));
