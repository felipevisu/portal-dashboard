import React from "react";
import { Route, Routes } from "react-router-dom";

import VehicleList from "./views/VehicleList";

export const Vehicles = () => {
  return (
    <Routes>
      <Route path="/" element={<VehicleList />} />
    </Routes>
  );
};

export default Vehicles;
