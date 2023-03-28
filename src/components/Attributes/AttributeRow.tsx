import React from "react";

import { TextField } from "@mui/material";
import {
  AttributeInputTypeEnum,
  AttributeValueFragment,
  EntryErrorWithAttributesFragment,
} from "@portal/graphql";

import MultiSelectField from "../MultiSelectField";

import { AttributeInput, AttributeRowHandlers } from "./Attributes";
import BasicAttributeRow from "./BasicAttributeRow";
import { getMultiChoices } from "./utils";

export interface AttributeRowProps extends AttributeRowHandlers {
  attribute: AttributeInput;
  attributeValues: AttributeValueFragment[];
  error: EntryErrorWithAttributesFragment;
  loading: boolean;
  onAttributeSelectBlur?: () => void;
}

export const AttributeRow: React.FC<AttributeRowProps> = ({
  attribute,
  attributeValues,
  error,
  loading,
  onMultiChange,
  onChange,
  fetchAttributeValues,
  fetchMoreAttributeValues,
  onAttributeSelectBlur,
}) => {
  switch (attribute.data.inputType) {
    case AttributeInputTypeEnum.MULTISELECT:
      return (
        <BasicAttributeRow label={attribute.label}>
          <MultiSelectField
            choices={getMultiChoices(attributeValues)}
            disabled={loading}
            error={!!error}
            name={`attribute:${attribute.label}`}
            value={attribute.value}
            onChange={(event) =>
              onMultiChange(attribute.id, event.target.value)
            }
            onFocus={() => fetchAttributeValues("", attribute.id)}
            onBlur={onAttributeSelectBlur}
            label={"Selecione"}
          />
        </BasicAttributeRow>
      );
    case AttributeInputTypeEnum.PLAIN_TEXT:
      return (
        <BasicAttributeRow label={attribute.label}>
          <TextField
            fullWidth
            disabled={loading}
            error={!!error}
            label={"Valor"}
            name={`attribute:${attribute.label}`}
            onChange={(event) => onChange(attribute.id, event.target.value)}
            type="text"
            value={attribute.value[0] || ""}
          />
        </BasicAttributeRow>
      );
  }
};

export default AttributeRow;
