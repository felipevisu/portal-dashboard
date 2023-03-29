import React, { ReactElement } from "react";
import { GetItemPropsOptions } from "downshift";

import { Add } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import useElementScroll, {
  isScrolledToBottom,
} from "@portal/hooks/useElementScroll";
import { FetchMoreProps } from "@portal/types";

const menuItemHeight = 46;
const maxMenuItems = 5;
const offset = 24;

export type ChoiceValue = string;
export interface SingleAutocompleteChoiceType<
  V extends ChoiceValue = ChoiceValue,
  L = string
> {
  label: L;
  value: V;
}
export interface SingleAutocompleteActionType {
  label: string;
  onClick: () => void;
}
export interface SingleAutocompleteSelectFieldContentProps
  extends Partial<FetchMoreProps> {
  add?: SingleAutocompleteActionType;
  choices: Array<SingleAutocompleteChoiceType<string, string | JSX.Element>>;
  displayCustomValue: boolean;
  emptyOption: boolean;
  getItemProps: (options: GetItemPropsOptions<string>) => any;
  highlightedIndex: number;
  inputValue: string;
  isCustomValueSelected: boolean;
  selectedItem: any;
  style?: React.CSSProperties;
}

function getChoiceIndex(
  index: number,
  emptyValue: boolean,
  customValue: boolean,
  add: boolean
) {
  let choiceIndex = index;
  if (emptyValue) {
    choiceIndex += 1;
  }
  if (customValue || add) {
    choiceIndex += 2;
  }

  return choiceIndex;
}

const sliceSize = 20;

const SingleAutocompleteSelectFieldContent: React.FC<
  SingleAutocompleteSelectFieldContentProps
> = (props) => {
  const {
    add,
    choices,
    displayCustomValue,
    emptyOption,
    getItemProps,
    hasMore,
    loading,
    inputValue,
    isCustomValueSelected,
    selectedItem,
    onFetchMore,
    style,
  } = props;

  if (!!add && !!displayCustomValue) {
    throw new Error("Add and custom value cannot be displayed simultaneously");
  }

  const anchor = React.useRef<HTMLDivElement>();
  const scrollPosition = useElementScroll(anchor);
  const [calledForMore, setCalledForMore] = React.useState(false);
  const [slice, setSlice] = React.useState(onFetchMore ? 10000 : sliceSize);
  const [initialized, setInitialized] = React.useState(false);

  const scrolledToBottom = isScrolledToBottom(anchor, scrollPosition, offset);

  React.useEffect(() => {
    if (!calledForMore && onFetchMore && scrolledToBottom) {
      onFetchMore();
      setCalledForMore(true);
    } else if (scrolledToBottom && !onFetchMore) {
      setSlice((slice) => slice + sliceSize);
    }
  }, [scrolledToBottom]);

  React.useEffect(() => {
    if (!onFetchMore) {
      setSlice(sliceSize);
    }
    if (anchor.current?.scrollTo && !initialized) {
      anchor.current.scrollTo({
        top: 0,
      });
      setInitialized(true);
    }
  }, [choices?.length]);

  React.useEffect(() => {
    setInitialized(false);
  }, [inputValue]);

  React.useEffect(() => {
    if (calledForMore && !loading) {
      setCalledForMore(false);
    }
  }, [loading]);

  const emptyOptionProps = getItemProps({
    item: "",
  });

  const choicesToDisplay = choices.slice(0, slice);

  return (
    <Paper elevation={8} style={style}>
      <div ref={anchor} data-test-id="autocomplete-dropdown">
        {choices.length > 0 || displayCustomValue ? (
          <>
            {emptyOption && (
              <MenuItem
                component="div"
                data-test-id="single-autocomplete-select-option"
                data-test-type="empty"
                {...emptyOptionProps}
              >
                <Typography color="textSecondary">None</Typography>
              </MenuItem>
            )}
            {add && (
              <MenuItem
                component="div"
                {...getItemProps({
                  item: inputValue,
                })}
                data-test-id="single-autocomplete-select-option-add"
                data-test-type="add"
                onClick={add.onClick}
              >
                <Add color="primary" />
                <Typography color="primary">{add.label}</Typography>
              </MenuItem>
            )}
            {displayCustomValue && (
              <MenuItem
                key={"customValue"}
                selected={isCustomValueSelected}
                component="div"
                {...getItemProps({
                  item: inputValue,
                })}
                data-test-id="single-autocomplete-select-option"
                data-test-type="custom"
              >
                Add new value: {inputValue}
              </MenuItem>
            )}
            {choices.length > 0 && (!!add || displayCustomValue) && <Divider />}
            {choicesToDisplay.map((suggestion, index) => {
              const choiceIndex = getChoiceIndex(
                index,
                emptyOption,
                displayCustomValue,
                !!add
              );
              const key = React.isValidElement(suggestion.label)
                ? `${index}${suggestion.value}${
                    (suggestion as unknown as ReactElement).props
                  }`
                : JSON.stringify(suggestion);

              return (
                <MenuItem
                  key={key}
                  selected={selectedItem === suggestion.value}
                  component="div"
                  {...getItemProps({
                    index: choiceIndex,
                    item: suggestion.value,
                  })}
                  data-test-id="single-autocomplete-select-option"
                  data-test-value={suggestion.value}
                  data-test-type="option"
                >
                  {suggestion.label}
                </MenuItem>
              );
            })}
            {(hasMore || loading) && (
              <>
                {hasMore && <Divider />}
                <Box
                  sx={{ display: "flex", justifyContent: "center", padding: 1 }}
                >
                  <CircularProgress size={24} />
                </Box>
              </>
            )}
          </>
        ) : (
          <MenuItem
            disabled={true}
            component="div"
            data-test-id="single-autocomplete-select-no-options"
          >
            No results found
          </MenuItem>
        )}
      </div>
    </Paper>
  );
};

SingleAutocompleteSelectFieldContent.displayName =
  "SingleAutocompleteSelectFieldContent";
export default SingleAutocompleteSelectFieldContent;
