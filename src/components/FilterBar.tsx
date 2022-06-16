import React from "react";
import { TextField, styled } from "@mui/material";
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
}

export const FilterBar = ({ placeholder, onSearchChange }: FilterBarProps) => {
  return (
    <Root>
      <Filter />
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
