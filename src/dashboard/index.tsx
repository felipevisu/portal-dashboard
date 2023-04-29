import React from "react";
import { Route, Routes } from "react-router-dom";

import AppLayout from "@portal/components/AppLayout";
import CircularLoading from "@portal/components/Circular";

import AuthProvider from "./auth/authProvider";
import Attributes from "./attributes";
import Auth, { useUser } from "./auth";
import Categories from "./categories";
import Channels from "./channels";
import Documents from "./documents";
import Entries from "./entries";
import Home from "./home";
import Investments from "./investments";
import Plugins from "./plugins";
import Sessions from "./sessions";
import Settings from "./settings";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticating) return <CircularLoading />;

  if (authenticated) {
    return (
      <AppLayout>
        <Routes>
          <Route path="/*" element={<Home />} />
          <Route path="/entries/:entry/*" element={<Entries />} />
          <Route path="/documents/*" element={<Documents />} />
          <Route path="/activities/*" element={<Categories />} />
          <Route path="/sessions/*" element={<Sessions />} />
          <Route path="/investments/*" element={<Investments />} />
          <Route path="/settings/*" element={<Settings />} />
          <Route path="/plugins/*" element={<Plugins />} />
          <Route path="/attributes/*" element={<Attributes />} />
          <Route path="/channels/*" element={<Channels />} />
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
