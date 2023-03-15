import { boolean, isBooleanable } from "boolean";

import { FilterOpts } from "@portal/types";

export const getQuery = (
  filterOpts: FilterOpts[],
  searchParams: URLSearchParams
) => {
  const query: Record<string, any> = {};
  filterOpts.forEach((filter) => {
    if (filter.type === "radio") {
      let value: string | boolean = searchParams.get(filter.slug);
      if (value) {
        if (isBooleanable(value)) value = boolean(value);
        query[filter.slug] = value;
      }
    }
    if (filter.type === "daterange") {
      const gte = searchParams.get(filter.slug + "_Gte");
      const lte = searchParams.get(filter.slug + "_Lte");
      const daterage = { lte, gte };
      query[filter.slug] = daterage;
    }
  });
  const search = searchParams.get("search");
  if (search) query.search = search;
  return query;
};
