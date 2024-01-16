import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { FilterOpts, MinMax } from "@portal/types";
import {
  createDateField,
  createOptionsField,
} from "@portal/utils/filters/fields";

export const DocumentFilterKeys = {
  isPublished: "isPublished",
  expirationDate: "expirationDate",
} as const;

export type DocumentFilterKeys =
  typeof DocumentFilterKeys[keyof typeof DocumentFilterKeys];

export interface DocumentListFilterOpts {
  isPublished: FilterOpts<string>;
  expirationDate: FilterOpts<MinMax>;
}

export function createFilterStructure(
  opts: DocumentListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        DocumentFilterKeys.isPublished,
        t("status"),
        [opts.isPublished.value],
        false,
        [
          {
            label: t("published"),
            value: "true",
          },
          {
            label: t("unpublished"),
            value: "false",
          },
        ]
      ),
      active: opts.isPublished.active,
    },
    {
      ...createDateField(
        DocumentFilterKeys.expirationDate,
        t("expirationDate"),
        opts.expirationDate.value
      ),
      active: opts.expirationDate.active,
    },
  ];
}
