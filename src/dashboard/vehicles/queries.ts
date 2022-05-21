import { gql } from "@apollo/client";

export const vehicles = gql`
  query Vehicles($first: Int, $last: Int, $after: String, $before: String) {
    vehicles(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          ...Vehicle
        }
      }
    }
  }
`;
