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

export const attributeValueDelete = gql`
  mutation AttributeValueDelete(
    $id: ID!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    attributeValueDelete(id: $id) {
      attribute {
        id
        choices(first: $first, after: $after, last: $last, before: $before) {
          ...AttributeValueList
        }
      }
      errors {
        ...Error
      }
    }
  }
`;

export const attributeValueUpdateMutation = gql`
  mutation AttributeValueUpdate(
    $id: ID!
    $input: AttributeValueUpdateInput!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    attributeValueUpdate(id: $id, input: $input) {
      attribute {
        id
        choices(first: $first, after: $after, last: $last, before: $before) {
          ...AttributeValueList
        }
      }
      errors {
        ...Error
      }
    }
  }
`;

export const attributeValueCreateMutation = gql`
  mutation AttributeValueCreate(
    $id: ID!
    $input: AttributeValueCreateInput!
    $first: Int
    $after: String
    $last: Int
    $before: String
  ) {
    attributeValueCreate(attribute: $id, input: $input) {
      attribute {
        id
        choices(first: $first, after: $after, last: $last, before: $before) {
          ...AttributeValueList
        }
      }
      errors {
        ...Error
      }
    }
  }
`;
