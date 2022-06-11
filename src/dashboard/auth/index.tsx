import React, { createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserFragment } from "@portal/graphql";
import Login from "./views/Login";
import Layout from "./components/Layout";

export interface ContextProps {
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  user?: UserFragment;
  authenticating: boolean;
  authenticated: boolean;
}

export const UserContext = createContext<ContextProps>({
  login: undefined,
  logout: undefined,
  authenticating: false,
  authenticated: false,
});

export const Auth = () => {
  return (
    <Layout>
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    </Layout>
  );
};

export default Auth;
export const useUser = () => useContext(UserContext);
