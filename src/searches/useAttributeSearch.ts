import { gql } from "@apollo/client";
import {
  SearchAttributesDocument,
  SearchAttributesQuery,
  SearchAttributesQueryVariables,
} from "@portal/graphql";
import makeTopLevelSearch from "@portal/hooks/makeTopLevelSearch";

export const searchAttributes = gql`
  query SearchAttributes(
    $after: String
    $first: Int!
    $query: String!
    $type: AttributeTypeEnum!
  ) {
    search: attributes(
      after: $after
      first: $first
      filter: { search: $query, type: $type }
    ) {
      edges {
        node {
          ...Attribute
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export default makeTopLevelSearch<
  SearchAttributesQuery,
  SearchAttributesQueryVariables
>(SearchAttributesDocument);
