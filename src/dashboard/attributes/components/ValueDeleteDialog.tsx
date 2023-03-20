import React from "react";
import { useTranslation } from "react-i18next";

import { DialogContentText } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";

interface ValueDeleteDialogProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

export const ValueDeleteDialog = ({
  onClose,
  onConfirm,
  isOpen,
}: ValueDeleteDialogProps) => {
  const { t } = useTranslation();

  return (
    <ActionDialog
      title={t("attribute.values.delete")}
      onClose={onClose}
      onConfirm={onConfirm}
      open={isOpen}
    >
      <DialogContentText>{t("confirmActionMessage")}</DialogContentText>
    </ActionDialog>
  );
};

export default ValueDeleteDialog;
