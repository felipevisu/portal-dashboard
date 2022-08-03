import { Container, styled } from "@mui/material";

export const Wrapper = styled("div")(() => ({
  display: "flex",
}));

export const Lateral = styled("div")(({ theme }) => ({
  "> div": {
    "&:first-of-type": {
      position: "sticky",
      top: theme.spacing(2),
    },
  },
}));

export const Content = styled(Container)(({ theme }) => ({
  flexGrow: "1",
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  paddingTop: theme.spacing(3),
}));

export const Main = styled("div")(() => ({
  flexGrow: "1",
}));

export const Footer = styled("div")(() => ({
  position: "sticky",
  bottom: 0,
}));

export const Header = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  paddingBottom: theme.spacing(3),
  "div:nth-of-type(1)": {
    flexGrow: 1,
  },
}));
