import { AuthContext } from "./context";
import { useContext } from "react";
import apolloClient from "@portal/graphql/client";

import { deleteToken } from "../../lib/auth";

import { ME } from "./queries";

export function useAuth() {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const getUser = async () => {
    if (!user) {
      const response = await apolloClient.query({ query: ME });
      const data = response.data;
      if (data.me) {
        setUser(data.me);
      } else {
        deleteToken();
      }
    }
    setLoading(false);
  };

  const logout = () => {
    deleteToken();
    setUser(undefined);
  };

  return { user, setUser, loading, getUser, logout };
}

export default useAuth;
