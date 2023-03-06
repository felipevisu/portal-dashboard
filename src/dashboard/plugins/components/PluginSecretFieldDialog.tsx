import React from "react";

import { LoadingButton } from "@mui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import BackButton from "@portal/components/BackButton";
import { Form } from "@portal/components/Form";
import {
  ConfigurationItemFragment,
  ConfigurationTypeFieldEnum,
} from "@portal/graphql";
import { maybe } from "@portal/misc";
import { DialogProps } from "@portal/types";

export interface PluginSecretFieldDialogFormData {
  value: string;
}
export interface PluginSecretFieldDialogProps extends DialogProps {
  loading: boolean;
  field: ConfigurationItemFragment;
  onConfirm: (data: PluginSecretFieldDialogFormData) => void;
}

const PluginSecretFieldDialog: React.FC<PluginSecretFieldDialogProps> = ({
  loading,
  field,
  onClose,
  onConfirm,
  open,
}) => {
  const initialForm: PluginSecretFieldDialogFormData = {
    value: "",
  };

  return (
    <Dialog fullWidth onClose={onClose} open={open} maxWidth="sm">
      <DialogTitle>
        {field.value === null
          ? "Add Value to Authorization Field"
          : "Edit Authorization Field"}
      </DialogTitle>
      <Form initial={initialForm} onSubmit={onConfirm}>
        {({ change, data, submit }) => (
          <>
            <DialogContent>
              <TextField
                multiline={
                  field?.type === ConfigurationTypeFieldEnum.SECRETMULTILINE
                }
                autoComplete="off"
                fullWidth
                label={field && field.label}
                name="value"
                type={
                  maybe(() => field.type) ===
                    ConfigurationTypeFieldEnum.PASSWORD && "password"
                }
                value={data.value || ""}
                onChange={change}
              />
            </DialogContent>
            <DialogActions sx={{ padding: 3 }}>
              <BackButton onClick={onClose} />
              <LoadingButton
                variant="contained"
                loading={loading}
                onClick={submit}
              >
                Confirma
              </LoadingButton>
            </DialogActions>
          </>
        )}
      </Form>
    </Dialog>
  );
};

PluginSecretFieldDialog.displayName = "PluginSecretFieldDialog";
export default PluginSecretFieldDialog;
