import React from "react";

import {
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import ActionDialog from "@portal/components/ActionDialog";
import { AttributeFragment, AvailableAttributeFragment } from "@portal/graphql";
import ControlledCheckbox from "@portal/components/ControlledCheckbox";

export interface AttributesAvailableDialogProps {
  isSelected: (option: string) => boolean;
  attributes: AvailableAttributeFragment[];
  disabled?: boolean;
  open: boolean;
  onClose: () => void;
  onChange: (id: string) => void;
  onConfirm: () => void;
  selected?: number;
  title: string;
  toggleAll?: (items: AvailableAttributeFragment[], selected: number) => void;
}

export const AttributesAvailableDialog: React.FC<
  AttributesAvailableDialogProps
> = ({
  isSelected,
  attributes,
  disabled,
  open,
  onClose,
  onChange,
  onConfirm,
  selected,
  title,
  toggleAll,
}) => {
  const hasAttributes = attributes.length > 0;

  return (
    <ActionDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title={title}
      disabled={disabled}
    >
      {hasAttributes ? (
        <>
          <FormControl>
            <FormControlLabel
              label="Selecione todos"
              control={
                <Checkbox
                  indeterminate={
                    attributes && attributes.length > selected && selected > 0
                  }
                  checked={selected !== 0}
                  disabled={disabled}
                  onChange={() => toggleAll(attributes, selected)}
                />
              }
            />
          </FormControl>
          <Divider />
          {attributes.map((attribute) => (
            <FormControl fullWidth key={attribute.id}>
              <ControlledCheckbox
                checked={isSelected(attribute.id)}
                name={attribute.name}
                label={attribute.name}
                onChange={() => onChange(attribute.id)}
              />
            </FormControl>
          ))}
        </>
      ) : (
        <div />
      )}
    </ActionDialog>
  );
};

export default AttributesAvailableDialog;
