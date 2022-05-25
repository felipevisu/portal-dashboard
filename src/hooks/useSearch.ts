import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "./useDebounce";

export const useSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState<string>(searchParams.get("search"));
  const debouncedSearch = useDebounce(setSearch);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    debouncedSearch(value);
    setSearchParams({ search: value });
  };

  return {
    handleSearch,
    search,
  };
};

export default useSearch;
