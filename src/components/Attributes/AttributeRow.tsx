import React from "react";
import dayjs, { Dayjs } from "dayjs";

import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  AttributeInputTypeEnum,
  AttributeValueFragment,
  EntryErrorWithAttributesFragment,
} from "@portal/graphql";

import Checkbox from "../Checkbox";
import MultiAutocompleteSelectField from "../MultiAutocompleteSelectField";
import SingleAutocompleteSelectField from "../SingleAutocompleteSelectField";

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
    case AttributeInputTypeEnum.DATE:
      return (
        <BasicAttributeRow label={attribute.label}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              inputFormat="DD/MM/YYYY"
              value={attribute.value[0] || ""}
              label={"Valor"}
              onChange={(value) => {
                onChange(attribute.id, dayjs(value).format("YYYY-MM-DD"));
              }}
              renderInput={(params) => (
                <TextField {...params} error={!!error} fullWidth />
              )}
              disabled={loading}
            />
          </LocalizationProvider>
        </BasicAttributeRow>
      );
    case AttributeInputTypeEnum.BOOLEAN:
      return (
        <BasicAttributeRow label={attribute.label}>
          <div>
            <Checkbox
              disabled={loading}
              name={`attribute:${attribute.label}`}
              onChange={(event) =>
                onChange(attribute.id, JSON.stringify(event.target.checked))
              }
              checked={JSON.parse(attribute.value[0] ?? "false")}
              error={!!error}
            />
          </div>
        </BasicAttributeRow>
      );
  }
};

export default AttributeRow;
