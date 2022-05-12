import { gql } from "@apollo/client";

export const categories = gql`
  query Categories {
    categories {
      edges {
        node {
          ...Category
        }
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
