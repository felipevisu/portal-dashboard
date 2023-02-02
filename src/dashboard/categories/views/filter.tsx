import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  return [
    {
      name: "Tipo",
      slug: "type",
      choices: [
        { value: "VEHICLE", label: "Veículos de comunicação" },
        { value: "PROVIDER", label: "Prestadores de serviço" },
      ],
      type: "radio",
    },
  ];
}
