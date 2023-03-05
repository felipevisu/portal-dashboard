import { Link } from "react-router-dom";

import { styled } from "@mui/material";

export const SettingsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr 1fr 1fr",
}));

export const SettingsLink = styled(Link)(({ theme }) => ({
  backgroundColor: "#fff",
  borderRadius: 8,
  transition: "all ease 300ms",
  "&:hover": {
    boxShadow: "0px 7px 36px -20px rgba(0,0,0,0.4)",
  },
}));

export const NavigationCard = styled("div")(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));
