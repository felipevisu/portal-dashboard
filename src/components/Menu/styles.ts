import { Box, IconButton, styled, Typography } from "@mui/material";

type MenuContent = {
  opened?: boolean;
};

type MenuItem = {
  active?: boolean;
  opened?: boolean;
};

export const MenuMain = styled("div")<MenuContent>(({ opened }) => ({
  width: opened ? "270px" : "72px",
  transition: "all ease 300ms",
  position: "relative",
}));

export const MenuContent = styled("div")<MenuContent>(({ theme }) => ({
  zIndex: "1000",
  height: "100vh",
  position: "fixed",
  overflowX: "hidden",
  overflowY: "auto",
  top: theme.spacing(2),
}));

export const MenuItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== "opened" && prop !== "active",
})<MenuItem>(({ active, theme, opened }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(2, 3),
  marginBottom: theme.spacing(2),
  color: active ? theme.palette.primary.main : theme.palette.text.secondary,
  "&:hover": { color: theme.palette.primary.main },
  background: active ? theme.palette.action.selected : "",
  borderRadius: "0 8px 8px 0",
  width: opened ? "270px" : "72px",
  transition: "all ease 300ms",
}));

export const Label = styled(Typography)(({ theme }) => ({
  color: "inherit",
  fontWeight: "600",
  paddingLeft: theme.spacing(2),
  "&:hover": { color: theme.palette.primary.main },
  position: "absolute",
  left: "70px",
  width: "230px",
}));

export const OpenClose = styled(IconButton)(({ theme }) => ({
  top: "16px",
  left: "16px",
  width: "40px",
  background: theme.palette.action.selected,
  marginBottom: theme.spacing(2),
}));
