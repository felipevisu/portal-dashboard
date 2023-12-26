import { gql } from "@apollo/client";

export const entryTypes = gql`
  query EntryTypes($first: Int, $last: Int, $after: String, $before: String) {
    entryTypes(first: $first, last: $last, after: $after, before: $before) {
      edges {
        node {
          ...EntryType
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const entryTypeDetails = gql`
  query EntryTypeDetails($id: ID!) {
    entryType(id: $id) {
      ...EntryType
    }
  }
`;
