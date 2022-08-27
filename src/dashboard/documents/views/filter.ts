import { useSearchParams } from "react-router-dom";

import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  const [searchParams] = useSearchParams();
  return [
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
    {
      name: "Expirável",
      slug: "expires",
      active: searchParams.get("expires") !== null,
      choices: [
        { value: "true", label: "Sim" },
        { value: "false", label: "Não" },
      ],
      type: "radio",
    },
    {
      name: "Data de expiração",
      slug: "expirationDate",
      active: searchParams.get("expirationDate") !== null,
      type: "daterange",
      choices: [],
    },
  ];
}
