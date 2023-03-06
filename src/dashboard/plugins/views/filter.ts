import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  return [
    {
      name: "Tipo de configuração",
      slug: "type",
      choices: [
        { value: "GLOBAL", label: "Global" },
        { value: "PER_CHANNEL", label: "Por canal" },
      ],
      type: "radio",
    },
  ];
}
