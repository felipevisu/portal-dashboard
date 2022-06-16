import { Divider, Paper } from "@mui/material";
import React from "react";
import FilterContentHeader from "./FiltercontentHeader";

export const FilterContent = () => {
  return (
    <Paper elevation={8} sx={{ width: 360 }}>
      <FilterContentHeader />
      <Divider />
    </Paper>
  );
};

export default FilterContent;
