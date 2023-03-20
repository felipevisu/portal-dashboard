import i18n from "i18next";

import { FilterOpts } from "@portal/types";

export function getFilterOpts(): FilterOpts[] {
  const { t } = i18n;
  const yes = t("boolean.yes");
  const no = t("boolean.yes");

  return [
    {
      name: t("attribute.fields.valueRequired"),
      slug: "valueRequired",
      choices: [
        { value: "true", label: yes },
        { value: "false", label: no },
      ],
      type: "radio",
    },
    {
      name: t("attribute.fields.visibleInWebsite"),
      slug: "visibleInWebsite",
      choices: [
        { value: "true", label: yes },
        { value: "false", label: no },
      ],
      type: "radio",
    },
    {
      name: t("attribute.fields.type"),
      slug: "type",
      choices: [
        { value: "ENTRY", label: t("attribute.enums.type.entry") },
        { value: "DOCUMENT", label: t("attribute.enums.type.document") },
      ],
      type: "radio",
    },
  ];
}
