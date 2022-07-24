import { gql } from "@apollo/client";

export const investmentsQuery = gql`
  query Investments(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $isPublished: Boolean
  ) {
    investments(
      first: $first
      last: $last
      after: $after
      before: $before
      isPublished: $isPublished
    ) {
      edges {
        node {
          ...Investment
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const investmentDetailsQuery = gql`
  query InvestmentDetails($id: ID!) {
    investment(id: $id) {
      ...InvestmentDetails
    }
  }
`;
