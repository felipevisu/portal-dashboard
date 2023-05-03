import React from "react";
import { Route, Routes } from "react-router-dom";

import DocumentCreate from "../documents/views/DocumentCreate";

import EntryCreate from "./views/EntryCreate";
import EntryDetails from "./views/EntryDetails/EntryDetails";
import EntryList from "./views/EntryList";

export const Entries = () => {
  return (
    <Routes>
      <Route path="/" element={<EntryList />} />
      <Route path="/create" element={<EntryCreate />} />
      <Route path="/details/:id" element={<EntryDetails />} />
      <Route
        path="/details/:id/documents/create"
        element={<DocumentCreate />}
      />
    </Routes>
  );
};

export default Entries;
