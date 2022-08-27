import { useSearchParams } from "react-router-dom";

import { FilterOpts } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

export function getFilterOpts(
  categories: SingleAutocompleteChoiceType[]
): FilterOpts[] {
  const [searchParams] = useSearchParams();
  return [
    {
      name: "Categoria",
      slug: "category",
      active: searchParams.get("category") !== null,
      choices: categories,
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
