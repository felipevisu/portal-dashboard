import React from "react";
import Downshift from "downshift";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  InputBase,
  InputProps,
  Popper,
  PopperPlacementType,
  TextField,
} from "@mui/material";
import { FetchMoreProps } from "@portal/types";

import Debounce, { DebounceProps } from "../Debounce";

import SingleAutocompleteSelectFieldContent, {
  SingleAutocompleteActionType,
  SingleAutocompleteChoiceType,
} from "./SingleAutocompleteSelectFieldContent";

export interface SingleAutocompleteSelectFieldProps
  extends Partial<FetchMoreProps> {
  add?: SingleAutocompleteActionType;
  error?: boolean;
  name: string;
  displayValue: string;
  emptyOption?: boolean;
  choices: Array<SingleAutocompleteChoiceType<string, string | JSX.Element>>;
  value: string;
  disabled?: boolean;
  placeholder?: string;
  allowCustomValues?: boolean;
  helperText?: string;
  label?: string;
  InputProps?: InputProps;
  fetchChoices?: (value: string) => void;
  onChange: (event: React.ChangeEvent<any>) => void;
  fetchOnFocus?: boolean;
  nakedInput?: boolean;
  onBlur?: () => void;
  popperPlacement?: PopperPlacementType;
}

const DebounceAutocomplete: React.ComponentType<DebounceProps<string>> =
  Debounce;

export const SingleAutocompleteSelectField: React.FC<
  SingleAutocompleteSelectFieldProps
> = (props) => {
  const {
    add,
    allowCustomValues,
    choices,
    disabled,
    displayValue,
    emptyOption,
    error,
    hasMore,
    helperText,
    label,
    loading,
    name,
    placeholder,
    value,
    InputProps,
    fetchChoices,
    onChange,
    onFetchMore,
    fetchOnFocus,
    nakedInput = false,
    onBlur,
    popperPlacement = "bottom-end",
    ...rest
  } = props;
  const anchor = React.useRef<HTMLDivElement | null>(null);
  const input = React.useRef<HTMLInputElement | null>(null);

  const handleChange = (item: string) => {
    onChange({
      target: {
        name,
        value: item,
      },
    } as any);
  };

  return (
    <DebounceAutocomplete debounceFn={fetchChoices}>
      {(debounceFn) => (
        <Downshift
          itemToString={() => displayValue || ""}
          onInputValueChange={(value) => debounceFn(value)}
          onSelect={handleChange}
          selectedItem={value || ""}
          // this is to prevent unwanted state updates when the dropdown is closed with an empty value,
          // which downshift interprets as the value being updated with an empty string, causing side-effects
          stateReducer={(_, changes) => {
            if (changes.isOpen === false) {
              delete changes.inputValue;
            }
            return changes;
          }}
        >
          {({
            getInputProps,
            getItemProps,
            isOpen,
            inputValue,
            selectedItem,
            toggleMenu,
            closeMenu,
            highlightedIndex,
            reset,
            getToggleButtonProps,
          }) => {
            const isCustomValueSelected =
              choices && selectedItem
                ? choices.filter((c) => c.value === selectedItem).length === 0
                : false;

            const choiceFromInputValue = choices.find(
              ({ value: choiceId }) => choiceId === inputValue
            );

            const isValueInValues = !!choiceFromInputValue;

            const isValueInLabels = !!choices.find(
              (choice) => choice.label === inputValue
            );

            const ensureProperValues = (alwaysCheck = false) => {
              if ((allowCustomValues || isValueInLabels) && !alwaysCheck) {
                return;
              }

              if (isValueInValues && !isValueInLabels) {
                reset({ inputValue: choiceFromInputValue.value });
                return;
              }

              reset({ inputValue: displayValue });
            };

            const displayCustomValue = !!(
              inputValue &&
              inputValue.length > 0 &&
              allowCustomValues &&
              !isValueInLabels
            );

            const handleBlur = () => {
              ensureProperValues(true);
              if (onBlur) {
                onBlur();
              }
              closeMenu();
            };

            const TextFieldComponent = nakedInput ? InputBase : TextField;

            const commonInputProps = {
              ...InputProps,
              endAdornment: (
                <Box
                  {...getToggleButtonProps()}
                  sx={{ marginTop: 1, marginRight: -1 }}
                >
                  <ArrowDropDownIcon />
                </Box>
              ),
              error,
              id: undefined,
              onFocus: () => {
                if (fetchOnFocus) {
                  fetchChoices(inputValue);
                }
                input.current.select();
              },
            };

            const nakedInputProps = nakedInput
              ? {
                  "aria-label": "naked",
                  ...commonInputProps,
                  autoFocus: true,
                  onBlur: handleBlur,
                }
              : {};

            return (
              <div {...rest}>
                <TextFieldComponent
                  {...nakedInputProps}
                  InputProps={commonInputProps}
                  // Downshift doesn't seem to be fully compatible with MUI
                  // https://github.com/downshift-js/downshift/issues/718
                  inputProps={{
                    ...getInputProps({
                      placeholder,
                      onClick: () => {
                        if (disabled) {
                          return;
                        }
                        toggleMenu();
                      },
                    }),
                  }}
                  error={error}
                  disabled={disabled}
                  helperText={helperText}
                  label={label}
                  fullWidth={true}
                  onBlur={onBlur}
                  ref={anchor}
                  inputRef={input}
                />
                {isOpen && (!!inputValue || !!choices.length) && (
                  <Popper
                    anchorEl={anchor.current}
                    open={isOpen}
                    style={{ width: anchor.current.clientWidth, zIndex: 1301 }}
                    placement={popperPlacement}
                  >
                    <SingleAutocompleteSelectFieldContent
                      add={
                        !!add && {
                          ...add,
                          onClick: () => {
                            add.onClick();
                            closeMenu();
                          },
                        }
                      }
                      choices={choices}
                      displayCustomValue={displayCustomValue}
                      emptyOption={emptyOption}
                      getItemProps={getItemProps}
                      hasMore={hasMore}
                      highlightedIndex={highlightedIndex}
                      loading={loading}
                      inputValue={inputValue}
                      isCustomValueSelected={isCustomValueSelected}
                      selectedItem={selectedItem}
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
  );
};

export default SingleAutocompleteSelectField;
