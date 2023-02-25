import React from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  return (
    <ActionDialog
      title={t("investment.delete")}
      onClose={onClose}
      onConfirm={onConfirm}
      open={isOpen}
    >
      <DialogContentText>{t("confirmActionMessage")}</DialogContentText>
    </ActionDialog>
  );
};

export default ItemDeleteDialog;
