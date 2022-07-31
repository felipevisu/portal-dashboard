import React from "react";
import { Route, Routes } from "react-router-dom";

import CircularLoading from "@portal/components/Circular";
import { Menu } from "@portal/components/Menu";

import AuthProvider from "./auth/authProvider";
import Auth, { useUser } from "./auth";
import Categories from "./categories";
import Home from "./home";
import Investments from "./investments";
import Providers from "./providers";
import Segments from "./segments";
import Sessions from "./sessions";
import { Lateral, Main, Wrapper } from "./styles";
import Vehicles from "./vehicles";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  if (authenticated) {
    return (
      <Wrapper>
        <Lateral>
          <Menu />
        </Lateral>
        <Main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles/*" element={<Vehicles />} />
            <Route path="/categories/*" element={<Categories />} />
            <Route path="/segments/*" element={<Segments />} />
            <Route path="/providers/*" element={<Providers />} />
            <Route path="/sessions/*" element={<Sessions />} />
            <Route path="/investments/*" element={<Investments />} />
          </Routes>
        </Main>
      </Wrapper>
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
