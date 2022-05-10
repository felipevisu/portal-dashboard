import { gql } from "@apollo/client";

export const errorFragment = gql`
  fragment Error on Error {
    code
    field
    message
  }
`;
