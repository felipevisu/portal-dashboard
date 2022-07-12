import React from "react";

import {
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
  FormHelperText,
} from "@mui/material";

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  "checkedIcon" | "color" | "icon" | "indeterminateIcon" | "classes" | "onClick"
> & {
  disableClickPropagation?: boolean;
  helperText?: string;
  error?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ helperText, ...props }) => {
  const { disableClickPropagation, ...rest } = props;

  return (
    <>
      <MuiCheckbox
        {...rest}
        onClick={
          disableClickPropagation
            ? (event) => event.stopPropagation()
            : undefined
        }
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </>
  );
};
Checkbox.displayName = "Checkbox";
export default Checkbox;
