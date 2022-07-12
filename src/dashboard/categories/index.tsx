import React from "react";
import { Route, Routes } from "react-router-dom";

import CategoryCreate from "./views/CategoryCreate";
import CategoryDetails from "./views/CategoryDetails";
import CategoryList from "./views/CategoryList";

export const Categories = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoryList />} />
      <Route path="/create" element={<CategoryCreate />} />
      <Route path="/details/:id" element={<CategoryDetails />} />
    </Routes>
  );
};

export default Categories;
