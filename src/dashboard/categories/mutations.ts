import { gql } from "@apollo/client";

export const categoryCreate = gql`
  mutation CategoryCreate($input: CategoryInput!) {
    categoryCreate(input: $input) {
      category {
        ...Category
      }
      errors {
        ...Error
      }
    }
  }
`;

export const categoryUpdate = gql`
  mutation CategoryUpdate($id: ID, $input: CategoryInput!) {
    categoryUpdate(id: $id, input: $input) {
      category {
        ...Category
      }
      errors {
        ...Error
      }
    }
  }
`;

export const categoryDelete = gql`
  mutation CategoryDelete($id: ID!) {
    categoryDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const categoryBulkDeleteMutation = gql`
  mutation CategoryBulkDelete($ids: [ID!]!) {
    categoryBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
