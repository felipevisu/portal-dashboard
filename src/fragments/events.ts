import { gql } from "@apollo/client";

export const eventFragment = gql`
  fragment Event on Event {
    id
    date
    type
    message
    user {
      ...User
    }
    userEmail
  }
`;

export const eventDetailsFragment = gql`
  fragment EventDetails on Event {
    id
    date
    type
    message
    user {
      ...User
    }
    userEmail
    document {
      id
      name
      entry {
        id
        name
      }
    }
    documentName
  }
`;
