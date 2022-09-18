import { gql } from "@apollo/client";

export const sessionsQuery = gql`
  query Sessions(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: SessionFilterInput
  ) {
    sessions(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: $filter
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

export const sessionDetailsQuery = gql`
  query SessionDetails($id: ID!) {
    session(id: $id) {
      ...SessionDetails
    }
  }
`;
