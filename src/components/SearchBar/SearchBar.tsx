import React from "react";

import { SearchPageProps } from "@portal/types";
import SearchInput from "./SearchInput";
import { Root } from "../FilterBar/styles";
export interface SearchBarProps extends SearchPageProps {
  searchPlaceholder: string;
}

export const SearchBar = ({
  initialSearch,
  searchPlaceholder,
  onSearchChange,
}: SearchBarProps) => {
  return (
    <Root>
      <SearchInput
        initialSearch={initialSearch}
        placeholder={searchPlaceholder}
        onSearchChange={onSearchChange}
      />
    </Root>
  );
};

export default SearchBar;
