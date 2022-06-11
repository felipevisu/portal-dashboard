import { Button } from "@mui/material";
import React, { ReactNode } from "react";

export interface ConfirmButtonProps {
  onClick: () => void;
  disabled: boolean;
  transitionState?: string;
  error?: boolean;
  children: ReactNode;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  children,
  error,
}) => {
  return (
    <Button
      onClick={onClick}
      color={error ? "error" : "primary"}
      variant="contained"
    >
      {children}
    </Button>
  );
};
ConfirmButton.displayName = "ConfirmButton";
export default ConfirmButton;
