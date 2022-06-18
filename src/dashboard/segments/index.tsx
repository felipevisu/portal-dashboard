import React from "react";
import { Routes, Route } from "react-router-dom";
import SegmentList from "./views/SegmentList";
import SegmentCreate from "./views/SegmentCreate";
import SegmentDetails from "./views/SegmentDetails";

export const Segments = () => {
  return (
    <Routes>
      <Route path="/" element={<SegmentList />} />
      <Route path="/create" element={<SegmentCreate />} />
      <Route path="/details/:id" element={<SegmentDetails />} />
    </Routes>
  );
};

export default Segments;
