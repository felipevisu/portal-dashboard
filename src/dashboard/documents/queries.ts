import { gql } from "@apollo/client";

export const documentDetailsQuery = gql`
  query DocumentDetails($id: ID!) {
    document(id: $id) {
      ...DocumentDetails
    }
  }
`;

export const documentsQuery = gql`
  query Documents(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: DocumentFilterInput
  ) {
    documents(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: $filter
    ) {
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
`;
