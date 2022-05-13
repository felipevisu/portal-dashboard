import { Container } from "@portal/UI";
import React from "react";
import { Routes, Route } from "react-router-dom";
import Auth, { useUser } from "./auth";
import AuthProvider from "./auth/authProvider";
import Categories from "./categories";
import Home from "./home";
import Menu from "./menu";
import Vehicles from "./vehicles";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticated) {
    return (
      <div className="flex py-4">
        <Menu />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles/*" element={<Vehicles />} />
            <Route path="/categories/*" element={<Categories />} />
          </Routes>
        </div>
      </div>
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
      <Container>
        <RoutesComponent />
      </Container>
    </AuthProvider>
  );
};

export default Dashboard;
