import React from "react";

import { FormControlLabel, Switch } from "@mui/material";

interface ControlledSwitchProps {
  checked: boolean;
  disabled?: boolean;
  label: string | React.ReactNode;
  name: string;
  secondLabel?: string | React.ReactNode;
  uncheckedLabel?: string | React.ReactNode;
  onChange?(event: React.ChangeEvent<any>);
}

export const ControlledSwitch: React.FC<ControlledSwitchProps> = (props) => {
  const {
    checked,
    disabled,
    onChange,
    label,
    name,
    secondLabel,
    uncheckedLabel,
  } = props;

  return (
    <FormControlLabel
      control={
        <Switch
          onChange={() =>
            onChange({ target: { name, value: !checked } } as any)
          }
          checked={checked}
          color="primary"
          name={name}
        />
      }
      label={
        <div>
          {uncheckedLabel ? (
            checked ? (
              label
            ) : (
              uncheckedLabel
            )
          ) : typeof label === "string" ? (
            <span>{label}</span>
          ) : (
            label
          )}
          <div>{secondLabel || null}</div>
        </div>
      }
      disabled={disabled}
    />
  );
};
ControlledSwitch.displayName = "ControlledSwitch";
export default ControlledSwitch;
