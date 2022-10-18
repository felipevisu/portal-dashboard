import React from "react";
import i18n from "i18next";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";

import { BacklinkProvider } from "./components/Backlink/context";
import { SavebarProvider } from "./components/Savebar/context";
import client from "./graphql/client";
import pt from "./lang/pt.json";
import App from "./App";
import theme from "./theme";

import "./styles.css";

i18n.use(initReactI18next).init({
  resources: {
    pt: {
      translation: pt,
    },
  },
  lng: "pt",
  fallbackLng: "pt",
});

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
