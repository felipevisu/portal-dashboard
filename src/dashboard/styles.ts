import { Container, styled } from "@mui/material";

export const Wrapper = styled("div")(() => ({
  display: "flex",
}));

export const Lateral = styled("div")(() => ({
  "> div": {
    "&:first-child": {
      position: "sticky",
      top: 0,
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
