import { gql } from "@apollo/client";

export const entriesQuery = gql`
  query Entries(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $filter: EntryFilterInput
  ) {
    entries(
      first: $first
      last: $last
      after: $after
      before: $before
      filter: $filter
    ) {
      edges {
        node {
          ...Entry
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const entryDetailsQuery = gql`
  query EntryDetails($id: ID!, $first: Int = 10, $after: String) {
    entry(id: $id) {
      ...EntryDetails
      documents(first: $first, after: $after) {
        edges {
          node {
            ...Document
          }
        }
        pageInfo {
          ...PageInfo
        }
      }
    }
  }
`;

export const initialEntryFilterCategoriesQuery = gql`
  query InitialEntryFilterCategories($categories: [ID!]) {
    categories(first: 100, filter: { ids: $categories }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
