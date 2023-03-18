import i18n from "i18next";

import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  const { t } = i18n;

  return [
    {
      name: "Valor obrigatório",
      slug: "valueRequired",
      choices: [
        { value: "true", label: "Sim" },
        { value: "false", label: "Não" },
      ],
      type: "radio",
    },
    {
      name: "Visível no site",
      slug: "visibleInWebsite",
      choices: [
        { value: "true", label: "Sim" },
        { value: "false", label: "Não" },
      ],
      type: "radio",
    },
    {
      name: "Tipo",
      slug: "type",
      choices: [
        { value: "ENTRY", label: "Veículo ou fornecedor" },
        { value: "DOCUMENT", label: "Document" },
      ],
      type: "radio",
    },
  ];
}
