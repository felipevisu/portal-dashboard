import { gql } from "@apollo/client";
import {
  SearchCategoriesDocument,
  SearchCategoriesQuery,
  SearchCategoriesQueryVariables,
} from "@portal/graphql";
import makeTopLevelSearch from "@portal/hooks/makeTopLevelSearch";

export const searchCategories = gql`
  query SearchCategories($after: String, $first: Int!, $query: String!) {
    search: categories(after: $after, first: $first, search: $query) {
      edges {
        node {
          id
          name
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchCategoriesQuery,
  SearchCategoriesQueryVariables
>(SearchCategoriesDocument);
