import React from "react";

import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { FilterOpts } from "@portal/types";

interface RadioFilterProps {
  filter: FilterOpts;
  value: string;
  onChange: ({ name, value }) => void;
}

export const RadioFilter = ({ filter, value, onChange }: RadioFilterProps) => {
  const handleChange = (e) => {
    onChange({ name: filter.slug, value: e.target.value });
  };

  return (
    <RadioGroup>
      {filter.choices.map((choice) => (
        <FormControlLabel
          key={choice.value}
          value={choice.value}
          checked={value === choice.value}
          name={filter.name}
          control={<Radio />}
          label={choice.label}
          onClick={handleChange}
        />
      ))}
    </RadioGroup>
  );
};

export default RadioFilter;
