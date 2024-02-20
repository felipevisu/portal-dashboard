import React from "react";
import { useTranslation } from "react-i18next";

import { Box, FormControl, TextField } from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import { Form } from "@portal/components/Form";
import { AttributeValueUpdateInput, ErrorFragment } from "@portal/graphql";
import { getFormErrors } from "@portal/utils/errors";

export interface AttributeValueEditDialogFormData {
  name: string;
  value: string;
}

interface ValueUpdateDialogProps {
  attributeValue?: AttributeValueEditDialogFormData;
  errors: ErrorFragment[];
  onClose: () => void;
  onConfirm: (item: AttributeValueUpdateInput) => void;
  isOpen: boolean;
}

export const ValueUpdateDialog = ({
  attributeValue,
  errors,
  onClose,
  onConfirm,
  isOpen,
}: ValueUpdateDialogProps) => {
  const { t } = useTranslation();
  const formErrors = getFormErrors(["name"], errors);

  const handleClose = () => {
    onClose();
  };

  const initial = {
    name: attributeValue.name,
  };

  return (
    <Form initial={initial} onSubmit={onConfirm}>
      {({ data, change, submit }) => (
        <ActionDialog
          title={t("attribute.values.update")}
          onConfirm={submit}
          onClose={handleClose}
          open={isOpen}
        >
          <Box sx={{ paddingTop: (theme) => theme.spacing(1) }}>
            <FormControl fullWidth>
              <TextField
                fullWidth
                name="name"
                error={!!formErrors.name}
                label={t("name")}
                value={data.name}
                onChange={change}
              />
            </FormControl>
          </Box>
        </ActionDialog>
      )}
    </Form>
  );
};

export default ValueUpdateDialog;
