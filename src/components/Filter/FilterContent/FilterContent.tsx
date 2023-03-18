import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";

import { Paper } from "@mui/material";
import { FilterOpts } from "@portal/types";

import { FilterItem } from "../FilterItem";

import FilterContentHeader from "./FiltercontentHeader";

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
        filters[filter.slug] = value;
      }
      if (filter.type === "multiple") {
        const value = searchParams.getAll(filter.slug);
        filters[filter.slug] = value;
      }
      if (filter.type === "daterange") {
        const gte = searchParams.get(filter.slug + "_Gte");
        const lte = searchParams.get(filter.slug + "_Lte");
        let value = {};
        if (gte) value = { Gte: dayjs(gte) };
        if (lte) value = { ...value, Lte: dayjs(lte) };
        filters[filter.slug] = value;
      }
    }
    setApplyedFilters(filters);
  }, [filterOpts]);

  const handleChange = ({ name, value }) => {
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
        if (filter.type === "multiple") {
          params[slug] = value;
        }
        if (filter.type === "daterange") {
          if (value.Lte) params[slug + "_Lte"] = value.Lte.format("YYYY-MM-DD");
          if (value.Gte) params[slug + "_Gte"] = value.Gte.format("YYYY-MM-DD");
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
          onChange={handleChange}
          value={applyedFilters[filter.slug]}
        />
      ))}
    </Paper>
  );
};

export default FilterContent;
