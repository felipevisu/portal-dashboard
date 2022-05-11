import { gql } from "@apollo/client";

export const vehicles = gql`
  query Vehicles {
    vehicles {
      edges {
        node {
          ...Vehicle
        }
      }
    }
  }
`;
