import { gql } from "@apollo/client";

export const investmentFragment = gql`
  fragment Investment on Investment {
    id
    year
    month
    isPublished
  }
`;
