import { gql } from "@apollo/client";

export const entryTypesMenuQuery = gql`
  query EntryType($before: String, $after: String, $first: Int, $last: Int) {
    entryTypes(before: $before, after: $after, first: $first, last: $last) {
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
