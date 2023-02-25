import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, FormControl, InputAdornment, TextField } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import FormSpacer from "@portal/components/FormSpacer";
import { ItemCreateInput } from "@portal/graphql";

export interface ItemProps {
  name: string;
  value: string;
}

interface ItemCreateDialogProps {
  onClose: () => void;
  onConfirm: (item: ItemCreateInput) => void;
  isOpen: boolean;
}

const initialData: ItemProps = { name: "", value: "" };

export const ItemCreateDialog = ({
  onClose,
  onConfirm,
  isOpen,
}: ItemCreateDialogProps) => {
  const { t } = useTranslation();
  const [data, setData] = useState<ItemProps>(initialData);
  const [errors, setErrors] = useState({ name: false, value: false });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirm = () => {
    if (data.name && data.value) {
      onConfirm({
        name: data.name,
        value: parseFloat(data.value),
      });
      setData(initialData);
    } else {
      setErrors({ name: !data.name, value: !data.value });
    }
  };

  const handleClose = () => {
    onClose();
    setData(initialData);
  };

  return (
    <ActionDialog
      title={t("investment.create")}
      onClose={handleClose}
      onConfirm={handleConfirm}
      open={isOpen}
    >
      <Box sx={{ paddingTop: (theme) => theme.spacing(1) }}>
        <FormControl fullWidth>
          <TextField
            error={errors.name}
            fullWidth
            name="name"
            label={t("name")}
            value={data.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormSpacer />
        <FormControl fullWidth>
          <TextField
            error={errors.value}
            fullWidth
            name="value"
            label={t("value")}
            type="text"
            value={data.value}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">R$</InputAdornment>
              ),
            }}
          />
        </FormControl>
      </Box>
    </ActionDialog>
  );
};

export default ItemCreateDialog;
