import ButtonBase, { ButtonBaseTypeMap } from "@mui/material/ButtonBase";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import clsx from "clsx";
import React from "react";

type BaseButtonProps<M = unknown> = M extends unknown
  ? ButtonBaseTypeMap<M & { component: React.ElementType }>["props"]
  : ButtonBaseTypeMap<{ href?: string }>["props"];

export interface PaginationActionsProps<BProps = unknown> {
  className?: string;
  disabled?: boolean;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  nextIconButtonProps?: BaseButtonProps<BProps>;
  prevIconButtonProps?: BaseButtonProps<BProps>;
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

export const PaginationActions = <BProps,>({
  className,
  disabled,
  hasNextPage,
  hasPreviousPage,
  nextIconButtonProps,
  prevIconButtonProps,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onNextPage = () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPreviousPage = () => {},
  ...other
}: PaginationActionsProps<BProps>) => {
  const previousDisabled = !hasPreviousPage || disabled;
  const nextDisabled = !hasNextPage || disabled;

  return (
    <div className={className} {...other}>
      <ButtonBase
        disableRipple
        onClick={onPreviousPage}
        disabled={previousDisabled}
        aria-label="previous page"
        {...prevIconButtonProps}
      >
        <ChevronLeft />
      </ButtonBase>

      <ButtonBase
        disableRipple
        onClick={onNextPage}
        disabled={nextDisabled}
        aria-label="next page"
        {...nextIconButtonProps}
      >
        <ChevronRight />
      </ButtonBase>
    </div>
  );
};

PaginationActions.displayName = "PaginationActions";
