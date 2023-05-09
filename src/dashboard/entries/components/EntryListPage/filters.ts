import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import { AutocompleteFilterOpts, FilterOpts } from "@portal/types";

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
