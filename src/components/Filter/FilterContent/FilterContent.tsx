import React, { useState } from "react";

import { Accordion, AccordionSummary, Box, Paper } from "@mui/material";
import useStateFromProps from "@portal/hooks/useStateFromProps";

import { FilterReducerAction } from "../reducer";
import { FieldType, FilterElement, IFilter } from "../types";

import { FilterAutocompleteDisplayValues } from "./FilterAutocompleteField";
import FilterContentBody, { FilterContentBodyProps } from "./FilterContentBody";
import { FilterContentBodyNameField } from "./FilterContentBodyNameField";
import { FilterContentHeader } from "./FilterContentHeader";

interface FilterContentProps<K extends string = string> {
  filters: IFilter<K>;
  onFilterPropertyChange: <T extends FieldType>(
    value: FilterReducerAction<K, T>
  ) => void;
  onFilterAttributeFocus?: (id?: string) => void;
  onClear: () => void;
  onSubmit: () => void;
  currencySymbol?: string;
  dataStructure: IFilter<K>;
}

export const FilterContent = ({
  filters,
  onClear,
  onFilterPropertyChange,
  onFilterAttributeFocus,
  onSubmit,
  dataStructure,
}: FilterContentProps) => {
  const [openedFilter, setOpenedFilter] = useState<FilterElement<string>>();

  const getFilterFromCurrentData = function <T extends string>(
    filter: FilterElement<T>
  ) {
    return filters.find(({ name }) => filter.name === name);
  };

  const handleFilterAttributeFocus = (filter?: FilterElement<string>) => {
    setOpenedFilter(filter);
    if (onFilterAttributeFocus) {
      onFilterAttributeFocus(filter?.id);
    }
  };

  const handleFilterOpen = (filter: FilterElement<string>) => {
    if (filter.name !== openedFilter?.name) {
      handleFilterAttributeFocus(filter);
    } else {
      handleFilterAttributeFocus(undefined);
    }
  };

  const handleFilterPropertyGroupChange = function <
    K extends string,
    T extends FieldType
  >(action: FilterReducerAction<K, T>, filter: FilterElement<string>) {
    const switchToActive = action.payload.update.active;
    if (switchToActive && filter.name !== openedFilter?.name) {
      handleFilterAttributeFocus(filter);
    } else if (!switchToActive && filter.name === openedFilter?.name) {
      handleFilterAttributeFocus(undefined);
    }
    if (!switchToActive) {
      action.payload.update.value = [];
    }
    onFilterPropertyChange(action);
  };

  const getAutocompleteValuesWithNewValues = (
    autocompleteDisplayValues: FilterAutocompleteDisplayValues,
    filterField: FilterElement<string>
  ) => {
    if (filterField.type === FieldType.autocomplete) {
      return {
        ...autocompleteDisplayValues,
        [filterField.name]: filterField.options,
      };
    }

    return autocompleteDisplayValues;
  };

  const initialAutocompleteDisplayValues = filters.reduce(
    (acc, filterField) => {
      if (filterField.multipleFields) {
        return filterField.multipleFields.reduce(
          getAutocompleteValuesWithNewValues,
          acc
        );
      }

      return getAutocompleteValuesWithNewValues(acc, filterField);
    },
    {}
  );

  const [autocompleteDisplayValues, setAutocompleteDisplayValues] =
    useStateFromProps<FilterAutocompleteDisplayValues>(
      initialAutocompleteDisplayValues
    );

  const commonFilterBodyProps: Omit<
    FilterContentBodyProps<string>,
    "filter" | "onFilterPropertyChange"
  > = {
    autocompleteDisplayValues,
    setAutocompleteDisplayValues,
    initialAutocompleteDisplayValues,
  };

  return (
    <Paper sx={{ width: 360, marginTop: 1 }} variant="outlined">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <FilterContentHeader onClear={onClear} />
        <Box
          sx={{
            position: "relative",
            display: "block",
            maxHeight: 480,
            overflowY: "auto",
          }}
        >
          {dataStructure
            .sort((a, b) => (a.name > b.name ? 1 : -1))
            .map((filter) => {
              const currentFilter = getFilterFromCurrentData(filter);

              return (
                <Accordion
                  key={filter.name}
                  expanded={filter.name === openedFilter?.name}
                >
                  <AccordionSummary onClick={() => handleFilterOpen(filter)}>
                    {currentFilter && (
                      <FilterContentBodyNameField
                        filter={currentFilter}
                        onFilterPropertyChange={(action) =>
                          handleFilterPropertyGroupChange(action, filter)
                        }
                      />
                    )}
                  </AccordionSummary>
                  {filter.multipleFields ? (
                    <>aqui 1</>
                  ) : (
                    <FilterContentBody
                      {...commonFilterBodyProps}
                      onFilterPropertyChange={onFilterPropertyChange}
                      filter={currentFilter}
                    />
                  )}
                </Accordion>
              );
            })}
        </Box>
      </form>
    </Paper>
  );
};

export default FilterContent;
