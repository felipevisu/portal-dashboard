import React from "react";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ChangeEvent } from "@portal/types";

import Checkbox from "../Checkbox";

interface MultiSelectFieldProps {
  choices: Array<{
    value: string;
    label: string;
  }>;
  disabled?: boolean;
  error?: boolean;
  label?: string;
  name?: string;
  value?: string[];
  onChange: (event: ChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const MultiSelectField: React.FC<MultiSelectFieldProps> = (props) => {
  const {
    disabled,
    error,
    label,
    choices,
    value,
    onChange,
    onFocus,
    onBlur,
    name,
  } = props;

  return (
    <FormControl error={error} disabled={disabled} fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        multiple
        fullWidth
        renderValue={(choiceValues) => (choiceValues as string[]).join(", ")}
        value={value}
        name={name}
        label={label}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {choices.length > 0 ? (
          choices.map((choice) => {
            const isSelected = !!value.find(
              (selectedChoice) => selectedChoice === choice.value
            );

            return (
              <MenuItem value={choice.value} key={choice.value}>
                <Checkbox
                  checked={isSelected}
                  disableRipple={true}
                  disableTouchRipple={true}
                />
                <span>{choice.label}</span>
              </MenuItem>
            );
          })
        ) : (
          <MenuItem disabled={true}>No results found</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};
MultiSelectField.defaultProps = {
  value: [],
};

MultiSelectField.displayName = "MultiSelectField";
export default MultiSelectField;
