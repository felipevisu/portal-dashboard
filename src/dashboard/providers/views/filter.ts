import { FilterOpts } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

export function getFilterOpts(
  segments: SingleAutocompleteChoiceType[]
): FilterOpts[] {
  return [
    {
      name: "Segmento",
      slug: "segment",
      choices: segments,
      type: "radio",
    },
    {
      name: "Status",
      slug: "isPublished",
      choices: [
        { value: "false", label: "Não publicado" },
        { value: "true", label: "Publicado" },
      ],
      type: "radio",
    },
  ];
}
