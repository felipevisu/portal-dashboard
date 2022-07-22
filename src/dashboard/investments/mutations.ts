import { gql } from "@apollo/client";

export const investmentCreateMutation = gql`
  mutation InvestmentCreate($input: InvestmentInput!) {
    investmentCreate(input: $input) {
      investment {
        id
      }
      errors {
        ...Error
      }
    }
  }
`;

export const investmentBulkDeleteMutation = gql`
  mutation InvestmentBulkDelete($ids: [ID!]!) {
    investmentBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
