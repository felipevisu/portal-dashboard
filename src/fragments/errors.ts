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

export const entryErrorFragment = gql`
  fragment EntryError on EntryError {
    code
    field
    message
  }
`;

export const entryErrorWithAttributesFragment = gql`
  fragment EntryErrorWithAttributes on EntryError {
    ...EntryError
    attributes
  }
`;

export const entryChannelListingErrorFragment = gql`
  fragment EntryChannelListingError on EntryChannelListingError {
    code
    field
    message
    attributes
    values
    channels
  }
`;

export const entryAttributeAssignErrorFragment = gql`
  fragment EntryAttributeAssignErrorFragment on EntryError {
    code
    field
    message
  }
`;

export const entryAttributeUnassignErrorFragment = gql`
  fragment EntryAttributeUnassignErrorFragment on EntryError {
    code
    field
    message
  }
`;
