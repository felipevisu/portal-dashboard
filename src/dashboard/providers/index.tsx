import React from "react";
import { Route, Routes } from "react-router-dom";

import DocumentCreate from "./views/DocumentCreate";
import ProviderCreate from "./views/ProviderCreate";
import ProviderDetails from "./views/ProviderDetails";
import ProviderList from "./views/ProviderList";

export const Providers = () => {
  return (
    <Routes>
      <Route path="/" element={<ProviderList />} />
      <Route path="/create" element={<ProviderCreate />} />
      <Route path="/details/:id/*" element={<ProviderDetails />} />
      <Route
        path="/details/:id/documents/create"
        element={<DocumentCreate />}
      />
    </Routes>
  );
};

export default Providers;
