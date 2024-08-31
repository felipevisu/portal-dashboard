import React from "react";

import useAuthProvider from "./hook";
import { UserContext } from ".";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const authProvider = useAuthProvider();

  return (
    <UserContext.Provider value={authProvider}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
