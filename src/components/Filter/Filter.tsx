import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  ClickAwayListener,
  Popper,
  PopperPlacementType,
} from "@mui/material";

import { Button } from "../Button";

import { FilterContent } from "./FilterContent";
import { FilterElement, IFilter } from "./types";
import useFilter from "./useFilter";

export interface FilterProps<TFilterKeys extends string = string> {
  menu: IFilter<TFilterKeys>;
  onFilterAdd: (filter: Array<FilterElement<string>>) => void;
  onFilterAttributeFocus?: (id?: string) => void;
}

export const Filter = ({
  menu,
  onFilterAdd,
  onFilterAttributeFocus,
}: FilterProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [data, dispatch, reset] = useFilter(menu);
  const { t } = useTranslation();
  const isFilterActive = menu.some((filterElement) => filterElement.active);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const handleSubmit = () => {
    onFilterAdd(data);
    setOpen(false);
  };

  const handleClear = () => {
    reset();
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <Button variant="outlined" onClick={handleClick("bottom-start")}>
          {t("filters")}
        </Button>
        <Popper open={open} anchorEl={anchorEl} placement={placement}>
          <FilterContent
            dataStructure={menu}
            filters={data}
            onClear={handleClear}
            onFilterPropertyChange={dispatch}
            onFilterAttributeFocus={onFilterAttributeFocus}
            onSubmit={handleSubmit}
          />
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Filter;
