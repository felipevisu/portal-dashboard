import React from "react";
import { useTranslation } from "react-i18next";

import { DialogActions } from "@mui/material";

import BackButton from "./BackButton";
import ConfirmButton from "./ConfirmButton";

export type ActionDialogVariant = "default" | "delete" | "info";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface DialogButtonsProps {
  onClose: () => void;
  confirmButtonLabel?: string;
  confirmButtonState?: string;
  disabled?: boolean;
  variant?: ActionDialogVariant;
  children?: React.ReactNode;
  showBackButton?: boolean;
  onConfirm: () => void;
  loading: boolean;
}

const DialogButtons: React.FC<DialogButtonsProps> = (props) => {
  const { t } = useTranslation();
  const {
    confirmButtonLabel,
    confirmButtonState,
    variant,
    onConfirm,
    onClose,
    children,
    showBackButton = true,
    loading = false,
  } = props;

  return (
    <DialogActions sx={{ padding: 3 }}>
      {children}
      {showBackButton && <BackButton onClick={onClose} />}
      {variant !== "info" && (
        <ConfirmButton
          loading={loading}
          transitionState={confirmButtonState}
          onClick={onConfirm}
          error={variant === "delete"}
        >
          {confirmButtonLabel ||
            (variant === "delete" ? t("delete") : t("confirm"))}
        </ConfirmButton>
      )}
    </DialogActions>
  );
};

DialogButtons.defaultProps = {
  confirmButtonState: "default",
  variant: "default",
};

export default DialogButtons;
