import { gql } from "@apollo/client";

export const validateTokenMutation = gql`
  mutation ValidateToken($token: String!) {
    validateToken(token: $token) {
      document {
        id
        name
        expires
        expired
        defaultFile {
          beginDate
          expirationDate
        }
        entry {
          name
          entryType {
            id
            name
          }
        }
      }
      errors {
        ...Error
      }
    }
  }
`;

export const documentUpdateByEntryMutation = gql`
  mutation DocumentUpdateByEntry(
    $token: String!
    $input: DocumentUpdateByEntryInput!
  ) {
    documentUpdateByEntry(token: $token, input: $input) {
      errors {
        ...Error
      }
    }
  }
`;
