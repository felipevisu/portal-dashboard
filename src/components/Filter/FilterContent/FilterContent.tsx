import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Paper } from "@mui/material";

import FilterContentHeader from "./FiltercontentHeader";
import FilterItem from "./FilterItem";

export const FilterContent = <F,>(filterOpts: F) => {
  const [applyedFilters, setApplyedFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = Object.keys(filterOpts);

  useEffect(() => {
    const filters = Object.keys(filterOpts);
    filters.forEach((filter) => {
      const value = searchParams.get(filter);
      if (value) {
        setApplyedFilters({
          ...applyedFilters,
          [filter]: value,
        });
      }
    });
  }, [filterOpts]);

  const handleClick = (name: string, value: string) => {
    setApplyedFilters({
      ...applyedFilters,
      [name]: value,
    });
  };

  const handleApplyFilters = () => {
    setSearchParams({ ...applyedFilters });
  };

  const handleClearFilters = () => {
    setSearchParams({});
    setApplyedFilters({});
  };

  return (
    <Paper
      elevation={4}
      sx={{ width: 360, borderRadius: "10px", overflow: "hidden" }}
    >
      <FilterContentHeader
        onClickApply={handleApplyFilters}
        onClickClear={handleClearFilters}
      />
      {filters.map((filter, key) => (
        <FilterItem
          key={key}
          name={filter}
          filter={filterOpts[filter]}
          onClick={handleClick}
          selected={applyedFilters[filter]}
        />
      ))}
    </Paper>
  );
};

export default FilterContent;
