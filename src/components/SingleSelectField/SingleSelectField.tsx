import React, { useEffect, useState } from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInputProps,
  Select,
} from "@mui/material";

interface SingleSelectFieldProps {
  choices: Array<{
    value: string;
    label: string;
  }>;
  displayValue?: string;
  disabled?: boolean;
  error?: boolean;
  label?: string | React.ReactNode;
  name?: string;
  placeholder?: string;
  value?: string;
  InputProps?: OutlinedInputProps;
  onChange: (event: any) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export const SingleSelectField: React.FC<SingleSelectFieldProps> = (props) => {
  const {
    disabled,
    error,
    label,
    choices,
    displayValue,
    value,
    onChange,
    onFocus,
    onBlur,
    name,
    placeholder,
  } = props;

  return (
    <FormControl error={error} disabled={disabled} fullWidth>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        fullWidth
        renderValue={(choiceValue) => choiceValue}
        value={value || ""}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        label={label}
        name={name}
      >
        {choices.length > 0 ? (
          choices.map((choice) => (
            <MenuItem value={choice.value} key={choice.value}>
              {choice.label}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled={true}>No results found</MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default SingleSelectField;
