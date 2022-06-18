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

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticated) {
    return (
      <div>
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vehicles/*" element={<Vehicles />} />
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/segments/*" element={<Segments />} />
        </Routes>
      </div>
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
