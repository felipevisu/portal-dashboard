import React from "react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogProps } from "@portal/types";

import DialogButtons, { ActionDialogVariant, Size } from "./DialogButtons";

export interface ActionDialogProps extends DialogProps {
  children?: React.ReactNode;
  confirmButtonLabel?: string;
  disabled?: boolean;
  maxWidth?: Size | false;
  title: string;
  variant?: ActionDialogVariant;
  onConfirm: () => void;
  loading?: boolean;
}

const ActionDialog: React.FC<ActionDialogProps> = (props) => {
  const {
    children,
    open,
    title,
    onClose,
    variant,
    maxWidth,
    loading = false,
    ...rest
  } = props;

  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogButtons
        {...rest}
        onClose={onClose}
        variant={variant}
        loading={loading}
      />
    </Dialog>
  );
};

ActionDialog.displayName = "ActionDialog";
export default ActionDialog;
