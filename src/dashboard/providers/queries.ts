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
  query ProviderDetails($id: ID!) {
    provider(id: $id) {
      ...ProviderDetails
    }
  }
`;
