import { useSearchParams } from "react-router-dom";

import { SessionListFilterOpts } from "../components/SessionListPage";

export function getFilterOpts(): SessionListFilterOpts {
  const [searchParams] = useSearchParams();
  return {
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
