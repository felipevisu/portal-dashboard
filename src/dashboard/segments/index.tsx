import React from "react";
import { Route, Routes } from "react-router-dom";

import SegmentCreate from "./views/SegmentCreate";
import SegmentDetails from "./views/SegmentDetails";
import SegmentList from "./views/SegmentList";

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
