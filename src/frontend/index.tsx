import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./home";
import Investments from "./investments";
import Providers from "./providers";
import Sessions from "./sessions";
import Vehicles from "./vehicles";

export const Dashboard = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/veiculos/*" element={<Vehicles />} />
      <Route path="/fornecedores/*" element={<Providers />} />
      <Route path="/investimentos/*" element={<Investments />} />
      <Route path="/sessoes/*" element={<Sessions />} />
    </Routes>
  );
};

export default Dashboard;
