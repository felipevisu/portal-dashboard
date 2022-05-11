import { gql } from "@apollo/client";

export const tokenAuth = gql`
  mutation tokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      errors {
        message
        field
        code
      }
      token
      user {
        email
        firstName
        lastName
      }
    }
  }
`;
