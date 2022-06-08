import React from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: any) => ({
  footer: {
    position: "absolute",
    bottom: theme.spacing(4),
  },
  mainPanel: {
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
    background: theme.palette.background.paper,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    justifyContent: "center",
    padding: theme.spacing(5, 6, 4, 6),
    width: "100%",
  },
  mainPanelContent: {
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
  },
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classes.mainPanel}>
      <div className={classes.mainPanelContent}>{children}</div>
      <footer className={classes.footer}>
        ©2022 Portal. All rights reserved
      </footer>
    </div>
  );
};

Layout.displayName = "Layout";
export default Layout;
