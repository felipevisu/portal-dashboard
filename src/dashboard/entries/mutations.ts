import { gql } from "@apollo/client";

export const entryCreateMutation = gql`
  mutation EntryCreate($input: EntryInput!) {
    entryCreate(input: $input) {
      entry {
        ...EntryDetails
      }
      errors {
        ...EntryErrorWithAttributes
      }
    }
  }
`;

export const entryUpdateMutation = gql`
  mutation EntryUpdate($id: ID, $input: EntryInput!) {
    entryUpdate(id: $id, input: $input) {
      entry {
        ...EntryDetails
      }
      errors {
        ...EntryErrorWithAttributes
      }
    }
  }
`;

export const entryDeleteMutation = gql`
  mutation EntryDelete($id: ID!) {
    entryDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const entryBulkDeleteMutation = gql`
  mutation EntryBulkDelete($ids: [ID!]!) {
    entryBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;

export const consultDocumentMutation = gql`
  mutation ConsultDocument($id: ID!) {
    consultDocument(id: $id) {
      errors {
        message
        field
      }
    }
  }
`;
