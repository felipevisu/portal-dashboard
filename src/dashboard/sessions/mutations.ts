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

export const sessionUpdateMutation = gql`
  mutation SessionUpdate($id: ID, $input: SessionInput!) {
    sessionUpdate(id: $id, input: $input) {
      session {
        ...SessionDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const sessionDeleteMutation = gql`
  mutation SessionDelete($id: ID!) {
    sessionDelete(id: $id) {
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
