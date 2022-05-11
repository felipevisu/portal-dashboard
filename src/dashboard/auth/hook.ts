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

  const meQuery = useMeQuery({ client: apolloClient });

  useEffect(() => {
    if (meQuery?.data?.me) {
      setUser(meQuery.data.me);
      setAuthenticated(true);
    }
  }, [meQuery]);

  const tokenAuth = useTokenAuthMutation({
    client: apolloClient,
  });

  const handleLogin = async (email: string, password: string) => {
    const login = tokenAuth[0];
    try {
      const response = await login({ variables: { email, password } });
      if (response && !response.data.tokenAuth.errors.length) {
        setToken(response.data.tokenAuth.token);
        setUser(response.data.tokenAuth.user);
        setAuthenticated(true);
      } else {
        setError("loginError");
      }
      return response.data.tokenAuth;
    } catch (error) {
      setError("serverError");
    }
  };

  const handleLogout = () => {
    deleteToken();
    setUser(undefined);
    setAuthenticated(false);
  };

  return {
    login: handleLogin,
    logout: handleLogout,
    authenticated: authenticated,
    authenticating: (authenticating && !error) || meQuery.loading,
    user,
    error,
  };
}

export default useAuthProvider;
