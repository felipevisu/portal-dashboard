import React from "react";

import { FilterProps } from "@portal/types";

import { Filter } from "../Filter";
import { IFilter } from "../Filter/types";
import { SearchBarProps } from "../SearchBar";
import SearchInput from "../SearchBar/SearchInput";

import { Root } from "./styles";

interface FilterBarProps<TKeys extends string = string>
  extends FilterProps<TKeys>,
    SearchBarProps {
  filterStructure: IFilter<TKeys>;
}

export const FilterBar = ({
  filterStructure,
  initialSearch,
  searchPlaceholder,
  onSearchChange,
  onFilterChange,
  onFilterAttributeFocus,
  onFilterReset,
}: FilterBarProps) => {
  return (
    <Root>
      <Filter
        menu={filterStructure}
        onFilterAdd={onFilterChange}
        onFilterAttributeFocus={onFilterAttributeFocus}
        onFilterReset={onFilterReset}
      />
      <SearchInput
        initialSearch={initialSearch}
        placeholder={searchPlaceholder}
        onSearchChange={onSearchChange}
      />
    </Root>
  );
};

export default FilterBar;
