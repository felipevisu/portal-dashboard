import { useSearchParams } from "react-router-dom";

import { SingleAutocompleteChoiceType } from "@portal/utils/data";

import { VehicleListFilterOpts } from "../components/VehicleListPage";

export function getFilterOpts(
  categories: SingleAutocompleteChoiceType[]
): VehicleListFilterOpts {
  const [searchParams] = useSearchParams();
  return {
    category: {
      name: "Categoria",
      active: searchParams.get("category") !== null,
      choices: categories,
      value: searchParams.get("category"),
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
