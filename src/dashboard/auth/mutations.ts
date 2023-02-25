import { gql } from "@apollo/client";

export const tokenCreate = gql`
  mutation tokenCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      errors {
        message
        field
        code
      }
      token
      refreshToken
      user {
        email
        firstName
        lastName
      }
    }
  }
`;
