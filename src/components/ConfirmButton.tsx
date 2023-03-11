import React, { ReactNode } from "react";

import { LoadingButton } from "@mui/lab";

export interface ConfirmButtonProps {
  onClick: () => void;
  loading: boolean;
  transitionState?: string;
  error?: boolean;
  children: ReactNode;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({
  onClick,
  children,
  error,
  loading,
}) => {
  return (
    <LoadingButton
      onClick={onClick}
      color={error ? "error" : "primary"}
      variant="contained"
      loading={loading}
    >
      {children}
    </LoadingButton>
  );
};
ConfirmButton.displayName = "ConfirmButton";
export default ConfirmButton;
