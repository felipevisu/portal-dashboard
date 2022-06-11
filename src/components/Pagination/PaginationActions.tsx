import ButtonBase, { ButtonBaseTypeMap } from "@mui/material/ButtonBase";
import { styled } from "@mui/material";
import ChevronLeft from "@mui/icons-material/ChevronLeft";
import ChevronRight from "@mui/icons-material/ChevronRight";
import React from "react";

type BaseButtonProps<M = unknown> = M extends unknown
  ? ButtonBaseTypeMap<M & { component: React.ElementType }>["props"]
  : ButtonBaseTypeMap<{ href?: string }>["props"];

const Button = styled(ButtonBase)(({ theme }) => ({
  border: "2px solid",
  borderColor: theme.palette.grey[500],
  borderRadius: 2,
  boxSizing: "border-box",
  color: theme.palette.grey[500],
  height: 36,
  width: 36,
  transition: theme.transitions.create("all", {
    duration: theme.transitions.duration.shorter,
  }),
  "&:hover": {
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  "&:last-child": {
    marginLeft: theme.spacing(1.5),
  },
  "& svg": {
    color: "currentColor",
    width: 16,
  },
}));

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
      <Button
        disableRipple
        onClick={onPreviousPage}
        disabled={previousDisabled}
        aria-label="previous page"
        {...prevIconButtonProps}
      >
        <ChevronLeft />
      </Button>

      <Button
        disableRipple
        onClick={onNextPage}
        disabled={nextDisabled}
        aria-label="next page"
        {...nextIconButtonProps}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

PaginationActions.displayName = "PaginationActions";
