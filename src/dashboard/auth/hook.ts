import { useEffect, useState } from "react";

import { ApolloClient, useApolloClient } from "@apollo/client";
import { useMeQuery, useTokenCreateMutation } from "@portal/graphql";
import { deleteToken, setToken } from "@portal/lib/auth";

export interface UseAuthProviderOpts {
  apolloClient: ApolloClient<any>;
}

export function useAuthProvider({ apolloClient }) {
  const client = useApolloClient();
  const [error, setError] = useState<string | undefined>();
  const [user, setUser] = useState(undefined);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authenticating, setAuthenticating] = useState<boolean>(true);

  const meQuery = useMeQuery({
    client: apolloClient,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (meQuery.called && !meQuery.loading) setAuthenticating(false);
    if (meQuery?.data?.me) {
      setAuthenticated(true);
      setUser(meQuery.data.me);
    }
  }, [meQuery]);

  const [tokenCreate, tokenCreateResult] = useTokenCreateMutation({
    client: apolloClient,
  });

  useEffect(() => {
    if (tokenCreateResult.data?.tokenCreate?.token) {
      setToken(tokenCreateResult.data.tokenCreate.token);
      document.location.reload();
    }
  }, [tokenCreateResult]);

  useEffect(() => {
    if (authenticated) apolloClient.resetStore();
  }, [authenticated]);

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
    client.stop();
    client.clearStore();
    document.location.reload();
    window.location.pathname = "/";
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    authenticated: !!(authenticated && user),
    authenticating: (meQuery.loading || authenticating) && !authenticated,
    loading: tokenCreateResult.loading || meQuery.loading,
    user,
    error,
  };
}

export default useAuthProvider;
