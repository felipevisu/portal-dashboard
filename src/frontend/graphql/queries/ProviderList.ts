import { gql } from "@apollo/client";

import { PAGE_INFO, PROVIDER } from "./fragments";

export const PROVIDER_LIST = gql`
  ${PAGE_INFO}
  ${PROVIDER}
  query ProviderList {
    providers {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...Provider
        }
      }
    }
  }
`;

export default PROVIDER_LIST;
