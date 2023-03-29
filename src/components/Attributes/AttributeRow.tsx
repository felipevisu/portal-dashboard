import React from "react";

import { TextField } from "@mui/material";
import {
  AttributeInputTypeEnum,
  AttributeValueFragment,
  EntryErrorWithAttributesFragment,
} from "@portal/graphql";

import MultiAutocompleteSelectField from "../MultiAutocompleteSelectField";
import MultiSelectField from "../MultiSelectField";
import SingleAutocompleteSelectField from "../SingleAutocompleteSelectField";
import SingleSelectField from "../SingleSelectField";

import { AttributeInput, AttributeRowHandlers } from "./Attributes";
import BasicAttributeRow from "./BasicAttributeRow";
import {
  getMultiChoices,
  getMultiDisplayValue,
  getSingleChoices,
  getSingleDisplayValue,
} from "./utils";

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
    case AttributeInputTypeEnum.DROPDOWN:
      return (
        <BasicAttributeRow label={attribute.label}>
          <SingleAutocompleteSelectField
            choices={getSingleChoices(attributeValues)}
            disabled={loading}
            displayValue={getSingleDisplayValue(attribute, attributeValues)}
            emptyOption={!attribute.data.isRequired}
            error={!!error}
            name={`attribute:${attribute.label}`}
            label={"Selecione"}
            value={attribute.value[0]}
            onChange={(event) => onChange(attribute.id, event.target.value)}
            allowCustomValues={true}
            fetchOnFocus={true}
            fetchChoices={(value) => fetchAttributeValues(value, attribute.id)}
            onBlur={onAttributeSelectBlur}
            {...fetchMoreAttributeValues}
          />
        </BasicAttributeRow>
      );
    case AttributeInputTypeEnum.MULTISELECT:
      return (
        <BasicAttributeRow label={attribute.label}>
          <MultiAutocompleteSelectField
            choices={getMultiChoices(attributeValues)}
            displayValues={getMultiDisplayValue(attribute, attributeValues)}
            disabled={loading}
            error={!!error}
            label={"Selecione"}
            name={`attribute:${attribute.label}`}
            value={attribute.value}
            onChange={(event) =>
              onMultiChange(attribute.id, event.target.value)
            }
            allowCustomValues={true}
            fetchOnFocus={true}
            fetchChoices={(value) => fetchAttributeValues(value, attribute.id)}
            onBlur={onAttributeSelectBlur}
            {...fetchMoreAttributeValues}
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
