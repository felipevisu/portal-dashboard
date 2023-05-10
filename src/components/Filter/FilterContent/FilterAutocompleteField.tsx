import React from "react";

import {
  Divider,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { MultiAutocompleteChoiceType } from "@portal/components/Attributes/utils";
import Checkbox from "@portal/components/Checkbox";
import { toggle } from "@portal/utils/lists";

import { FieldType, FilterFieldBaseProps } from "../types";

interface FilterAutocompleteFieldProps
  extends FilterFieldBaseProps<string, FieldType.autocomplete> {
  displayValues: FilterAutocompleteDisplayValues;
  setDisplayValues: (values: FilterAutocompleteDisplayValues) => void;
  initialDisplayValues: FilterAutocompleteDisplayValues;
}

export type FilterAutocompleteDisplayValues = Record<
  string,
  MultiAutocompleteChoiceType[]
>;

const FilterAutocompleteField: React.FC<FilterAutocompleteFieldProps> = ({
  displayValues,
  filter,
  setDisplayValues,
  onFilterPropertyChange,
  initialDisplayValues,
  ...rest
}) => {
  const fieldDisplayValues = displayValues[filter.name] ?? [];
  const initialFieldDisplayValues = initialDisplayValues[filter.name];
  const availableOptions = filter.options.filter((option) =>
    fieldDisplayValues.every(
      (displayValue) => displayValue.value !== option.value
    )
  );
  const displayNoResults =
    availableOptions.length === 0 && fieldDisplayValues.length === 0;

  const getUpdatedFilterValue = (option: MultiAutocompleteChoiceType) => {
    if (filter.multiple) {
      return toggle(option.value, filter.value, (a, b) => a === b);
    }

    return [option.value];
  };

  const handleChange = (option: MultiAutocompleteChoiceType) => {
    onFilterPropertyChange({
      payload: {
        name: filter.name,
        update: {
          active: true,
          value: getUpdatedFilterValue(option),
        },
      },
      type: "set-property",
    });

    if (filter.multiple) {
      setDisplayValues({
        ...displayValues,
        [filter.name]: toggle(
          option,
          fieldDisplayValues,
          (a, b) => a.value === b.value
        ),
      });
    }
  };

  const isValueChecked = (displayValue: MultiAutocompleteChoiceType) =>
    filter.value.includes(displayValue.value);

  const filteredValuesChecked =
    initialFieldDisplayValues.filter(isValueChecked);

  const filteredValuesUnchecked = fieldDisplayValues.filter(
    (displayValue) => !isValueChecked(displayValue)
  );

  const displayHr = !!filteredValuesChecked.length;

  return (
    <div {...rest}>
      {filter?.onSearchChange && (
        <TextField
          fullWidth
          name={filter.name + "_autocomplete"}
          onChange={(event) => filter.onSearchChange(event.target.value)}
          size="small"
          sx={{ mb: 2 }}
        />
      )}
      {filteredValuesChecked.map((displayValue) => (
        <div key={displayValue.value}>
          <FormControlLabel
            control={
              <Checkbox checked={filter.value.includes(displayValue.value)} />
            }
            label={displayValue.label}
            name={filter.name}
            onChange={() => handleChange(displayValue)}
          />
        </div>
      ))}
      {displayHr && <Divider />}
      {displayNoResults && (
        <Typography color="textSecondary">Nenhum resultado</Typography>
      )}
      {filteredValuesUnchecked.map((option) => (
        <div key={option.value}>
          <FormControlLabel
            control={<Checkbox checked={filter.value.includes(option.value)} />}
            label={option.label}
            name={filter.name}
            onChange={() => handleChange(option)}
          />
        </div>
      ))}
      {filter.hasMore && (
        <Link onClick={filter.onFetchMore}>Carregar mais</Link>
      )}
    </div>
  );
};

export default FilterAutocompleteField;
