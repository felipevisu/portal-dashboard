import React from "react";

import { Checkbox, FormControlLabel } from "@mui/material";

interface ControlledCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: any) => void;
}

export const ControlledCheckbox = ({
  label,
  name,
  checked,
  onChange,
}: ControlledCheckboxProps) => {
  return (
    <FormControlLabel
      label={label}
      onChange={() =>
        onChange({
          target: { name: name, value: !checked },
        })
      }
      control={<Checkbox name={name} checked={checked} />}
    />
  );
};

export default ControlledCheckbox;
