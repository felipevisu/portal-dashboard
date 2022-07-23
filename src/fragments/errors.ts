import { gql } from "@apollo/client";

export const errorFragment = gql`
  fragment Error on Error {
    code
    field
    message
  }
`;

export const bulkItemErrorFragment = gql`
  fragment BulkItemError on BulkItemError {
    code
    field
    message
    index
  }
`;
