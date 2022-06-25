import CircularLoading from "@portal/components/Circular";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth, { useUser } from "./auth";
import AuthProvider from "./auth/authProvider";
import Categories from "./categories";
import Home from "./home";
import Menu from "./menu";
import Segments from "./segments";
import Vehicles from "./vehicles";
import Providers from "./providers";
import Sessions from "./sessions";
import { Box } from "@mui/material";

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
