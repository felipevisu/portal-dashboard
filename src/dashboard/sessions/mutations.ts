import { gql } from "@apollo/client";

export const sessionBulkDeleteMutation = gql`
  mutation SessionBulkDelete($ids: [ID!]!) {
    sessionBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
