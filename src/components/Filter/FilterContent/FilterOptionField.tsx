import React from "react";

import { Box, FormControlLabel, Radio } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";
import { toggle } from "@portal/utils/lists";

import { FieldType, FilterFieldBaseProps } from "../types";

export const FilterOptionField = ({
  filter,
  onFilterPropertyChange,
  ...rest
}: FilterFieldBaseProps<string, FieldType.options>) => {
  const handleSelect = (value: string) =>
    onFilterPropertyChange({
      payload: {
        name: filter.name,
        update: {
          active: true,
          value: filter.multiple
            ? toggle(value, filter.value, (a, b) => a === b)
            : [value],
        },
      },
      type: "set-property",
    });

  return (
    <Box>
      {filter.options.map((option) => (
        <div key={option.value}>
          <FormControlLabel
            control={
              filter.multiple ? (
                <Checkbox
                  data-test-id={"filter-option-" + option.value}
                  checked={filter.value.includes(option.value)}
                />
              ) : (
                <Radio
                  data-test-id={"filter-option-" + option.value}
                  checked={filter.value[0] === option.value}
                  color="primary"
                />
              )
            }
            label={option.label}
            name={filter.name}
            onChange={() => handleSelect(option.value)}
          />
        </div>
      ))}
    </Box>
  );
};

export default FilterOptionField;
