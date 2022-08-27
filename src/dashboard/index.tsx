import React from "react";
import { Route, Routes } from "react-router-dom";

import { useBacklink } from "@portal/components/Backlink/context";
import CircularLoading from "@portal/components/Circular";
import { Menu } from "@portal/components/Menu";
import { useSavebar } from "@portal/components/Savebar/context";
import { UserMenu } from "@portal/components/UserMenu";

import AuthProvider from "./auth/authProvider";
import Auth, { useUser } from "./auth";
import Categories from "./categories";
import Documents from "./documents";
import Home from "./home";
import Investments from "./investments";
import Providers from "./providers";
import Segments from "./segments";
import Sessions from "./sessions";
import { Content, Footer, Header, Lateral, Main, Wrapper } from "./styles";
import Vehicles from "./vehicles";

const RoutesComponent = () => {
  const { authenticated, authenticating } = useUser();

  const appHeaderAnchor = useBacklink();
  const appFooterAnchor = useSavebar();

  if (authenticated) {
    return (
      <Wrapper>
        <Lateral>
          <Menu />
        </Lateral>
        <Content>
          <Header>
            <div ref={appHeaderAnchor} />
            <UserMenu />
          </Header>
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vehicles/*" element={<Vehicles />} />
              <Route path="/categories/*" element={<Categories />} />
              <Route path="/segments/*" element={<Segments />} />
              <Route path="/providers/*" element={<Providers />} />
              <Route path="/documents/*" element={<Documents />} />
              <Route path="/sessions/*" element={<Sessions />} />
              <Route path="/investments/*" element={<Investments />} />
            </Routes>
          </Main>
          <Footer>
            <div ref={appFooterAnchor} />
          </Footer>
        </Content>
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
