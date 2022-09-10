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
      if (filter.type === "radio") {
        const value = searchParams.get(filter.slug);
        if (value) {
          filters[filter.slug] = value;
        }
      }
      if (filter.type === "daterange") {
        const gte = searchParams.get(filter.slug + "_Gte");
        const lte = searchParams.get(filter.slug + "_Lte");
        if (gte || lte) {
          filters[filter.slug] = { Gte: gte, Lte: lte };
        }
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
    const params = {};
    for (const filter of filterOpts) {
      const value = applyedFilters[filter.slug];
      const slug = filter.slug;
      if (value) {
        if (filter.type === "radio") {
          params[slug] = value;
        }
        if (filter.type === "daterange") {
          const gte = value.Gte;
          const lte = value.Lte;
          if (gte) params[slug + "_Gte"] = gte.toISOString().split("T")[0];
          if (lte) params[slug + "_Lte"] = lte.toISOString().split("T")[0];
        }
      }
    }
    setSearchParams({ ...params });
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
