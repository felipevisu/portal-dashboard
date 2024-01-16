import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { FilterOpts } from "@portal/types";
import { createOptionsField } from "@portal/utils/filters/fields";

export const CategoryFilterKeys = {
  type: "type",
} as const;

export type CategoryFilterKeys =
  typeof CategoryFilterKeys[keyof typeof CategoryFilterKeys];

export interface CategoryListFilterOpts {}

export function createFilterStructure(
  opts: CategoryListFilterOpts
): IFilter<string> {
  return [];
}
