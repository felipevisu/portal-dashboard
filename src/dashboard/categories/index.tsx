import React from "react";
import { Routes, Route } from "react-router-dom";
import CategoryList from "./views/CategoryList";
import CategoryCreate from "./views/CategoryCreate";
import CategoryDetails from "./views/CategoryDetails";
import { Content } from "@portal/UI";

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
