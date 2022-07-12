import { useSearchParams } from "react-router-dom";

import { SingleAutocompleteChoiceType } from "@portal/utils/data";

import { ProviderListFilterOpts } from "../components/ProviderListPage";

export function getFilterOpts(
  segments: SingleAutocompleteChoiceType[]
): ProviderListFilterOpts {
  const [searchParams] = useSearchParams();
  return {
    segment: {
      name: "Segmento",
      active: searchParams.get("segment") !== null,
      choices: segments,
      value: searchParams.get("segment"),
    },
    isPublished: {
      name: "Status",
      active: searchParams.get("isPublished") !== null,
      choices: [
        { value: "false", label: "Não publicado" },
        { value: "true", label: "Publicado" },
      ],
      value: searchParams.get("isPublished"),
    },
  };
}
