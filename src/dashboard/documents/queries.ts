import { gql } from "@apollo/client";

export const documentDetailsQuery = gql`
  query DocumentDetails($id: ID!) {
    document(id: $id) {
      ...DocumentDetails
    }
  }
`;
