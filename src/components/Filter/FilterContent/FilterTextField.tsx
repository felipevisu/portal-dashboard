import React from "react";

import { FieldType, FilterFieldBaseProps } from "../types";
import { TextField } from "@mui/material";

export type FilterTextFieldProps = FilterFieldBaseProps<
  string,
  FieldType.text | FieldType.number
> & { type: "text" | "number" };

const FilterTextField: React.FC<FilterTextFieldProps> = ({
  filter,
  type = "text",
  onFilterPropertyChange,
}) => {
  return (
    <TextField
      fullWidth
      name={filter.name}
      value={filter.value[0]}
      type={type}
      onChange={(event) =>
        onFilterPropertyChange({
          payload: {
            name: filter.name,
            update: {
              value: [event.target.value, filter.value[1]],
            },
          },
          type: "set-property",
        })
      }
    />
  );
};

FilterTextField.displayName = "FilterTextField";
export default FilterTextField;
