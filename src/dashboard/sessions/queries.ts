import { gql } from "@apollo/client";

export const sessionsQuery = gql`
  query Sessions(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
  ) {
    sessions(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
    ) {
      edges {
        node {
          ...Session
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
