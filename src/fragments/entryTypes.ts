import { gql } from "@apollo/client";

export const entryTypeFragment = gql`
  fragment EntryType on EntryType {
    id
    name
    slug
  }
`;

export const entryTypeDetailsFragment = gql`
  fragment EntryTypeDetails on EntryType {
    id
    name
    slug
    entryAttributes {
      ...Attribute
    }
  }
`;
