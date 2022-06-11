import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DialogProps } from "@portal/types";
import React from "react";

import DialogButtons, { ActionDialogVariant, Size } from "./DialogButtons";

export interface ActionDialogProps extends DialogProps {
  children?: React.ReactNode;
  confirmButtonLabel?: string;
  disabled?: boolean;
  maxWidth?: Size | false;
  title: string;
  variant?: ActionDialogVariant;
  onConfirm();
}

const ActionDialog: React.FC<ActionDialogProps> = (props) => {
  const { children, open, title, onClose, variant, maxWidth, ...rest } = props;

  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth={maxWidth}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogButtons {...rest} onClose={onClose} variant={variant} />
    </Dialog>
  );
};

ActionDialog.defaultProps = {
  maxWidth: "xs",
};

ActionDialog.displayName = "ActionDialog";
export default ActionDialog;
