import React from "react";
import { Route, Routes } from "react-router-dom";

import { Box } from "@mui/material";
import CircularLoading from "@portal/components/Circular";

import AuthProvider from "./auth/authProvider";
import Auth, { useUser } from "./auth";
import Categories from "./categories";
import Home from "./home";
import Investments from "./investments";
import Menu from "./menu";
import Providers from "./providers";
import Segments from "./segments";
import Sessions from "./sessions";
import Vehicles from "./vehicles";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticated) {
    return (
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
          paddingTop: 3,
        }}
      >
        <Box>
          <Menu />
        </Box>
        <Box sx={{ flexGrow: "1", position: "relative" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles/*" element={<Vehicles />} />
            <Route path="/categories/*" element={<Categories />} />
            <Route path="/segments/*" element={<Segments />} />
            <Route path="/providers/*" element={<Providers />} />
            <Route path="/sessions/*" element={<Sessions />} />
            <Route path="/investments/*" element={<Investments />} />
          </Routes>
        </Box>
      </Box>
    );
  }

  if (authenticating) return <CircularLoading />;

  return <Auth />;
};

export const Dashboard = () => {
  return (
    <AuthProvider>
      <RoutesComponent />
    </AuthProvider>
  );
};

export default Dashboard;
