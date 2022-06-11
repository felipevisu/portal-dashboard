import React from "react";
import { styled } from "@mui/material";

const Footer = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(4),
}));

const MainPanel = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
  display: "flex",
  flexDirection: "column",
  height: "98vh",
  justifyContent: "center",
  width: "100%",
}));

const Content = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: 328,
  },
  "@media (min-width: 1440px)": {
    width: 380,
  },
  margin: "auto",
  width: "100%",
}));
interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <MainPanel>
      <Content>{children}</Content>
      <Footer>©2022 Portal. All rights reserved</Footer>
    </MainPanel>
  );
};

Layout.displayName = "Layout";
export default Layout;
