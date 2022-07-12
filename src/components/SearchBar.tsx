import React from "react";

import { styled, TextField } from "@mui/material";

const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface SearchBarProps {
  placeholder?: string;
  onSearchChange: (e: React.ChangeEvent<any>) => void;
}

export const SearchBar = ({ placeholder, onSearchChange }: SearchBarProps) => {
  return (
    <Root>
      <TextField
        fullWidth
        onChange={onSearchChange}
        size="small"
        inputProps={{ placeholder }}
      />
    </Root>
  );
};

export default SearchBar;
