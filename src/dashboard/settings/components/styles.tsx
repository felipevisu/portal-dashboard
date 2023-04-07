import { Link } from "react-router-dom";

import { Paper, styled } from "@mui/material";

export const SettingsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr 1fr 1fr",
}));

export const SettingsLink = styled(Link)(() => ({
  borderRadius: 8,
}));

export const NavigationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
}));
