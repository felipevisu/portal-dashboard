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
          type
        }
      }
      errors {
        ...Error
      }
    }
  }
`;
