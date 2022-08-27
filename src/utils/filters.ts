import { boolean, isBooleanable } from "boolean";

import { FilterOpts } from "@portal/types";

export const getQuery = (
  filterOpts: FilterOpts[],
  searchParams: URLSearchParams
) => {
  const query = {};
  filterOpts.forEach((filter) => {
    if (filter.type === "radio") {
      let value: string | boolean = searchParams.get(filter.slug);
      if (value) {
        if (isBooleanable(value)) {
          value = boolean(value);
        }
        query[filter.slug] = value;
      }
    }
    if (filter.type === "daterange") {
      const gte = searchParams.get(filter.slug + "_Gte");
      const lte = searchParams.get(filter.slug + "_Lte");
      if (gte) query[filter.slug + "_Gte"] = gte;
      if (lte) query[filter.slug + "_Lte"] = lte;
    }
  });
  return query;
};
