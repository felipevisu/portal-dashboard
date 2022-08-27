import { boolean, isBooleanable } from "boolean";

import { FilterOpts } from "@portal/types";

export const getQuery = (
  filterOpts: FilterOpts[],
  searchParams: URLSearchParams
) => {
  let query = {};
  filterOpts.forEach((filter) => {
    let value: string | boolean = searchParams.get(filter.slug);
    if (value) {
      if (isBooleanable(value)) {
        value = boolean(value);
      }
      query = { ...query, [filter.slug]: value };
    }
  });
  return query;
};
