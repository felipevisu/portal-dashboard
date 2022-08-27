import { useSearchParams } from "react-router-dom";

import { FilterOpts } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

export function getFilterOpts(
  segments: SingleAutocompleteChoiceType[]
): FilterOpts[] {
  const [searchParams] = useSearchParams();
  return [
    {
      name: "Segmento",
      slug: "segment",
      active: searchParams.get("segment") !== null,
      choices: segments,
      type: "radio",
    },
    {
      name: "Status",
      slug: "isPublished",
      active: searchParams.get("isPublished") !== null,
      choices: [
        { value: "false", label: "Não publicado" },
        { value: "true", label: "Publicado" },
      ],
      type: "radio",
    },
  ];
}
