import React from "react";
import i18n from "i18next";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { BrowserRouter } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "@mui/material";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import { BacklinkProvider } from "./components/Backlink/context";
import { SavebarProvider } from "./components/Savebar/context";
import client from "./graphql/client";
import pt from "./lang/pt.json";
import Dashboard from "./dashboard";
import theme from "./theme";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS,
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

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
            <Dashboard />
          </SavebarProvider>
        </BacklinkProvider>
      </ThemeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
