import React, { createContext, useContext } from "react";
import { Route, Routes } from "react-router-dom";

import { UserFragment } from "@portal/graphql";

import Layout from "./components/Layout";
import Access from "./views/Access";
import PasswordReset from "./views/PasswordReset";

export interface ContextProps {
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  user?: UserFragment;
  authenticating: boolean;
  authenticated: boolean;
  loading: boolean;
}

export const UserContext = createContext<ContextProps>({
  login: undefined,
  logout: undefined,
  authenticating: false,
  authenticated: false,
  loading: false,
});

export const Auth = () => {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Access />} />
      </Routes>
    </Layout>
  );
};

export default Auth;
export const useUser = () => useContext(UserContext);
