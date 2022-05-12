import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth, { useUser } from "./auth";
import AuthProvider from "./auth/authProvider";
import Categories from "./categories";
import Home from "./home";
import Vehicles from "./vehicles";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticated) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vehicles/*" element={<Vehicles />} />
        <Route path="/categories/*" element={<Categories />} />
      </Routes>
    );
  }

  if (authenticating) {
    return <div>Loading...</div>;
  }

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
