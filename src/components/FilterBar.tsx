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
  search?: string;
}

export const FilterBar = ({
  onSearchChange,
  filterOpts,
  search,
}: FilterBarProps) => {
  return (
    <Root>
      <Filter filterOpts={filterOpts} />
      <TextField
        fullWidth
        onChange={onSearchChange}
        size="small"
        inputProps={{
          placeholder: "Pesquisar",
        }}
        value={search}
      />
    </Root>
  );
};

export default FilterBar;
