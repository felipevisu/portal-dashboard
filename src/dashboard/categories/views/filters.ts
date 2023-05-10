import { CategoryFilterInput, EntryTypeEnum } from "@portal/graphql";
import { findValueInEnum, maybe } from "@portal/misc";

export function getFilterOpts(params: URLSearchParams) {
  return {
    type: {
      active: !!params.get("type"),
      choices: [],
      value: maybe(() => findValueInEnum(params.get("type"), EntryTypeEnum)),
    },
  };
}

export function getFilterVariables(
  params: URLSearchParams
): CategoryFilterInput {
  return {
    type: maybe(() => findValueInEnum(params.get("type"), EntryTypeEnum)),
    search: params.get("search"),
  };
}
