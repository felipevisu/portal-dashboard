import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { getToken } from "../lib/auth";

const getURI = () => {
  var host = window.location.host;
  var subdomain = host.split(".")[0];
  return (
    import.meta.env.VITE_API_URI +
    ["clientes", subdomain, "graphql"].join("/") +
    "/"
  );
};

export const link = createUploadLink({
  uri: getURI(),
  headers: {
    authorization: `JWT ${getToken()}`,
  },
});

const apolloClient = new ApolloClient({
  link: link,
  cache: new InMemoryCache(),
});

export default apolloClient;
