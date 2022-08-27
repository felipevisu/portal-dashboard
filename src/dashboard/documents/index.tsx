import React from "react";
import { Route, Routes } from "react-router-dom";

import DocumentList from "./views/DocumentList";

export const Documents = () => {
  return (
    <Routes>
      <Route path="/" element={<DocumentList />} />
    </Routes>
  );
};

export default Documents;
