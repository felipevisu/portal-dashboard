import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";

import { FilterOpts } from "@portal/types";
import { createOptionsField } from "@portal/utils/filters/fields";

export const SessionFilterKeys = {
  channel: "channel",
  isPublished: "isPublished",
} as const;

export type SessionFilterKeys =
  typeof SessionFilterKeys[keyof typeof SessionFilterKeys];

export interface SessionListFilterOpts {
  channel: FilterOpts<string> & { choices: SingleAutocompleteChoiceType[] };
  isPublished: FilterOpts<string>;
}

export function createFilterStructure(
  opts: SessionListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        SessionFilterKeys.channel,
        t("channel.title"),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createOptionsField(
        SessionFilterKeys.isPublished,
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
  ];
}
