import { boolean } from "boolean";

import { DocumentFilterInput, EntryTypeEnum } from "@portal/graphql";
import { findValueInEnum, maybe } from "@portal/misc";

export function getFilterOpts(params: URLSearchParams) {
  return {
    type: {
      active: !!params.get("type"),
      value: maybe(() => findValueInEnum(params.get("type"), EntryTypeEnum)),
    },
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
    type: maybe(() => findValueInEnum(params.get("type"), EntryTypeEnum)),
    isPublished: isPublished ? boolean(isPublished) : null,
    expires: expires ? boolean(expires) : null,
    search: params.get("search"),
    expirationDate: {
      gte: params.get("expirationDateFrom"),
      lte: params.get("expirationDateTo"),
    },
  };
}
