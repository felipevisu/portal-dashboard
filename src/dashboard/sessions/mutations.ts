import { gql } from "@apollo/client";

export const sessionCreateMutation = gql`
  mutation SessionCreate($input: SessionInput!) {
    sessionCreate(input: $input) {
      session {
        ...SessionDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const sessionBulkDeleteMutation = gql`
  mutation SessionBulkDelete($ids: [ID!]!) {
    sessionBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
