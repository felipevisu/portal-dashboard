import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { Paper } from "@mui/material";
import { FilterOpts } from "@portal/types";

import FilterContentHeader from "./FiltercontentHeader";
import FilterItem from "./FilterItem";

interface FilterContentProps {
  filterOpts: FilterOpts[];
}

export const FilterContent = ({ filterOpts }: FilterContentProps) => {
  const [applyedFilters, setApplyedFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const filters = {};
    for (const filter of filterOpts) {
      const value = searchParams.get(filter.slug);
      if (value) {
        filters[filter.slug] = value;
      }
    }
    setApplyedFilters(filters);
  }, [filterOpts]);

  const handleClick = ({ name, value }) => {
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
      {filterOpts.map((filter) => (
        <FilterItem
          key={filter.slug}
          filter={filter}
          onClick={handleClick}
          value={applyedFilters[filter.slug]}
        />
      ))}
    </Paper>
  );
};

export default FilterContent;
