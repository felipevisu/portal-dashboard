import React, { useState } from "react";

import {
  Box,
  Button,
  ClickAwayListener,
  Popper,
  PopperPlacementType,
} from "@mui/material";
import { FilterOpts } from "@portal/types";

import FilterContent from "./FilterContent";

interface FilterProps {
  filterOpts: FilterOpts[];
}

export const Filter = ({ filterOpts }: FilterProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<PopperPlacementType>();

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <Button variant="outlined" onClick={handleClick("bottom-start")}>
          Filtros
        </Button>
        <Popper open={open} anchorEl={anchorEl} placement={placement}>
          <FilterContent filterOpts={filterOpts} />
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default Filter;
