import React from "react";

import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import FormSpacer from "@portal/components/FormSpacer";
import { splitDateTime } from "@portal/misc";

import { FieldType, FilterFieldBaseProps } from "../types";

import { getDateFilterValue } from "./utils";

type FilterDateTimeFieldProps = FilterFieldBaseProps<string, FieldType.date>;

export const FilterDateField = ({
  filter,
  onFilterPropertyChange,
}: FilterDateTimeFieldProps) => {
  const handleChange = (value: string[]) =>
    onFilterPropertyChange({
      payload: {
        name: filter.name,
        update: {
          value,
        },
      },
      type: "set-property",
    });

  return (
    <>
      <FormControl fullWidth>
        <FormLabel>De</FormLabel>
        <TextField
          fullWidth
          name={filter.name + "_min"}
          InputProps={{
            type: "date",
          }}
          value={splitDateTime(filter.value[0]).date}
          onChange={(event) => {
            const value = getDateFilterValue(event.target.value);
            handleChange([value, filter.value[1]]);
          }}
          sx={{ my: 1 }}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel>Até</FormLabel>
        <TextField
          fullWidth
          name={filter.name + "_max"}
          InputProps={{
            type: "date",
          }}
          value={splitDateTime(filter.value[1]).date}
          onChange={(event) => {
            const value = getDateFilterValue(event.target.value);
            handleChange([filter.value[0], value]);
          }}
          sx={{ my: 1 }}
        />
      </FormControl>
    </>
  );
};

export default FilterDateField;
