import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, FormControl, TextField } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import { AttributeValueCreateInput } from "@portal/graphql";

export interface ItemProps {
  name: string;
  value: string;
}

interface ValueCreateDialogProps {
  onClose: () => void;
  onConfirm: (item: AttributeValueCreateInput) => void;
  isOpen: boolean;
}

export const ValueCreateDialog = ({
  onClose,
  onConfirm,
  isOpen,
}: ValueCreateDialogProps) => {
  const { t } = useTranslation();
  const [name, setName] = useState<string>("");
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleConfirm = () => {
    if (name) {
      onConfirm({
        name: name,
      });
      setName("");
    } else {
      setError(true);
    }
  };

  const handleClose = () => {
    onClose();
    setName("");
    setError(false);
  };

  return (
    <ActionDialog
      title={t("attribute.values.add")}
      onClose={handleClose}
      onConfirm={handleConfirm}
      open={isOpen}
    >
      <Box sx={{ paddingTop: (theme) => theme.spacing(1) }}>
        <FormControl fullWidth>
          <TextField
            error={error}
            fullWidth
            name="name"
            label={t("name")}
            value={name}
            onChange={handleChange}
          />
        </FormControl>
      </Box>
    </ActionDialog>
  );
};

export default ValueCreateDialog;
