import React, { createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserFragment } from "@portal/graphql";
import Login from "./views/Login";

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
    <Routes>
      <Route path="" element={<Login />} />
    </Routes>
  );
};

export default Auth;
export const useUser = () => useContext(UserContext);
