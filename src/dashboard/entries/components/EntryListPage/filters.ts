import { t } from "i18next";

import { IFilter } from "@portal/components/Filter";
import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import { AttributeInputTypeEnum } from "@portal/graphql";
import { AutocompleteFilterOpts, FilterOpts } from "@portal/types";
import {
  createAutocompleteField,
  createOptionsField,
} from "@portal/utils/filters/fields";

export const EntryFilterKeys = {
  categories: "categories",
  channel: "channel",
  booleanAttributes: "boolean-attributes",
  dateAttributes: "date-attributes",
  stringAttributes: "string-attributes",
} as const;

export type EntryFilterKeys =
  typeof EntryFilterKeys[keyof typeof EntryFilterKeys];

export type AttributeFilterOpts = FilterOpts<string[]> & {
  id: string;
  name: string;
  slug: string;
  inputType: AttributeInputTypeEnum;
};

export interface EntryListFilterOpts {
  attributes: AttributeFilterOpts[];
  attributeChoices: FilterOpts<string[]> & AutocompleteFilterOpts;
  categories: FilterOpts<string[]> & AutocompleteFilterOpts;
  channel: FilterOpts<string> & { choices: SingleAutocompleteChoiceType[] };
}

const filterByType =
  (type: AttributeInputTypeEnum) => (attribute: AttributeFilterOpts) =>
    attribute.inputType === type;

export function createFilterStructure(
  opts: EntryListFilterOpts
): IFilter<string> {
  const attributes = opts.attributes;

  const booleanAttributes = attributes.filter(
    filterByType(AttributeInputTypeEnum.BOOLEAN)
  );
  const dateAttributes = attributes.filter(
    filterByType(AttributeInputTypeEnum.DATE)
  );

  const defaultAttributes = opts.attributes.filter(
    ({ inputType }) =>
      ![AttributeInputTypeEnum.BOOLEAN, AttributeInputTypeEnum.DATE].includes(
        inputType
      )
  );

  return [
    {
      ...createOptionsField(
        EntryFilterKeys.channel,
        t("channel.title"),
        [opts.channel.value],
        false,
        opts.channel.choices
      ),
      active: opts.channel.active,
    },
    {
      ...createAutocompleteField(
        EntryFilterKeys.categories,
        t("category.plural"),
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
    ...defaultAttributes.map((attr) => ({
      ...createAutocompleteField(
        attr.slug,
        attr.name,
        attr.value,
        opts.attributeChoices.displayValues,
        true,
        opts.attributeChoices.choices,
        {
          hasMore: opts.attributeChoices.hasMore,
          initialSearch: "",
          loading: opts.attributeChoices.loading,
          onFetchMore: opts.attributeChoices.onFetchMore,
          onSearchChange: opts.attributeChoices.onSearchChange,
        },
        attr.id
      ),
      active: attr.active,
      group: EntryFilterKeys.stringAttributes,
    })),
  ];
}
