import React from "react";

import { Box } from "@mui/material";
import { MultiAutocompleteChoiceType } from "@portal/components/Attributes/utils";

import { FilterReducerAction } from "../reducer";
import { FieldType, FilterElement, isFilterType } from "../types";

import FilterAutocompleteField, {
  FilterAutocompleteDisplayValues,
} from "./FilterAutocompleteField";
import FilterOptionField from "./FilterOptionField";

const filterTestingContext = "filter-field-";

export interface FilterContentBodyProps<K extends string> {
  children?: React.ReactNode;
  filter: FilterElement<K>;
  initialAutocompleteDisplayValues: FilterAutocompleteDisplayValues;
  onFilterPropertyChange: <T extends FieldType>(
    value: FilterReducerAction<K, T>
  ) => void;
  autocompleteDisplayValues: FilterAutocompleteDisplayValues;
  setAutocompleteDisplayValues: React.Dispatch<
    React.SetStateAction<Record<string, MultiAutocompleteChoiceType[]>>
  >;
}

export const FilterContentBody = <K extends string = string>({
  filter,
  children,
  onFilterPropertyChange,
  autocompleteDisplayValues,
  setAutocompleteDisplayValues,
  initialAutocompleteDisplayValues,
}: FilterContentBodyProps<K>) => {
  return (
    <Box sx={{ px: 2, pb: 2 }}>
      {children}
      {isFilterType(filter, FieldType.options) && (
        <FilterOptionField
          data-test-id={filterTestingContext + filter.name}
          filter={filter}
          onFilterPropertyChange={onFilterPropertyChange}
        />
      )}
      {isFilterType(filter, FieldType.autocomplete) && (
        <FilterAutocompleteField
          data-test-id={filterTestingContext + filter.name}
          displayValues={autocompleteDisplayValues}
          filter={filter}
          setDisplayValues={setAutocompleteDisplayValues}
          onFilterPropertyChange={onFilterPropertyChange}
          initialDisplayValues={initialAutocompleteDisplayValues}
        />
      )}
    </Box>
  );
};

export default FilterContentBody;
