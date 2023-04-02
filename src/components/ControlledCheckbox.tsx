import React from "react";

import { Checkbox, FormControlLabel } from "@mui/material";

interface ControlledCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: any) => void;
  disabled?: boolean;
}

export const ControlledCheckbox = ({
  label,
  name,
  checked,
  onChange,
  disabled,
}: ControlledCheckboxProps) => {
  return (
    <FormControlLabel
      label={label}
      onChange={() =>
        onChange({
          target: { name: name, value: !checked },
        })
      }
      disabled={disabled}
      control={<Checkbox name={name} checked={checked} />}
    />
  );
};

export default ControlledCheckbox;
