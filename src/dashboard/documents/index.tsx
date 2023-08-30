import React from "react";
import { Route, Routes } from "react-router-dom";

import DocumentDetails from "./views/DocumentDetails";
import DocumentList from "./views/DocumentList";

export const Documents = () => {
  return (
    <Routes>
      <Route path="/" element={<DocumentList />} />
      <Route path="/details/:id/" element={<DocumentDetails />} />
    </Routes>
  );
};

export default Documents;
