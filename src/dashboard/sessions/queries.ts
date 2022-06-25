import { gql } from "@apollo/client";

export const sessionsQuery = gql`
  query Sessions(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
    $isPublished: Boolean
  ) {
    sessions(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
      isPublished: $isPublished
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
