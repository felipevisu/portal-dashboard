import { gql } from "@apollo/client";

export const entryTypeCreate = gql`
  mutation EntryTypeCreate($input: EntryTypeInput!) {
    entryTypeCreate(input: $input) {
      entryType {
        ...EntryType
      }
      errors {
        ...Error
      }
    }
  }
`;

export const entryTypeUpdate = gql`
  mutation EntryTypeUpdate($id: ID, $input: EntryTypeInput!) {
    entryTypeUpdate(id: $id, input: $input) {
      entryType {
        ...EntryType
      }
      errors {
        ...Error
      }
    }
  }
`;

export const entryTypeDelete = gql`
  mutation EntryTypeDelete($id: ID!) {
    entryTypeDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;
