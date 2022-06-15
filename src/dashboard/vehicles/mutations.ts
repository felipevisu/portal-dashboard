import { gql } from "@apollo/client";

export const vehicleCreateMutation = gql`
  mutation VehicleCreate($input: VehicleInput!) {
    vehicleCreate(input: $input) {
      vehicle {
        ...VehicleDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const vehicleUpdateMutation = gql`
  mutation VehicleUpdate($id: ID, $input: VehicleInput!) {
    vehicleUpdate(id: $id, input: $input) {
      vehicle {
        ...VehicleDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const vehicleDeleteMutation = gql`
  mutation VehicleDelete($id: ID!) {
    vehicleDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const vehicleBulkDeleteMutation = gql`
  mutation VehicleBulkDelete($ids: [ID!]!) {
    vehicleBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
