import type { ButtonBaseProps } from "@mui/material";
import { ButtonBase, styled } from "@mui/material";
import React from "react";

const Button = styled(ButtonBase)(({ theme }) => ({
  "&:hover": {
    background: theme.palette.background.paper,
    color: theme.palette.primary.main,
  },
  ...theme.typography.body1,
  borderRadius: 4,
  color: theme.palette.text.secondary,
  background: theme.palette.background.paper,
  padding: theme.spacing(0.5, 2),
  fontWeight: 600,
  height: 40,
  textAlign: "center",
}));

export type LayoutButtonProps<T extends React.ElementType> = ButtonBaseProps<
  T,
  { component?: T }
>;

export const LayoutButton = <T extends React.ElementType = "button">({
  className,
  children,
  component,
  ...rest
}: LayoutButtonProps<T>) => {
  return (
    <Button component={component} className={className} {...rest}>
      {children}
    </Button>
  );
};

LayoutButton.displayName = "LayoutButton";
