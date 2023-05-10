import React from "react";

import { FormControlLabel } from "@mui/material";
import Checkbox from "@portal/components/Checkbox";

import { FilterElement } from "../types";
import { FilterDispatchFunction } from "../useFilter";

export interface FilterContentBodyNameFieldProps<K extends string = string> {
  filter: FilterElement<K>;
  onFilterPropertyChange: FilterDispatchFunction<K>;
}

export const FilterContentBodyNameField = ({
  filter,
  onFilterPropertyChange,
}: FilterContentBodyNameFieldProps) => {
  return (
    <div>
      <FormControlLabel
        control={<Checkbox checked={filter.active} />}
        label={filter.label.toUpperCase()}
        onClick={(event) => event.stopPropagation()}
        onChange={() =>
          onFilterPropertyChange({
            payload: {
              name: filter.name,
              update: {
                active: !filter.active,
              },
            },
            type: "set-property",
          })
        }
      />
    </div>
  );
};
