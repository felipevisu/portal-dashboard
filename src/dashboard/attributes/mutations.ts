import { gql } from "@apollo/client";

export const attributeCreateMutation = gql`
  mutation AttributeCreate($input: AttributeCreateInput!) {
    attributeCreate(input: $input) {
      attribute {
        ...AttributeDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const attributeUpdateMutation = gql`
  mutation AttributeUpdate($id: ID, $input: AttributeUpdateInput!) {
    attributeUpdate(id: $id, input: $input) {
      attribute {
        ...AttributeDetails
      }
      errors {
        ...Error
      }
    }
  }
`;

export const attributeDeleteMutation = gql`
  mutation AttributeDelete($id: ID!) {
    attributeDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;
