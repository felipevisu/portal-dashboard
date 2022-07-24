import { gql } from "@apollo/client";

export const investmentBulkDeleteMutation = gql`
  mutation InvestmentBulkDelete($ids: [ID!]!) {
    investmentBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;

export const investmentDeleteMutation = gql`
  mutation InvestmentDelete($id: ID!) {
    investmentDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const investmentUpdateMutation = gql`
  mutation InvestmentUpdate($id: ID!, $input: InvestmentUpdateInput!) {
    investmentUpdate(id: $id, input: $input) {
      investment {
        id
      }
      errors {
        ...Error
      }
    }
  }
`;

export const itemDeleteMutation = gql`
  mutation ItemDelete($id: ID!) {
    itemDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const itemUpdateMutation = gql`
  mutation ItemUpdate($id: ID!, $input: ItemInput!) {
    itemUpdate(id: $id, input: $input) {
      item {
        ...Item
      }
      errors {
        ...Error
      }
    }
  }
`;

export const itemCreateMutation = gql`
  mutation ItemCreate($investmentId: ID!, $input: ItemInput!) {
    itemCreate(investmentId: $investmentId, input: $input) {
      item {
        ...Item
      }
      errors {
        ...Error
      }
    }
  }
`;

export const investmentCreateMutation = gql`
  mutation InvestmentCreate($input: InvestmentInput!) {
    investmentCreate(input: $input) {
      investment {
        ...Investment
      }
      errors {
        ...Error
      }
    }
  }
`;
