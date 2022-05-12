import { gql } from "@apollo/client";

export const categoryCreateMutation = gql`
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

export const categoryUpdateMutation = gql`
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

export const categoryDeleteMutation = gql`
  mutation CategoryDelete($id: ID!) {
    categoryDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;
