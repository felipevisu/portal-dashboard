import React from "react";
import { Route, Routes } from "react-router-dom";

import DocumentCreate from "../documents/views/DocumentCreate";
import DocumentDetails from "../documents/views/DocumentDetails";

import VehicleCreate from "./views/VehicleCreate";
import VehicleDetails from "./views/VehicleDetails";
import VehicleList from "./views/VehicleList";

export const Vehicles = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
      <Route path="/create" element={<VehicleCreate />} />
      <Route path="/details/:id/*" element={<VehicleDetails />} />
      <Route
        path="/details/:id/documents/create"
        element={<DocumentCreate />}
      />
      <Route
        path="/details/:id/documents/:documentId/details"
        element={<DocumentDetails />}
      />
    </Routes>
  );
};

export default Vehicles;
