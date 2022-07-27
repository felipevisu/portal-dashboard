import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getToken } from "../lib/auth";

export const link = createUploadLink({
  uri: process.env.REACT_APP_API_URI,
  headers: {
    authorization: getToken() ? `JWT ${getToken()}` : "",
  },
});

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default apolloClient;
