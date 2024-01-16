import { CategoryFilterInput } from "@portal/graphql";

export function getFilterOpts(params: URLSearchParams) {
  return {};
}

export function getFilterVariables(
  params: URLSearchParams
): CategoryFilterInput {
  return {
    search: params.get("search"),
  };
}
