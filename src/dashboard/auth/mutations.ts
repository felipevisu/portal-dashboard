import { gql } from "@apollo/client";

export const tokenCreate = gql`
  mutation TokenCreate($email: String!, $password: String!) {
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

export const requestPasswordReset = gql`
  mutation RequestPasswordReset($email: String!, $redirectUrl: String!) {
    requestPasswordReset(email: $email, redirectUrl: $redirectUrl) {
      errors {
        message
        field
        code
      }
    }
  }
`;

export const passwordReset = gql`
  mutation PasswordReset($email: String!, $password: String!, $token: String!) {
    passwordReset(email: $email, password: $password, token: $token) {
      errors {
        message
        field
        code
      }
    }
  }
`;
