import React from "react";
import Downshift, { ControllerStateAndHelpers } from "downshift";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Chip,
  Popper,
  PopperPlacementType,
  Stack,
  TextField,
} from "@mui/material";
import { FetchMoreProps } from "@portal/types";

import { MultiAutocompleteChoiceType } from "../Attributes/utils";
import { Debounce, DebounceProps } from "../Debounce";

import MultiAutocompleteSelectFieldContent, {
  MultiAutocompleteActionType,
} from "./MultiAutocompleteSelectFieldContent";

export interface MultiAutocompleteSelectFieldProps
  extends Partial<FetchMoreProps> {
  add?: MultiAutocompleteActionType;
  allowCustomValues?: boolean;
  displayValues: MultiAutocompleteChoiceType[];
  error?: boolean;
  name: string;
  choices: MultiAutocompleteChoiceType[];
  value: string[];
  loading?: boolean;
  placeholder?: string;
  helperText?: string;
  label?: string;
  disabled?: boolean;
  fetchChoices?: (value: string) => void;
  onChange: (event: React.ChangeEvent<any>) => void;
  onBlur?: () => void;
  fetchOnFocus?: boolean;
  popperPlacement?: PopperPlacementType;
}

const DebounceAutocomplete: React.ComponentType<DebounceProps<string>> =
  Debounce;

export const MultiAutocompleteSelectField = (
  props: MultiAutocompleteSelectFieldProps
) => {
  const {
    add,
    allowCustomValues,
    choices,
    displayValues,
    error,
    hasMore,
    helperText,
    label,
    loading,
    name,
    placeholder,
    value,
    disabled,
    fetchChoices,
    onChange,
    onBlur,
    onFetchMore,
    fetchOnFocus,
    popperPlacement = "bottom-end",
    ...rest
  } = props;
  const anchor = React.useRef<HTMLInputElement | null>(null);

  const handleSelect = (
    item: string,
    downshiftOpts?: ControllerStateAndHelpers<string>
  ) => {
    if (downshiftOpts) {
      downshiftOpts.reset({ inputValue: "", isOpen: true });
    }
    onChange({
      target: { name, value: item },
    } as any);
  };

  return (
    <>
      <DebounceAutocomplete debounceFn={fetchChoices}>
        {(debounceFn) => (
          <Downshift
            onInputValueChange={(value) => debounceFn(value)}
            onSelect={handleSelect}
            itemToString={() => ""}
            // this is to prevent unwanted state updates when the dropdown is closed with an empty value,
            // which downshift interprets as the value being updated with an empty string, causing side-effects
            stateReducer={(state, changes) => {
              if (changes.isOpen === false && state.inputValue === "") {
                delete changes.inputValue;
              }
              return changes;
            }}
          >
            {({
              closeMenu,
              getInputProps,
              getItemProps,
              isOpen,
              toggleMenu,
              getMenuProps,
              highlightedIndex,
              inputValue,
              getToggleButtonProps,
            }) => {
              const displayCustomValue =
                inputValue &&
                inputValue.length > 0 &&
                allowCustomValues &&
                !choices.find(
                  (choice) =>
                    choice.label.toLowerCase() === inputValue.toLowerCase()
                );

              return (
                <div>
                  <TextField
                    InputProps={{
                      endAdornment: (
                        <Box
                          {...getToggleButtonProps()}
                          color="#757575"
                          sx={{ marginTop: 1, marginRight: -1 }}
                        >
                          <ArrowDropDownIcon />
                        </Box>
                      ),
                      ref: anchor,
                      onFocus: () => {
                        if (fetchOnFocus) {
                          fetchChoices(inputValue);
                        }
                      },
                    }}
                    inputProps={{
                      ...getInputProps({
                        placeholder,
                        onClick: toggleMenu,
                      }),
                      ...getMenuProps(),
                    }}
                    error={error}
                    helperText={helperText}
                    label={label}
                    fullWidth={true}
                    disabled={disabled}
                    onBlur={onBlur}
                  />
                  {isOpen && (
                    <Popper
                      anchorEl={anchor.current}
                      open={isOpen}
                      style={{
                        width: anchor.current.clientWidth,
                        zIndex: 1301,
                      }}
                      placement={popperPlacement}
                    >
                      <MultiAutocompleteSelectFieldContent
                        add={
                          add && {
                            ...add,
                            onClick: () => {
                              add.onClick();
                              closeMenu();
                            },
                          }
                        }
                        choices={choices?.filter(
                          (choice) => !value.includes(choice.value)
                        )}
                        displayCustomValue={displayCustomValue}
                        displayValues={displayValues}
                        getItemProps={getItemProps}
                        hasMore={hasMore}
                        highlightedIndex={highlightedIndex}
                        loading={loading}
                        inputValue={inputValue}
                        onFetchMore={onFetchMore}
                      />
                    </Popper>
                  )}
                </div>
              );
            }}
          </Downshift>
        )}
      </DebounceAutocomplete>
      <Stack direction="row" flexWrap={"wrap"} sx={{ gap: 1, marginTop: 1 }}>
        {displayValues.map((value) => (
          <Chip
            key={value.value}
            label={value.label}
            onDelete={() => handleSelect(value.value)}
          />
        ))}
      </Stack>
    </>
  );
};

export default MultiAutocompleteSelectField;
