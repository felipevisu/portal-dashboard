import React from "react";
import { Route, Routes } from "react-router-dom";

import VehicleCreate from "./views/VehicleCreate";
import VehicleDetails from "./views/VehicleDetails";
import VehicleList from "./views/VehicleList";

export const Vehicles = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
      <Route path="/create" element={<VehicleCreate />} />
      <Route path="/details/:id" element={<VehicleDetails />} />
    </Routes>
  );
};

export default Vehicles;
