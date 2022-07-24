import React from "react";
import { Route, Routes } from "react-router-dom";

import InvestmentCreate from "./views/InvestmentCreate";
import InvestmentDetails from "./views/InvestmentDetails";
import InvestmentList from "./views/InvestmentList";

export const Investments = () => {
  return (
    <Routes>
      <Route path="/" element={<InvestmentList />} />
      <Route path="/create" element={<InvestmentCreate />} />
      <Route path="/details/:id" element={<InvestmentDetails />} />
    </Routes>
  );
};

export default Investments;
