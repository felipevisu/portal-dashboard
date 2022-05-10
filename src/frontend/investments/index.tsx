import React from "react";
import { Routes, Route } from "react-router-dom";
import InvestmentList from "./views/InvestmentList";

export const Investments = () => {
  return (
    <Routes>
      <Route path="/" element={<InvestmentList />} />
    </Routes>
  );
};

export default Investments;
