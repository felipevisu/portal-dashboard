import React, { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";

import { useBacklink } from "../Backlink/context";
import { Menu } from "../Menu";
import { useSavebar } from "../Savebar/context";
import { UserMenu } from "../UserMenu";

import { Content, Footer, Header, Lateral, Main, Wrapper } from "./styles";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [, setBackLinkAnchor] = useBacklink();
  const [, setAppFooterAnchor] = useSavebar();
  const backLinkRef = useRef();
  const appFooterAnchor = useRef();

  useEffect(() => {
    setBackLinkAnchor(backLinkRef);
    setAppFooterAnchor(appFooterAnchor);
  }, []);

  return (
    <Wrapper>
      <ToastContainer />
      <Lateral>
        <Menu />
      </Lateral>
      <Content maxWidth="xl">
        <Header>
          <div ref={backLinkRef} />
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
