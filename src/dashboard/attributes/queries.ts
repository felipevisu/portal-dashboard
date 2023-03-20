import { gql } from "@apollo/client";

export const attributeDetailsQuery = gql`
  query AttributeDetails(
    $id: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    attribute(id: $id) {
      ...AttributeDetails
      choices(first: $first, after: $after, last: $last, before: $before) {
        ...AttributeValueList
      }
    }
  }
`;

export const attributesQuery = gql`
  query Attributes(
    $filter: AttributeFilterInput
    $before: String
    $after: String
    $first: Int
    $last: Int
    $sort: AttributeSortingInput
  ) {
    attributes(
      filter: $filter
      before: $before
      after: $after
      first: $first
      last: $last
      sortBy: $sort
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
