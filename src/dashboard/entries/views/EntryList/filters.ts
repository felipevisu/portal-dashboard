import { SingleAutocompleteChoiceType } from "@portal/components/SingleAutocompleteSelectField";
import {
  EntryFilterInput,
  InitialEntryFilterCategoriesQuery,
  SearchCategoriesQuery,
  SearchCategoriesQueryVariables,
} from "@portal/graphql";
import { UseSearchResult } from "@portal/hooks/makeSearch";
import { maybe } from "@portal/misc";
import { RelayToFlat } from "@portal/types";
import { mapEdgesToItems, mapNodeToChoice } from "@portal/utils/maps";

export function getFilterOpts(
  params: URLSearchParams,
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

export function getFilterVariables(params: URLSearchParams): EntryFilterInput {
  const categories = params.getAll("categories");
  return {
    categories: categories.length ? categories : null,
    search: params.get("search"),
  };
}
