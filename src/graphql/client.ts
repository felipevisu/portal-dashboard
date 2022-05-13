import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getToken } from "../lib/auth";

const httpLink = createHttpLink({
  uri: "https://portaldatransparencia.herokuapp.com/graphql/",
});

const authLink = setContext((_, { headers }) => {
  let token: string | null;

  if (typeof window !== "undefined") {
    token = getToken();
  } else {
    token = null;
  }

  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]),
  cache: new InMemoryCache(),
});

export default apolloClient;
