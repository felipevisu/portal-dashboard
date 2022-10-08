import { gql } from "@apollo/client";

export const entryCreateMutation = gql`
  mutation EntryCreate($type: EntryTypeEnum!, $input: EntryInput!) {
    entryCreate(type: $type, input: $input) {
      entry {
        ...EntryDetails
      }
      errors {
        ...Error
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
        ...Error
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
