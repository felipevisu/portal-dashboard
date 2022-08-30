import React from "react";

import { Checkbox, FormControlLabel } from "@mui/material";

interface ControledCheckboxProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: any) => void;
}

export const ControledCheckbox = ({
  label,
  name,
  checked,
  onChange,
}: ControledCheckboxProps) => {
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

export default ControledCheckbox;