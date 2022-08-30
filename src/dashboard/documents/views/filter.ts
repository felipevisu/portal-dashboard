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
    {
      name: "Expirável",
      slug: "expires",
      choices: [
        { value: "true", label: "Sim" },
        { value: "false", label: "Não" },
      ],
      type: "radio",
    },
    {
      name: "Data de expiração",
      slug: "expirationDate",
      type: "daterange",
      choices: [],
    },
    {
      name: "Tipo",
      slug: "owner",
      choices: [
        { value: "vehicle", label: "Veículos de comunicação" },
        { value: "provider", label: "Prestadores de serviço" },
      ],
      type: "radio",
    },
  ];
}
