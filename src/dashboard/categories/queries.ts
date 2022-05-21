import { gql } from "@apollo/client";

export const categories = gql`
  query Categories(
    $first: Int
    $last: Int
    $after: String
    $before: String
    $search: String
  ) {
    categories(
      first: $first
      last: $last
      after: $after
      before: $before
      search: $search
    ) {
      edges {
        node {
          ...Category
        }
      }
      pageInfo {
        ...PageInfo
      }
    }
  }
`;

export const categoryDetails = gql`
  query CategoryDetails($id: ID!) {
    category(id: $id) {
      ...Category
    }
  }
`;
