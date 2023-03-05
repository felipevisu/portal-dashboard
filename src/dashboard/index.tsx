import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "@portal/components/AppLayout";
import CircularLoading from "@portal/components/Circular";

import AuthProvider from "./auth/authProvider";
import Auth, { useUser } from "./auth";
import Categories from "./categories";
import Documents from "./documents";
import Home from "./home";
import Investments from "./investments";
import Providers from "./providers";
import Sessions from "./sessions";
import Settings from "./settings";
import Vehicles from "./vehicles";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticating) return <CircularLoading />;

  if (authenticated) {
    return (
      <AppLayout>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/vehicles/*" element={<Vehicles />} />
          <Route path="/providers/*" element={<Providers />} />
          <Route path="/categories/*" element={<Categories />} />
          <Route path="/documents/*" element={<Documents />} />
          <Route path="/sessions/*" element={<Sessions />} />
          <Route path="/investments/*" element={<Investments />} />
          <Route path="/settings/*" element={<Settings />} />
        </Routes>
      </AppLayout>
    );
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
