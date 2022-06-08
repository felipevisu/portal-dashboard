import {
  FormHelperText,
  Checkbox as MuiCheckbox,
  CheckboxProps as MuiCheckboxProps,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(
  () => ({
    error: {
      color: "red",
    },
  }),
  { name: "Checkbox" }
);

export type CheckboxProps = Omit<
  MuiCheckboxProps,
  "checkedIcon" | "color" | "icon" | "indeterminateIcon" | "classes" | "onClick"
> & {
  disableClickPropagation?: boolean;
  helperText?: string;
  error?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({ helperText, error, ...props }) => {
  const { disableClickPropagation, ...rest } = props;
  const classes = useStyles();

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
      {helperText && (
        <FormHelperText classes={{ root: error && classes.error }}>
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};
Checkbox.displayName = "Checkbox";
export default Checkbox;
