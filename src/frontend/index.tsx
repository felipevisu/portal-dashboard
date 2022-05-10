import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./home";
import Providers from "./providers";
import Vehicles from "./vehicles";
import Investments from "./investments";
import Sessions from "./sessions";

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
