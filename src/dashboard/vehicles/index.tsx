import React from "react";
import { Routes, Route } from "react-router-dom";
import VehicleList from "./views/VehicleList";
import VehicleCreate from "./views/VehicleCreate";

export const Vehicles = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
      <Route path="/create" element={<VehicleCreate />} />
    </Routes>
  );
};

export default Vehicles;
