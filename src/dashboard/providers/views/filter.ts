import { FilterOpts } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

export function getFilterOpts(
  categories: SingleAutocompleteChoiceType[]
): FilterOpts[] {
  return [
    {
      name: "Categoria",
      slug: "category",
      choices: categories,
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
