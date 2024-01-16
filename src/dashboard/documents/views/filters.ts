import { boolean } from "boolean";

import { DocumentFilterInput } from "@portal/graphql";

export function getFilterOpts(params: URLSearchParams) {
  return {
    isPublished: {
      active: !!params.get("isPublished"),
      value: params.get("isPublished"),
    },
    expires: {
      active: !!params.get("expires"),
      value: params.get("expires"),
    },
    expirationDate: {
      active: [
        params.get("expirationDateFrom"),
        params.get("expirationDateTo"),
      ].some((field) => field !== null),
      value: {
        max: params.get("expirationDateFrom") || "",
        min: params.get("expirationDateTo") || "",
      },
    },
  };
}

export function getFilterVariables(
  params: URLSearchParams
): DocumentFilterInput {
  const expires = params.get("expires");
  const isPublished = params.get("isPublished");

  return {
    isPublished: isPublished ? boolean(isPublished) : null,
    expires: expires ? boolean(expires) : null,
    search: params.get("search"),
    expirationDate: {
      gte: params.get("expirationDateFrom"),
      lte: params.get("expirationDateTo"),
    },
  };
}
