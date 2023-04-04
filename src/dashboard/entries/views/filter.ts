import i18n from "i18next";

import { FilterOpts } from "@portal/types";
import { SingleAutocompleteChoiceType } from "@portal/utils/data";

export function getFilterOpts(
  categories: SingleAutocompleteChoiceType[]
): FilterOpts[] {
  const { t } = i18n;

  return [
    {
      name: t("category.title"),
      slug: "categories",
      choices: categories,
      type: "multiple",
    },
    {
      name: t("visibility"),
      slug: "isPublished",
      choices: [
        { value: "true", label: t("published") },
        { value: "false", label: t("unpublished") },
      ],
      type: "radio",
    },
    {
      name: t("status"),
      slug: "active",
      choices: [
        { value: "true", label: t("active") },
        { value: "false", label: t("inactive") },
      ],
      type: "radio",
    },
  ];
}
