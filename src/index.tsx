import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";

import { BacklinkProvider } from "./components/Backlink/context";
import { SavebarProvider } from "./components/Savebar/context";
import client from "./graphql/client";
import App from "./App";
import theme from "./theme";

import "./styles.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <BacklinkProvider>
          <SavebarProvider>
            <App />
          </SavebarProvider>
        </BacklinkProvider>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
