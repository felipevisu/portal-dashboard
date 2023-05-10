import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { EntryTypeEnum } from "@portal/graphql";
import { FilterOpts } from "@portal/types";
import { createOptionsField } from "@portal/utils/filters/fields";

export const CategoryFilterKeys = {
  type: "type",
} as const;

export type CategoryFilterKeys =
  typeof CategoryFilterKeys[keyof typeof CategoryFilterKeys];

export interface CategoryListFilterOpts {
  type: FilterOpts<EntryTypeEnum>;
}

export function createFilterStructure(
  opts: CategoryListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        CategoryFilterKeys.type,
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
  ];
}
