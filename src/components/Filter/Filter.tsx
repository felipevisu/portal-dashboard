import { Box, Button, Popper, PopperPlacementType } from "@mui/material";
import React, { useState } from "react";
import FilterContent from "./FilterContent";

export const Filter = () => {
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
    <Box>
      <Button variant="outlined" onClick={handleClick("bottom-start")}>
        Filtros
      </Button>
      <Popper open={open} anchorEl={anchorEl} placement={placement}>
        <FilterContent />
      </Popper>
    </Box>
  );
};

export default Filter;
