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

export const assignEntryAttributeMutation = gql`
  mutation AssignEntryAttribute(
    $id: ID!
    $operations: [EntryAttributeAssignInput!]!
  ) {
    entryAttributeAssign(entryTypeId: $id, operations: $operations) {
      errors {
        ...EntryAttributeAssignErrorFragment
      }
      entryType {
        ...EntryTypeDetails
      }
    }
  }
`;

export const unassignEntryAttributeMutation = gql`
  mutation UnassignEntryAttribute($id: ID!, $ids: [ID!]!) {
    entryAttributeUnassign(entryTypeId: $id, attributeIds: $ids) {
      errors {
        ...EntryAttributeUnassignErrorFragment
      }
      entryType {
        ...EntryTypeDetails
      }
    }
  }
`;
