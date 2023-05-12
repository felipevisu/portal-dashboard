import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { EntryTypeEnum } from "@portal/graphql";
import { FilterOpts, MinMax } from "@portal/types";
import {
  createDateField,
  createOptionsField,
} from "@portal/utils/filters/fields";

export const DocumentFilterKeys = {
  type: "type",
  isPublished: "isPublished",
  expirationDate: "expirationDate",
} as const;

export type DocumentFilterKeys =
  typeof DocumentFilterKeys[keyof typeof DocumentFilterKeys];

export interface DocumentListFilterOpts {
  type: FilterOpts<EntryTypeEnum>;
  isPublished: FilterOpts<string>;
  expirationDate: FilterOpts<MinMax>;
}

export function createFilterStructure(
  opts: DocumentListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        DocumentFilterKeys.type,
        t("type"),
        [opts.type.value],
        false,
        [
          {
            label: t("providers.title"),
            value: EntryTypeEnum.PROVIDER,
          },
          {
            label: t("vehicles.title"),
            value: EntryTypeEnum.VEHICLE,
          },
        ]
      ),
      active: opts.type.active,
    },
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
