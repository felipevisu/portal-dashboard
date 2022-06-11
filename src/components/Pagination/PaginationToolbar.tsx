import { Toolbar } from "@mui/material";
import React from "react";

import { PaginationActions, PaginationActionsProps } from "./PaginationActions";

export interface PaginationToolbarProps<ActionProps>
  extends PaginationActionsProps<ActionProps> {
  choices?: number[];
  disabled?: boolean;
}

export const PaginationToolbar = <ActionProps,>({
  disabled,
  hasNextPage,
  hasPreviousPage,
  nextIconButtonProps,
  prevIconButtonProps,
  onNextPage,
  onPreviousPage,
  ...other
}: PaginationToolbarProps<ActionProps>): React.ReactElement => {
  return (
    <Toolbar disableGutters {...other}>
      <PaginationActions
        disabled={disabled}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        nextIconButtonProps={nextIconButtonProps}
        prevIconButtonProps={prevIconButtonProps}
        onNextPage={onNextPage}
        onPreviousPage={onPreviousPage}
      />
    </Toolbar>
  );
};

PaginationToolbar.displayName = "PaginationToolbar";
