import { useApolloClient } from "@apollo/client";

import React from "react";
import useAuthProvider from "./hook";
import { UserContext } from ".";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const apolloClient = useApolloClient();
  const authProvider = useAuthProvider({ apolloClient });

  return (
    <UserContext.Provider value={authProvider}>{children}</UserContext.Provider>
  );
};

export default AuthProvider;
