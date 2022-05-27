import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/client";
import { ThemeProvider } from "@saleor/macaw-ui";
import App from "./App";

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
