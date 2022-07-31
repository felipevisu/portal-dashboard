import { Box, IconButton, styled, Typography } from "@mui/material";

interface MenuItem {
  active?: boolean;
}

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
  "&:hover": { color: theme.palette.primary.main },
  paddingLeft: theme.spacing(2),
}));

export const OpenClose = styled(IconButton)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: "white",
  marginLeft: theme.spacing(2),
  marginTop: theme.spacing(1),
  "&:hover": { background: theme.palette.primary.dark },
}));
