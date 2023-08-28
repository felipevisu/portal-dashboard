import { gql } from "@apollo/client";

export const investmentFragment = gql`
  fragment Investment on Investment {
    id
    year
    month
    isPublished
    total
    channel {
      id
      name
      slug
    }
  }
`;

export const itemFragment = gql`
  fragment Item on Item {
    id
    name
    value
  }
`;

export const investmentDetailsFragment = gql`
  fragment InvestmentDetails on Investment {
    id
    year
    month
    isPublished
    total
    channel {
      id
      name
      slug
    }
    items {
      ...Item
    }
  }
`;
