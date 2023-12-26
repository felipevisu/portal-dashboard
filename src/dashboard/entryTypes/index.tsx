import React from "react";
import { Route, Routes } from "react-router-dom";

import EntryTypeCreate from "./views/EntryTypeCreate";
import EntryTypeDetails from "./views/EntryTypeDetails";
import EntryTypeList from "./views/EntryTypeList";

export const EntryTypes = () => {
  return (
    <Routes>
      <Route path="/" element={<EntryTypeList />} />
      <Route path="/create" element={<EntryTypeCreate />} />
      <Route path="/details/:id" element={<EntryTypeDetails />} />
    </Routes>
  );
};

export default EntryTypes;
