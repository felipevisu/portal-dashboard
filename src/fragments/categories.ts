import { gql } from "@apollo/client";

export const categoryFragment = gql`
  fragment Category on Category {
    id
    name
    slug
    type
    entries {
      totalCount
    }
  }
`;
