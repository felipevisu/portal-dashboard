import { boolean, isBooleanable } from "boolean";

export const getQuery = <F>(filterOpts: F, searchParams: URLSearchParams) => {
  let query = {};
  Object.keys(filterOpts).forEach((name) => {
    let value: string | boolean = searchParams.get(name);
    if (value) {
      if (isBooleanable(value)) {
        value = boolean(value);
      }
      query = { ...query, [name]: value };
    }
  });
  return query;
};
