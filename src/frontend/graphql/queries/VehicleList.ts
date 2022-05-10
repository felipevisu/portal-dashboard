import { gql } from "@apollo/client";

import { PAGE_INFO, VEHICLE } from "./fragments";

export const VEHICLE_LIST = gql`
  ${PAGE_INFO}
  ${VEHICLE}
  query VehicleList {
    vehicles {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...Vehicle
        }
      }
    }
  }
`;

export default VEHICLE_LIST;
