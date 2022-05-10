import { gql } from "@apollo/client";

export const fragmentUser = gql`
  fragment User on User {
    id
    email
    firstName
    lastName
    isStaff
  }
`;

export const fragmentUserBase = gql`
  fragment UserBase on User {
    id
    firstName
    lastName
  }
`;
