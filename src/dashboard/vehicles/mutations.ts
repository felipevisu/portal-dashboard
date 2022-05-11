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
