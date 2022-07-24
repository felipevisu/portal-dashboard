import React from "react";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";

interface ItemDeleteDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

export const ItemDeleteDialog = ({
  onClose,
  onConfirm,
  isOpen,
}: ItemDeleteDialogProps) => {
  return (
    <ActionDialog
      title="Excluir item"
      onClose={onClose}
      onConfirm={onConfirm}
      open={isOpen}
    >
      <DialogContentText>
        Esta ação é irreversível, deseja mesmo continuar?
      </DialogContentText>
    </ActionDialog>
  );
};

export default ItemDeleteDialog;
