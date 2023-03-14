import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  return [
    {
      name: "Tipo",
      slug: "type",
      choices: [
        { value: "VEHICLE", label: "Veículos" },
        { value: "PROVIDER", label: "Fornecedores" },
      ],
      type: "radio",
    },
  ];
}
