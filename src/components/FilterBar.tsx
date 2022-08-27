import React from "react";

import { styled, TextField } from "@mui/material";
import { FilterOpts } from "@portal/types";

import Filter from "./Filter";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
}));

interface FilterBarProps {
  placeholder?: string;
  onSearchChange: (e: React.ChangeEvent<any>) => void;
  filterOpts: FilterOpts[];
}

export const FilterBar = ({
  placeholder,
  onSearchChange,
  filterOpts,
}: FilterBarProps) => {
  return (
    <Root>
      <Filter filterOpts={filterOpts} />
      <TextField
        fullWidth
        onChange={onSearchChange}
        size="small"
        inputProps={{ placeholder }}
      />
    </Root>
  );
};

export default FilterBar;
