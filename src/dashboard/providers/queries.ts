import { gql } from "@apollo/client";

export const providersQuery = gql`
  query Providers(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
    $isPublished: Boolean
    $segment: ID
  ) {
    providers(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
      segment: $segment
      isPublished: $isPublished
    ) {
      edges {
        node {
          ...Provider
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const providerDetailsQuery = gql`
  query ProviderDetails($id: ID!, $first: Int = 10, $after: String) {
    provider(id: $id) {
      ...ProviderDetails
      documents(first: $first, after: $after) {
        edges {
          node {
            ...Document
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;
