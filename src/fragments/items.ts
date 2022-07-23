import { gql } from "@apollo/client";

export const itemFragment = gql`
  fragment Item on Item {
    id
    name
    value
  }
`;
