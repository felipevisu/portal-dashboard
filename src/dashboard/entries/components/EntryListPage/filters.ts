import { IFilter } from "@portal/components/Filter";
import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import { AutocompleteFilterOpts, FilterOpts } from "@portal/types";
import {
  createAutocompleteField,
  createOptionsField,
} from "@portal/utils/filters/fields";

export const EntryFilterKeys = {
  categories: "categories",
  channel: "channel",
} as const;

export type EntryFilterKeys =
  typeof EntryFilterKeys[keyof typeof EntryFilterKeys];

export interface EntryListFilterOpts {
  categories: FilterOpts<string[]> & AutocompleteFilterOpts;
  channel: FilterOpts<string> & { choices: SingleAutocompleteChoiceType[] };
}

export function createFilterStructure(
  opts: EntryListFilterOpts
): IFilter<string> {
  return [
    {
      ...createOptionsField(
        EntryFilterKeys.channel,
        "Canal",
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createAutocompleteField(
        EntryFilterKeys.categories,
        "Categoria",
        opts.categories.value,
        opts.categories.displayValues,
        true,
        opts.categories.choices,
        {
          hasMore: opts.categories.hasMore,
          initialSearch: "",
          loading: opts.categories.loading,
          onFetchMore: opts.categories.onFetchMore,
          onSearchChange: opts.categories.onSearchChange,
        }
      ),
      active: opts.categories.active,
    },
  ];
}
