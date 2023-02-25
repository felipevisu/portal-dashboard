import React from "react";

import { useBacklink } from "../Backlink/context";
import { Menu } from "../Menu";
import { useSavebar } from "../Savebar/context";
import { UserMenu } from "../UserMenu";

import { Content, Footer, Header, Lateral, Main, Wrapper } from "./styles";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const appHeaderAnchor = useBacklink();
  const appFooterAnchor = useSavebar();

  return (
    <Wrapper>
      <Lateral>
        <Menu />
      </Lateral>
      <Content maxWidth="xl">
        <Header>
          <div ref={appHeaderAnchor} />
          <UserMenu />
        </Header>
        <Main>{children}</Main>
        <Footer>
          <div ref={appFooterAnchor} />
        </Footer>
      </Content>
    </Wrapper>
  );
};

export default AppLayout;
