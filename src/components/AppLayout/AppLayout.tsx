import React, { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";

import { Menu as Hamburg } from "@mui/icons-material";
import { Backdrop } from "@mui/material";

import { useBacklink } from "../Backlink/context";
import { Menu } from "../Menu";
import { MenuButton } from "../Menu/styles";
import { useSavebar } from "../Savebar/context";
import { UserMenu } from "../UserMenu";

import { Content, Footer, Header, Lateral, Main, Wrapper } from "./styles";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [, setBackLinkAnchor] = useBacklink();
  const [, setAppFooterAnchor] = useSavebar();
  const [opened, setOpened] = useState(false);
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
        <Menu opened={opened} />
      </Lateral>
      <Content maxWidth="xl">
        <Header>
          <MenuButton onClick={() => setOpened(!opened)} aria-label="delete">
            <Hamburg fontSize="medium" />
          </MenuButton>
          <div ref={backLinkRef} />
          <UserMenu />
        </Header>
        <Main>{children}</Main>
        <Footer>
          <div ref={appFooterAnchor} />
        </Footer>
      </Content>
      <Backdrop open={opened} onClick={() => setOpened(false)} />
    </Wrapper>
  );
};

export default AppLayout;
