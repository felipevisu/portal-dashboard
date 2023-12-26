import { gql } from "@apollo/client";

export const entryTypeFragment = gql`
  fragment EntryType on EntryType {
    id
    name
    slug
  }
`;
