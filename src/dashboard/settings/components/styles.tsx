import { Paper, styled } from "@mui/material";

export const SettingsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3),
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
}));

export const NavigationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(3),
  height: "100%",
}));
