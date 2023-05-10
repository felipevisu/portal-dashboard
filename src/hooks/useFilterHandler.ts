import { parse as parseQs } from "qs";
import { useSearchParams } from "react-router-dom";

import { IFilter } from "@portal/components/Filter";

type CreateFilterHandlers<TFilterKeys extends string> = [
  (filter: IFilter<TFilterKeys>) => void,
  () => void,
  (query: string) => void
];

const clearParams = (params) => {
  delete params.first;
  delete params.last;
  delete params.after;
  delete params.before;
};

export const useFilterHandler = <
  TFilterKeys extends string = string
>(): CreateFilterHandlers<TFilterKeys> => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeFilters = (filters: IFilter<string>) => {
    const extraParams = {};
    const params = parseQs(searchParams.toString());
    clearParams(params);
    filters.forEach((filter) => {
      extraParams[filter.name] = filter.value;
    });
    setSearchParams({ ...params, ...extraParams });
  };

  const resetFilters = () => {
    setSearchParams({});
  };

  const handleSearchChange = (query: string) => {
    const params = parseQs(searchParams.toString());
    clearParams(params);
    setSearchParams({ ...params, search: query });
  };

  return [changeFilters, resetFilters, handleSearchChange];
};

export default useFilterHandler;
