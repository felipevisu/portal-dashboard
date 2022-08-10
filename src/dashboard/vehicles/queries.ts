import { gql } from "@apollo/client";

export const vehiclesQuery = gql`
  query Vehicles(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
    $isPublished: Boolean
    $category: ID
  ) {
    vehicles(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
      category: $category
      isPublished: $isPublished
    ) {
      edges {
        node {
          ...Vehicle
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const vehicleDetailsQuery = gql`
  query VehicleDetails($id: ID!, $first: Int = 10, $after: String) {
    vehicle(id: $id) {
      ...VehicleDetails
      documents(first: $first, after: $after) {
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
  }
`;
