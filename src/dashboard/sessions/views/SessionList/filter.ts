import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import { SessionFilterInput } from "@portal/graphql";
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
  };
}

export function getFilterVariables(
  params: URLSearchParams
): SessionFilterInput {
  const isPublished = params.get("isPublished");

  return {
    isPublished: isPublished ? boolean(isPublished) : null,
    search: params.get("search") || "",
  };
}
