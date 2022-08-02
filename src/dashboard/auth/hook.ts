import { useEffect, useState } from "react";

import { ApolloClient } from "@apollo/client";
import { useMeQuery, useTokenAuthMutation } from "@portal/graphql";
import { deleteToken, setToken } from "@portal/lib/auth";

export interface UseAuthProviderOpts {
  apolloClient: ApolloClient<any>;
}

export function useAuthProvider({ apolloClient }) {
  const [error, setError] = useState<string | undefined>();
  const [user, setUser] = useState(undefined);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authenticating] = useState<boolean>(false);

  useEffect(() => {
    if (authenticating && error) {
      setError(undefined);
    }
  }, [authenticating]);

  const meQuery = useMeQuery({
    client: apolloClient,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (meQuery?.data?.me) {
      setUser(meQuery.data.me);
      setAuthenticated(true);
    }
  }, [meQuery]);

  const [tokenAuth, tokenAuthResult] = useTokenAuthMutation({
    client: apolloClient,
  });

  useEffect(() => {
    if (tokenAuthResult.data?.tokenAuth?.token) {
      setToken(tokenAuthResult.data.tokenAuth.token);
      setAuthenticated(true);
    }
    if (tokenAuthResult.data?.tokenAuth?.user) {
      setUser(tokenAuthResult.data.tokenAuth.user);
    }
  }, [tokenAuthResult]);

  const handleLogin = async (email: string, password: string) => {
    try {
      await tokenAuth({ variables: { email, password } });
    } catch (error) {
      setError("serverError");
    }
  };

  const handleLogout = () => {
    deleteToken();
    setUser(undefined);
    setAuthenticated(false);
    document.location.reload();
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    authenticated: !!(authenticated && user),
    authenticating: (authenticating && !error) || meQuery.loading,
    loading: tokenAuthResult.loading,
    user,
    error,
  };
}

export default useAuthProvider;
