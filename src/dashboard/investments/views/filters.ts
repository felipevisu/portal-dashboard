import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import { InvestmentFilterInput } from "@portal/graphql";
import { FilterOpts } from "@portal/types";
import { boolean } from "boolean";

export function getFilterOpts(
  params: URLSearchParams,
  channels: SingleAutocompleteChoiceType[]
) {
  return {
    channel: {
      active: !!params.get("channel"),
      choices: channels,
      value: params.get("channel") || "",
    },
    isPublished: {
      active: !!params.get("isPublished"),
      value: params.get("isPublished"),
    },
    year: {
      active: !!params.get("year"),
      value: params.get("year"),
    },
    month: {
      active: !!params.get("month"),
      value: params.get("month"),
    },
  };
}

export function getFilterVariables(
  params: URLSearchParams
): InvestmentFilterInput {
  const isPublished = params.get("isPublished");

  return {
    isPublished: isPublished ? boolean(isPublished) : null,
    year: parseInt(params.get("year")),
    month: parseInt(params.get("month")),
  };
}
