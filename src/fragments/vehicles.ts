import { gql } from "@apollo/client";

export const vehicleFragment = gql`
  fragment Vehicle on Vehicle {
    id
    name
    slug
    category {
      id
      name
    }
    isPublished
  }
`;

export const vehicleDetailsFragment = gql`
  fragment VehicleDetails on Vehicle {
    id
    name
    slug
    documentNumber
    category {
      id
      name
    }
    isPublished
  }
`;
