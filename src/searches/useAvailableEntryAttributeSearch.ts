import { gql } from "@apollo/client";
import {
  SearchAvailableEntryAttributesDocument,
  SearchAvailableEntryAttributesQuery,
  SearchAvailableEntryAttributesQueryVariables,
} from "@portal/graphql";
import makeSearch from "@portal/hooks/makeSearch";

export const searchEntryAttributes = gql`
  query SearchAvailableEntryAttributes(
    $id: ID!
    $after: String
    $first: Int!
    $query: String!
  ) {
    entryType(id: $id) {
      id
      availableAttributes(
        after: $after
        first: $first
        filter: { search: $query }
      ) {
        edges {
          node {
            ...AvailableAttribute
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;

export default makeSearch<
  SearchAvailableEntryAttributesQuery,
  SearchAvailableEntryAttributesQueryVariables
>(SearchAvailableEntryAttributesDocument, (result) =>
  result.loadMore(
    (prev, next) => {
      if (
        prev.entryType.availableAttributes.pageInfo.endCursor ===
        next.entryType.availableAttributes.pageInfo.endCursor
      ) {
        return prev;
      }

      return {
        ...prev,
        entryType: {
          ...prev.entryType,
          availableAttributes: {
            ...prev.entryType.availableAttributes,
            edges: [
              ...prev.entryType.availableAttributes.edges,
              ...next.entryType.availableAttributes.edges,
            ],
            pageInfo: next.entryType.availableAttributes.pageInfo,
          },
        },
      };
    },
    {
      after: result.data.entryType.availableAttributes.pageInfo.endCursor,
    }
  )
);
