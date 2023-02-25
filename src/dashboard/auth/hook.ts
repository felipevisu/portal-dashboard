import { useEffect, useState } from "react";

import { ApolloClient } from "@apollo/client";
import { useMeQuery, useTokenCreateMutation } from "@portal/graphql";
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

  const [tokenCreate, tokenCreateResult] = useTokenCreateMutation({
    client: apolloClient,
  });

  useEffect(() => {
    if (tokenCreateResult.data?.tokenCreate) {
      setToken(tokenCreateResult.data.tokenCreate.token);
      setAuthenticated(true);
    }
    if (tokenCreateResult.data?.tokenCreate?.user) {
      setUser(tokenCreateResult.data.tokenCreate.user);
    }
  }, [tokenCreateResult]);

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await tokenCreate({ variables: { email, password } });
      return response.data.tokenCreate;
    } catch (error) {
      setError("serverError");
    }
  };

  const handleLogout = () => {
    deleteToken();
    document.location.reload();
    window.location.pathname = "/";
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    authenticated: !!(authenticated && user),
    authenticating: (authenticating && !error) || meQuery.loading,
    loading: tokenCreateResult.loading,
    user,
    error,
  };
}

export default useAuthProvider;
