import React from "react";

import { FormControl, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormSpacer from "@portal/components/FormSpacer";
import { FilterOpts } from "@portal/types";

import { DateRange } from "./FilterItem";

interface DateRangeFilterProps {
  filter: FilterOpts;
  value: DateRange;
  onChange: ({ name, value }) => void;
}
export const DateRangeFilter = ({
  filter,
  value,
  onChange,
}: DateRangeFilterProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl fullWidth>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          value={value?.Gte || ""}
          label="De"
          onChange={(val) => {
            onChange({
              name: filter.slug,
              value: {
                ...value,
                Gte: val,
              },
            });
          }}
          renderInput={(params) => <TextField {...params} error={false} />}
        />
      </FormControl>
      <FormSpacer />
      <FormControl fullWidth>
        <DatePicker
          inputFormat="DD/MM/YYYY"
          value={value?.Lte || ""}
          label="Até"
          onChange={(val) => {
            onChange({
              name: filter.slug,
              value: { ...value, Lte: val },
            });
          }}
          renderInput={(params) => <TextField {...params} error={false} />}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

export default DateRangeFilter;
