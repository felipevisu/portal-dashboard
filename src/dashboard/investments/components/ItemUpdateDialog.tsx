import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Box, FormControl, InputAdornment, TextField } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import FormSpacer from "@portal/components/FormSpacer";
import { ErrorFragment, ItemCreateInput, ItemInput } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";
import { Form } from "@portal/components/Form";

interface ItemUpdateDialogProps {
  item: ItemInput;
  errors: ErrorFragment[];
  onClose: () => void;
  onConfirm: (item: ItemInput) => void;
  isOpen: boolean;
}

export const ItemUpdateDialog = ({
  item,
  errors,
  onClose,
  onConfirm,
  isOpen,
}: ItemUpdateDialogProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["name", "value"], errors);

  const handleClose = () => {
    onClose();
  };

  const initial = {
    name: item.name,
    value: item.value,
  };

  return (
    <Form initial={initial} onSubmit={onConfirm}>
      {({ data, change, submit }) => (
        <ActionDialog
          title={t("investment.create")}
          onClose={handleClose}
          onConfirm={submit}
          open={isOpen}
        >
          <Box sx={{ paddingTop: (theme) => theme.spacing(1) }}>
            <FormControl fullWidth>
              <TextField
                error={!!formErrors.name}
                fullWidth
                name="name"
                label={t("name")}
                value={data.name || ""}
                onChange={change}
              />
            </FormControl>
            <FormSpacer />
            <FormControl fullWidth>
              <TextField
                error={!!formErrors.value}
                fullWidth
                name="value"
                label={t("value")}
                type="text"
                value={data.value || ""}
                onChange={change}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>
        </ActionDialog>
      )}
    </Form>
  );
};

export default ItemUpdateDialog;
