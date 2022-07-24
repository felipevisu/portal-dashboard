import React, { useState } from "react";

import {
  DialogContentText,
  FormControl,
  InputAdornment,
  TextField,
} from "@mui/material";
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
      title="Adicionar Item"
      onClose={handleClose}
      onConfirm={handleConfirm}
      open={isOpen}
    >
      <DialogContentText sx={{ paddingTop: (theme) => theme.spacing(2) }}>
        <FormControl fullWidth>
          <TextField
            error={errors.name}
            fullWidth
            name="name"
            label="Nome"
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
            label="Valor"
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
      </DialogContentText>
    </ActionDialog>
  );
};

export default ItemCreateDialog;
