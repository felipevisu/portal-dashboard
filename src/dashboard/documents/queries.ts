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
    $search: String
    $expires: Boolean
    $isPublished: Boolean
    $expirationDate_Lte: Date
    $expirationDate_Gte: Date
    $owner: String
  ) {
    documents(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
      expires: $expires
      isPublished: $isPublished
      expirationDate_Lte: $expirationDate_Lte
      expirationDate_Gte: $expirationDate_Gte
      owner: $owner
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
