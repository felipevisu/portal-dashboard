import React from "react";

import { SearchPageProps } from "@portal/types";
export interface SearchBarProps extends SearchPageProps {
  searchPlaceholder: string;
}

export const SearchBar = ({
  initialSearch,
  searchPlaceholder,
  onSearchChange,
}: SearchBarProps) => {
  return <></>;
};

export default SearchBar;
