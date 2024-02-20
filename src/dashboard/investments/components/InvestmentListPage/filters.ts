import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import { FilterOpts } from "@portal/types";
import {
  createOptionsField,
  createNumberField,
} from "@portal/utils/filters/fields";

export const InvestmentFilterKeys = {
  isPublished: "isPublished",
  channel: "channel",
  year: "year",
  month: "month",
} as const;

export type InvestmentFilterKeys =
  typeof InvestmentFilterKeys[keyof typeof InvestmentFilterKeys];

export interface InvestmentListFilterOpts {
  isPublished: FilterOpts<string>;
  year: FilterOpts<number>;
  month: FilterOpts<number>;
  channel: FilterOpts<string> & { choices: SingleAutocompleteChoiceType[] };
}

export function createFilterStructure(
  opts: InvestmentListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        InvestmentFilterKeys.channel,
        t("channel.title"),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createOptionsField(
        InvestmentFilterKeys.isPublished,
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
      ...createOptionsField(
        InvestmentFilterKeys.month,
        t("month"),
        [""],
        false,
        [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Dezembro",
        ].map((value, index) => {
          return {
            label: value,
            value: index + 1,
          };
        })
      ),
      active: opts.month.active,
    },
    {
      ...createNumberField(
        InvestmentFilterKeys.year,
        t("year"),
        opts.year.toString()
      ),
      active: opts.year.active,
    },
  ];
}
