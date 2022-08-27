import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  return [
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
