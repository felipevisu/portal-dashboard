import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getToken } from "../lib/auth";

export const link = createUploadLink({
  uri: import.meta.env.VITE_API_URI,
  headers: {
    authorization: `JWT ${getToken()}`,
  },
});

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default apolloClient;
