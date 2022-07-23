import React from "react";
import { Route, Routes } from "react-router-dom";

import InvestmentCreate from "./views/InvestmentCreate";
import InvestmentList from "./views/InvestmentList";

export const Investments = () => {
  return (
    <Routes>
      <Route path="/" element={<InvestmentList />} />
      <Route path="/create" element={<InvestmentCreate />} />
    </Routes>
  );
};

export default Investments;
