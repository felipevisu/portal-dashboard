import React from "react";
import { GetItemPropsOptions } from "downshift";

import { AddIcCallOutlined } from "@mui/icons-material";
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

import { MultiAutocompleteChoiceType } from "../Attributes/utils";
import Checkbox from "../Checkbox";

export interface MultiAutocompleteActionType {
  label: string;
  onClick: () => void;
}

export interface MultiAutocompleteSelectFieldContentProps
  extends Partial<FetchMoreProps> {
  add?: MultiAutocompleteActionType;
  choices: MultiAutocompleteChoiceType[];
  displayCustomValue: boolean;
  displayValues: MultiAutocompleteChoiceType[];
  getItemProps: (options: GetItemPropsOptions<string>) => any;
  highlightedIndex: number;
  inputValue: string;
}

function getChoiceIndex(
  index: number,
  displayValues: MultiAutocompleteChoiceType[],
  displayCustomValue: boolean,
  add: boolean
) {
  let choiceIndex = index;
  if (add || displayCustomValue) {
    choiceIndex += 2;
  }
  if (displayValues.length > 0) {
    choiceIndex += 1 + displayValues.length;
  }

  return choiceIndex;
}

const menuItemHeight = 46;
const maxMenuItems = 5;
const offset = 24;

const MultiAutocompleteSelectFieldContent: React.FC<
  MultiAutocompleteSelectFieldContentProps
> = (props) => {
  const {
    add,
    choices = [],
    displayCustomValue,
    displayValues,
    getItemProps,
    hasMore,
    highlightedIndex,
    loading,
    inputValue,
    onFetchMore,
  } = props;
  if (!!add && !!displayCustomValue) {
    throw new Error("Add and custom value cannot be displayed simultaneously");
  }

  const anchor = React.useRef<HTMLDivElement>();
  const scrollPosition = useElementScroll(anchor);
  const [calledForMore, setCalledForMore] = React.useState(false);

  const scrolledToBottom = isScrolledToBottom(anchor, scrollPosition, offset);

  React.useEffect(() => {
    if (!calledForMore && onFetchMore && scrolledToBottom) {
      onFetchMore();
      setCalledForMore(true);
    }
  }, [scrolledToBottom]);

  React.useEffect(() => {
    if (calledForMore && !loading) {
      setCalledForMore(false);
    }
  }, [loading]);

  const hasValuesToDisplay =
    displayValues?.length > 0 || displayCustomValue || choices.length > 0;

  return (
    <>
      <Paper
        sx={{
          overflow: "hidden",
          zIndex: 22,
        }}
        elevation={8}
      >
        {hasValuesToDisplay && (
          <Box
            sx={{
              overflowY: "scroll",
              maxHeight: `${menuItemHeight * maxMenuItems}px`,
            }}
            ref={anchor}
          >
            <>
              {add && (
                <MenuItem
                  component="div"
                  {...getItemProps({
                    item: inputValue,
                  })}
                  onClick={add.onClick}
                >
                  <AddIcCallOutlined color="primary" />
                  <Typography color="primary">{add.label}</Typography>
                </MenuItem>
              )}

              {(choices.length > 0 || displayValues?.length > 0) &&
                displayCustomValue && <Divider />}
              {displayValues?.map((value) => (
                <MenuItem
                  key={value.value}
                  selected={true}
                  disabled={value.disabled}
                  component="div"
                  {...getItemProps({
                    item: value.value,
                  })}
                >
                  <Checkbox
                    checked={true}
                    disabled={value.disabled}
                    disableRipple
                  />
                  <span>{value.label}</span>
                </MenuItem>
              ))}
              {displayValues?.length > 0 && choices.length > 0 && <Divider />}
              {choices.map((suggestion, index) => {
                const choiceIndex = getChoiceIndex(
                  index,
                  displayValues,
                  displayCustomValue,
                  !!add
                );

                return (
                  <MenuItem
                    key={suggestion.value}
                    selected={highlightedIndex === choiceIndex}
                    disabled={suggestion.disabled}
                    component="div"
                    {...getItemProps({
                      index: choiceIndex,
                      item: suggestion.value,
                    })}
                  >
                    <Checkbox
                      checked={false}
                      disabled={suggestion.disabled}
                      disableRipple
                    />
                    <span>{suggestion.label}</span>
                  </MenuItem>
                );
              })}
            </>
          </Box>
        )}
        {!loading && !hasValuesToDisplay && (
          <MenuItem disabled={true} component="div">
            No results found
          </MenuItem>
        )}
        {(hasMore || loading) && (
          <>
            {hasMore && <Divider />}
            <Box sx={{ display: "flex", justifyContent: "center", padding: 1 }}>
              <CircularProgress size={24} />
            </Box>
          </>
        )}
      </Paper>
    </>
  );
};

export default MultiAutocompleteSelectFieldContent;
