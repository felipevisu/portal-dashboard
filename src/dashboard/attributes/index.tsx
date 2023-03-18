import React from "react";
import { Route, Routes } from "react-router-dom";

import AttributeCreate from "./views/AttributeCreate";
import AttributeDetails from "./views/AttributeDetails";
import AttributeList from "./views/AttributeList";

export const Attributes = () => {
  return (
    <Routes>
      <Route path="/" element={<AttributeList />} />
      <Route path="/create" element={<AttributeCreate />} />
      <Route path="/details/:id" element={<AttributeDetails />} />
    </Routes>
  );
};

export default Attributes;
