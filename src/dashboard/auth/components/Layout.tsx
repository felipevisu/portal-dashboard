import React from "react";

import { styled } from "@mui/material";

const MainPanel = styled("div")(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  justifyContent: "center",
  width: "100%",
}));

const Content = styled("div")(({ theme }) => ({
  margin: "auto",
  width: "100%",
  maxWidth: "420px",
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <MainPanel>
      <Content>{children}</Content>
    </MainPanel>
  );
};

Layout.displayName = "Layout";
export default Layout;
