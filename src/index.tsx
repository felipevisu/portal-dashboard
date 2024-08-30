import React from "react";
import i18n from "i18next";
import { createRoot } from "react-dom/client";
import { initReactI18next } from "react-i18next";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ApolloProvider } from "@apollo/client";
import { CssBaseline } from "@mui/material";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";

import { BacklinkProvider } from "./components/Backlink/context";
import { SavebarProvider } from "./components/Savebar/context";
import BackgroundTasksProvider from "./containers/BackgroundTasks/BackgroundTasksProvider";
import PasswordReset from "./dashboard/auth/views/PasswordReset";
import client from "./graphql/client";
import pt from "./lang/pt.json";
import { DocumentPublicUpdate } from "./website/documents/views";
import Dashboard from "./dashboard";
import { ColorModeProvider } from "./theme";

import "react-toastify/dist/ReactToastify.css";
import "./styles.css";

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DNS,
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

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

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/reset" element={<PasswordReset />} />
      <Route
        path="/update_document/:id/:token/*"
        element={<DocumentPublicUpdate />}
      />
    </Routes>
  );
};

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <ColorModeProvider>
        <CssBaseline />
        <BackgroundTasksProvider>
          <BacklinkProvider>
            <SavebarProvider>
              <RoutesComponent />
            </SavebarProvider>
          </BacklinkProvider>
        </BackgroundTasksProvider>
      </ColorModeProvider>
    </BrowserRouter>
  </ApolloProvider>
);
