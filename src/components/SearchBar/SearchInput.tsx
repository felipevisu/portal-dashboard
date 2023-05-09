import React, { useEffect, useState } from "react";

import { TextField } from "@mui/material";
import { SearchPageProps } from "@portal/types";

import Debounce from "../Debounce";

export interface SearchInputProps extends SearchPageProps {
  placeholder: string;
}

export const SearchInput = ({
  placeholder,
  initialSearch,
  onSearchChange,
}: SearchInputProps) => {
  const [search, setSearch] = useState(initialSearch);
  useEffect(() => setSearch(initialSearch), [initialSearch]);

  return (
    <Debounce debounceFn={onSearchChange} time={500}>
      {(debounceSearchChange) => {
        const handleSearchChange = (event: React.ChangeEvent<any>) => {
          const value = event.target.value;
          setSearch(value);
          debounceSearchChange(value);
        };

        return (
          <TextField
            fullWidth
            inputProps={{
              placeholder,
            }}
            value={search}
            onChange={handleSearchChange}
            size="small"
          />
        );
      }}
    </Debounce>
  );
};

export default SearchInput;
