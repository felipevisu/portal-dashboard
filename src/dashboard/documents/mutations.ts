import { gql } from "@apollo/client";

export const documentCreateMutation = gql`
  mutation DocumentCreate($input: DocumentInput!) {
    documentCreate(input: $input) {
      document {
        ...Document
      }
      errors {
        ...Error
      }
    }
  }
`;

export const documentUpdateMutation = gql`
  mutation DocumentUpdate($id: ID!, $input: DocumentInput!) {
    documentUpdate(id: $id, input: $input) {
      document {
        ...DocumentDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const documentDeleteMutation = gql`
  mutation DocumentDelete($id: ID!) {
    documentDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const documentBulkDeleteMutation = gql`
  mutation DocumentBulkDelete($ids: [ID!]!) {
    documentBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
