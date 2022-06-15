import React from "react";
import { Routes, Route } from "react-router-dom";
import VehicleList from "./views/VehicleList";
import VehicleCreate from "./views/VehicleCreate";
import VehicleDetails from "./views/VehicleDetails";

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
