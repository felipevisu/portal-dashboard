import React from "react";

import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FilterOpts } from "@portal/types";

import DateRangeFilter from "./DateRangeFilter";
import MultipleFilter from "./MultipleFilter";
import RadioFilter from "./RadioFilter";

export type DateRange = { Lte?: string; Gte: string };
type Value = string | string[] | DateRange;

export interface FilterItemProps {
  filter: FilterOpts;
  onChange: ({ name, value }) => void;
  value: Value;
}

const filterMap = {
  radio: RadioFilter,
  multiple: MultipleFilter,
  daterange: DateRangeFilter,
};

const FilterItem = ({ filter, onChange, value }: FilterItemProps) => {
  const Filter = filterMap[filter.type];

  return (
    <Accordion disableGutters>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={filter.name}
        id={filter.name}
      >
        <Typography>{filter.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Filter filter={filter} onChange={onChange} value={value} />
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterItem;
