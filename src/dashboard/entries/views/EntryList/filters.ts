import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import {
  AttributeFragment,
  EntryFilterInput,
  InitialEntryFilterAttributesQuery,
  InitialEntryFilterCategoriesQuery,
  SearchAttributeValuesQuery,
  SearchAttributeValuesQueryVariables,
  SearchCategoriesQuery,
  SearchCategoriesQueryVariables,
} from "@portal/graphql";
import { UseSearchResult } from "@portal/hooks/makeSearch";
import { maybe } from "@portal/misc";
import { RelayToFlat } from "@portal/types";
import { dedupeFilter } from "@portal/utils/filters/filters";
import {
  mapEdgesToItems,
  mapNodeToChoice,
  mapSlugNodeToChoice,
} from "@portal/utils/maps";

export function getAttributeValuesFromParams(
  params: URLSearchParams,
  attribute: Pick<AttributeFragment, "inputType" | "slug">
) {
  return params.getAll(attribute.slug);
}

export function mapAttributeParamsToFilterOpts(
  attributes: RelayToFlat<InitialEntryFilterAttributesQuery["attributes"]>,
  params: URLSearchParams
) {
  return attributes
    .sort((a, b) => (a.name > b.name ? 1 : -1))
    .map((attr) => {
      const attrValues = getAttributeValuesFromParams(params, attr);

      return {
        active: attrValues.length > 0,
        id: attr.id,
        name: attr.name,
        slug: attr.slug,
        inputType: attr.inputType,
        value: dedupeFilter(attrValues),
      };
    });
}

export function getFilterOpts(
  params: URLSearchParams,
  attributes: RelayToFlat<InitialEntryFilterAttributesQuery["attributes"]>,
  focusedAttributeChoices: UseSearchResult<
    SearchAttributeValuesQuery,
    SearchAttributeValuesQueryVariables
  >,
  categories: {
    initial: RelayToFlat<InitialEntryFilterCategoriesQuery["categories"]>;
    search: UseSearchResult<
      SearchCategoriesQuery,
      SearchCategoriesQueryVariables
    >;
  },
  channels: SingleAutocompleteChoiceType[]
) {
  return {
    attributes: mapAttributeParamsToFilterOpts(attributes, params),
    attributeChoices: {
      active: true,
      choices: mapSlugNodeToChoice(
        mapEdgesToItems(focusedAttributeChoices.result.data?.attribute?.choices)
      ),
      displayValues: mapNodeToChoice(
        mapEdgesToItems(focusedAttributeChoices.result.data?.attribute?.choices)
      ),
      hasMore:
        focusedAttributeChoices.result.data?.attribute?.choices?.pageInfo
          ?.hasNextPage || false,
      initialSearch: "",
      loading: focusedAttributeChoices.result.loading,
      onFetchMore: focusedAttributeChoices.loadMore,
      onSearchChange: focusedAttributeChoices.search,
      value: null,
    },
    categories: {
      active: !!params.getAll("categories").length,
      choices: mapNodeToChoice(
        mapEdgesToItems(categories?.search?.result?.data?.search)
      ),
      displayValues: categories.initial.map((category) => ({
        label: category.name,
        value: category.id,
      })),
      hasMore: maybe(
        () => categories.search.result.data.search.pageInfo.hasNextPage,
        false
      ),
      initialSearch: "",
      loading: categories.search.result.loading,
      onFetchMore: categories.search.loadMore,
      onSearchChange: categories.search.search,
      value: params.getAll("categories"),
    },
    channel: {
      active: !!params.get("channel"),
      choices: channels,
      value: params.get("channel") || "",
    },
  };
}

export function getFilterVariables(
  params: URLSearchParams,
  attributes: RelayToFlat<InitialEntryFilterAttributesQuery["attributes"]>
): EntryFilterInput {
  const categories = params.getAll("categories");
  const attributesFilter = [];
  attributes.forEach((attribute) => {
    const values = params.getAll(attribute.slug);
    if (values.length) {
      attributesFilter.push({ slug: attribute.slug, values: values });
    }
  });
  return {
    categories: categories.length ? categories : null,
    search: params.get("search"),
    attributes: attributesFilter,
  };
}
