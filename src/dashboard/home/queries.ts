import { gql } from "@apollo/client";

export const expiredDocumentsQuery = gql`
  query ExpiredDocuments(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $today: Date
  ) {
    documents(
      first: $first
      last: $last
      after: $after
      before: $before
      expires: true
      isPublished: true
      expirationDate_Lte: $today
    ) {
      edges {
        node {
          ...DocumentHome
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const closeToExpiredDocumentsQuery = gql`
  query CloseToExpireDocuments(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $tomorrow: Date
    $nextWeek: Date
  ) {
    documents(
      first: $first
      last: $last
      after: $after
      before: $before
      expires: true
      isPublished: true
      expirationDate_Gte: $tomorrow
      expirationDate_Lte: $nextWeek
    ) {
      edges {
        node {
          ...DocumentHome
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;
